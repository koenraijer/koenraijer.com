// src/routes/sitemap.xml/+server.ts
import { website } from '$lib/js/info.js';
import { create } from 'xmlbuilder2';

export const prerender = true;

export async function GET() {
    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
    };
    return new Response(await getSitemapXml(), { headers });
}

async function getSitemapXml(): Promise<string> {
    // Fetch both posts and books data
    const [postsResponse, booksResponse] = await Promise.all([
        fetch(`${website}/api/posts`),
        fetch(`${website}/book_data.json`)
    ]);
    
    const { posts } = await postsResponse.json();
    const books = await booksResponse.json();

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

            root.ele('url')
                .ele('loc').txt(bookUrl).up()
                .ele('lastmod').txt(new Date(lastMod.replace('/', '-')).toISOString()).up()
                .ele('changefreq').txt('monthly').up()
                .ele('priority').txt('0.7').up()
            .up();
        }
    }

    // Add blog posts
    for (const post of posts) {
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
    if (posts.categories) {
        for (const [category, data] of Object.entries(posts.categories)) {
            const categoryUrl = `${website}/category/${data.slug}`;
            
            root.ele('url')
                .ele('loc').txt(categoryUrl).up()
                .ele('changefreq').txt('weekly').up()
                .ele('priority').txt('0.7').up()
            .up();
        }
    }

    return root.end();
}