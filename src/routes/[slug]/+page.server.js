import { error } from '@sveltejs/kit'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/posts')
        const { posts, categories } = await response.json()

        const currentPostIndex = posts.findIndex(post => post.slug === params.slug)

        const previous = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null
        const next = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null
        
        if(currentPostIndex < 0) {
            error(404, `Could not find ${params.slug}`);
        }

        const post = posts[currentPostIndex];

        const html = parse(post.content)

        post.readingTime = readingTime(html.structuredText, { wordsPerMinute: 250 }).text

        return {
            post: {
                ...post,
                allCategories: categories,
                content: html.toString(),
                previous,
                next,
            }
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}, ${e}`);
    }
}
