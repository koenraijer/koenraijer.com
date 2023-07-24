import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/utils'

export async function load({ params }) {
    try {
        const allPosts = await getPosts()
        const currentPostIndex = allPosts.findIndex(post => post.slug === params.slug)

        const previous = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
        const next = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null
        
        const post = await import(`../../posts/${params.slug}.md`)

		console.log(allPosts)
        return {
            content: post.default,
            meta: post.metadata,
			readingTime: post.readingTime,
            previous,
            next,
        }
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`)
    }
}