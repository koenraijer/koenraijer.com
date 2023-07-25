import { getPosts } from '$lib/utils'
import { error } from '@sveltejs/kit'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

export async function load({ params }) {
    try {
        const allPosts = await getPosts()
        const currentPostIndex = allPosts.findIndex(post => post.slug === params.slug)

        const previous = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
        const next = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null
        
        const post = await import(`../../posts/${params.slug}.md`)

        const html = parse(post.default.render().html)
        post.metadata.readingTime = readingTime(html.structuredText).text

        return {
            post: {
                ...post.metadata,
                content: html.toString(),
                previous,
                next,
            }
        }
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`)
    }
}
