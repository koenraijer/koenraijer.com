import { error } from '@sveltejs/kit';
import { website } from '$lib/js/info.js';

export const prerender = true;

export async function load({ params, fetch }) {
    try {
        const data = await fetch("/book_data.json").then(res => res.json());
        const book = data.find(book => book.slug === params.slug);
        
        if (!book) {
            throw error(404, `Book ${params.slug} not found`);
        }
        
        return {
            book
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}. ${e}`);
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function entries() {
    const response = await fetch(new URL('/book_data.json', website));
    const data = await response.json();
    return data.map(book => ({ slug: book.slug }));
}
// This function has been added to svelte.config.js and enables prerendering of book pages.
