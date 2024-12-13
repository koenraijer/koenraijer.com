import { website, title, bio } from '$lib/js/info.js';

export async function GET() {
    // Fetch posts from your API endpoint
    const response = await fetch(`${website}/api/posts`);
    const { posts } = await response.json();

    // Create RSS feed
    const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
    <title>${title}</title>
    <link>${website}</link>
    <description>${bio.text}</description>
    ${posts
        .map(
            (post) => `<item>
        <guid>${website}/blog/${post.slug}</guid>
        <title>${post.title}</title>
        <link>${website}/blog/${post.slug}</link>
        <description>${post.preview.text}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${post.categories.map(category => `<category>${category}</category>`).join('')}
    </item>`
        )
        .join('')}
</channel>
</rss>`;

    // Return the response with appropriate headers
    return new Response(body, {
        headers: {
            'Cache-Control': 'max-age=0, s-max-age=600',
            'Content-Type': 'application/xml'
        }
    });
}