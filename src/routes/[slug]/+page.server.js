import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/posts')
        const { posts, categories } = await response.json()

        const currentPostIndex = posts.findIndex(post => post.slug === params.slug)

        if(currentPostIndex < 0) {
            error(404, `Could not find ${params.slug}`);
        }

        const post = posts[currentPostIndex]
        const previous = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null
        const next = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null

        return {
            post: {
                ...post,
                allCategories: categories,
                previous,
                next,
            }
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}, ${e}`);
    }
}