import * as info from "$lib/js/info.js";
export const prerender = true

export async function GET({ fetch, setHeaders }) {
    setHeaders({
        'Cache-Control': `max-age=0, s-max-age=600`,
        'Content-Type': 'application/xml'
    })

    // Fetch posts from your API
    const response = await fetch(`/api/posts`)
    const {posts} = await response.json()
  
    // Define the base properties of your RSS feed
    const name = info.name
    const website = info.website
    const websiteDescription = info.bio.text
  
    // Generate the RSS feed
    const xml = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${name}</title>
        <link>${website}</link>
        <description>${websiteDescription}</description>
        <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts.map(post => `
        <item>
            <title>${post.title}</title>
            <link>${website}/${post.slug}</link>
            <description>${post.description}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <guid>${website}/${post.slug}</guid>
        </item>
        `).join('')}
    </channel>
    </rss>
    `
    // Return the RSS feed
    return new Response(xml);
  }
  
  