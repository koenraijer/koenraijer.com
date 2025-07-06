import { website } from '$lib/js/info.js';
import { create } from 'xmlbuilder2';
import { readFileSync } from 'fs';
import { join } from 'path';
import { globSync } from 'glob';

export const prerender = true;

export async function GET() {
    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
    };
    return new Response(await getSitemapXml(), { headers });
}

async function getSitemapXml(): Promise<string> {
    try {
        // Read data directly from file system instead of network requests
        const [posts, books] = await Promise.all([
            getPostsData(),
            getBooksData()
        ]);

        const root = create({ version: '1.0', encoding: 'utf-8' })
            .ele('urlset', {
                xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
                'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
                'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
                'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
                'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
            });

        // Add static pages with their priorities
        const staticPages = [
            { url: '', priority: '1.0', freq: 'daily' },        // Homepage
            { url: '/books', priority: '0.9', freq: 'daily' },  // Books index
            { url: '/changelog', priority: '0.7', freq: 'weekly' }  // Changelog
        ];

        for (const page of staticPages) {
            root.ele('url')
                .ele('loc').txt(`${website}${page.url}`).up()
                .ele('changefreq').txt(page.freq).up()
                .ele('priority').txt(page.priority).up()
            .up();
        }

        // Add individual book pages
        for (const book of books) {
            if (book.slug && book["Exclusive Shelf"] === "read") { // Only include read books
                const bookUrl = `${website}/books/${book.slug}`;
                const lastMod = book["Date Read"] || book["Date Added"];

                try {
                    const formattedDate = new Date(lastMod.replace(/\//g, '-')).toISOString();
                    root.ele('url')
                        .ele('loc').txt(bookUrl).up()
                        .ele('lastmod').txt(formattedDate).up()
                        .ele('changefreq').txt('monthly').up()
                        .ele('priority').txt('0.7').up()
                    .up();
                } catch (dateError) {
                    // If date parsing fails, add without lastmod
                    root.ele('url')
                        .ele('loc').txt(bookUrl).up()
                        .ele('changefreq').txt('monthly').up()
                        .ele('priority').txt('0.7').up()
                    .up();
                }
            }
        }

        // Add blog posts
        for (const post of posts.posts || posts) {
            if (!post.published) continue;

            const postUrl = `${website}/${post.slug}`;
            const lastMod = post.updated || post.date;

            root.ele('url')
                .ele('loc').txt(postUrl).up()
                .ele('lastmod').txt(lastMod).up()
                .ele('changefreq').txt('weekly').up()
                .ele('priority').txt('0.8').up()
            .up();
        }

        // Add category pages
        const categories = posts.categories || extractCategoriesFromPosts(posts.posts || posts);
        if (categories) {
            for (const [category, data] of Object.entries(categories)) {
                const categoryUrl = `${website}/category/${data.slug || slugify(category)}`;
                
                root.ele('url')
                    .ele('loc').txt(categoryUrl).up()
                    .ele('changefreq').txt('weekly').up()
                    .ele('priority').txt('0.7').up()
                .up();
            }
        }

        return root.end();
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return minimal sitemap on error
        const root = create({ version: '1.0', encoding: 'utf-8' })
            .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
        
        root.ele('url')
            .ele('loc').txt(website).up()
            .ele('changefreq').txt('daily').up()
            .ele('priority').txt('1.0').up()
        .up();

        return root.end();
    }
}

async function getBooksData() {
    try {
        const booksPath = join(process.cwd(), 'static', 'book_data.json');
        const booksData = readFileSync(booksPath, 'utf-8');
        return JSON.parse(booksData);
    } catch (error) {
        console.error('Error reading books data:', error);
        return [];
    }
}

async function getPostsData() {
    try {
        // Try to read from your posts API data or directly from markdown files
        const postsDir = join(process.cwd(), 'src', 'posts');
        
        // Get all markdown files
        const postFiles = globSync('**/*.{md,mdx}', { cwd: postsDir });
        
        const posts = [];
        const categories = new Set();

        for (const file of postFiles) {
            try {
                const filePath = join(postsDir, file);
                const content = readFileSync(filePath, 'utf-8');
                
                // Extract frontmatter
                const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
                if (frontmatterMatch) {
                    const frontmatter = parseFrontmatter(frontmatterMatch[1]);
                    if (frontmatter.published !== false) {
                        const slug = file.replace(/\.(md|mdx)$/, '').replace(/\//g, '/');
                        posts.push({
                            ...frontmatter,
                            slug
                        });
                        
                        if (frontmatter.categories) {
                            frontmatter.categories.forEach(cat => categories.add(cat));
                        }
                    }
                }
            } catch (fileError) {
                console.warn(`Error reading post file ${file}:`, fileError);
            }
        }

        return {
            posts,
            categories: Array.from(categories).reduce((acc, cat) => {
                acc[cat] = { slug: slugify(cat) };
                return acc;
            }, {})
        };
    } catch (error) {
        console.error('Error reading posts data:', error);
        return { posts: [], categories: {} };
    }
}

function parseFrontmatter(frontmatter: string) {
    const lines = frontmatter.split('\n');
    const result: any = {};
    
    for (const line of lines) {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
            const [, key, value] = match;
            if (value.startsWith('[') && value.endsWith(']')) {
                // Parse array
                result[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
            } else if (value === 'true') {
                result[key] = true;
            } else if (value === 'false') {
                result[key] = false;
            } else {
                result[key] = value.replace(/['"]/g, '');
            }
        }
    }
    
    return result;
}

function extractCategoriesFromPosts(posts: any[]) {
    const categories = new Set();
    posts.forEach(post => {
        if (post.categories) {
            post.categories.forEach(cat => categories.add(cat));
        }
    });
    
    return Array.from(categories).reduce((acc, cat) => {
        acc[cat] = { slug: slugify(cat) };
        return acc;
    }, {});
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}