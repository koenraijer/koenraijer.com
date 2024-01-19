import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
    try {
        const data = await fetch("/book_data.json").then(res => res.json())

        // Match slug to slug in data
        const book = data.find(book => book.slug === params.slug)
        
        return {
            book
        }
    } catch (e) {
        throw error(404, `Could not find ${params.slug}. ${e}`)
    }
}
