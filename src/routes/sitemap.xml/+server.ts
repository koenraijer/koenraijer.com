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
    // Fetch posts from your existing API
    const response = await fetch(`${website}/api/posts`);
    const { posts } = await response.json();

    // Create XML root with all necessary namespaces
    const root = create({ version: '1.0', encoding: 'utf-8' })
        .ele('urlset', {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
            'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
            'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
            'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
            'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
        });

    // Add homepage
    root.ele('url')
        .ele('loc').txt(website).up()
        .ele('changefreq').txt('daily').up()
        .ele('priority').txt('1.0').up()
    .up();

    // Add blog posts
    for (const post of posts) {
        if (!post.published) continue; // Skip unpublished posts

        const postUrl = `${website}/${post.slug}`;
        const lastMod = post.updated || post.date; // Use updated date if available, otherwise use publication date

        root.ele('url')
            .ele('loc').txt(postUrl).up()
            .ele('lastmod').txt(lastMod).up()
            .ele('changefreq').txt('weekly').up()
            .ele('priority').txt('0.8').up()
        .up();
    }

    // Add category pages if you have them
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