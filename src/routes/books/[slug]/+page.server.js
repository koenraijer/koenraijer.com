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
    try {
        const response = await fetch(new URL('/book_data.json', website));
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        const entries = data.filter(book => book.slug).map(book => ({ slug: book.slug }));
        
        // Log the specific book
        const found = entries.find(e => e.slug === 'de-nederlandse-paus-adrianus-van-utrecht-1459-1523');
        console.log('Book in entries:', !!found);
        
        return entries;
    } catch (e) {
        console.error('entries() failed:', e);
        return []; // This would cause pages to not be prerendered
    }
}
// This function has been added to svelte.config.js and enables prerendering of book pages.
