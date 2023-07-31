import { error } from '@sveltejs/kit'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/posts')
        const { posts, categories } = await response.json()

        const allPosts = posts
        const currentPostIndex = allPosts.findIndex(post => post.slug === params.slug)

        const previous = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
        const next = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null
        
        const post = await import(`../../posts/${params.slug}.md`)

        const html = parse(post.default.render().html)
        post.metadata.readingTime = readingTime(html.structuredText).text

        console.log(categories)
        return {
            post: {
                ...post.metadata,
                categories,
                content: html.toString(),
                previous,
                next,
            },
        }
    } catch (e) {
        throw error(404, `Could not find ${params.slug}, ${e}`)
    }
}
