import { error } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { website } from '$lib/js/info.js';

export const prerender = true;

export async function load({ params, fetch }) {
    try {
        const books = await fetch("/book_data.json").then(res => res.json());
        let notes = await fetch("/book_notes.json").then(res => {
            return res.ok ? res.json() : [];
        });
        if (!Array.isArray(notes) || notes.length === 0) {
            // Fallback: read from filesystem during server/prerender
            try {
                const filePath = path.resolve('static', 'book_notes.json');
                const raw = await fs.readFile(filePath, 'utf-8');
                notes = JSON.parse(raw);
            } catch {
                // keep notes as []
            }
        }
        const book = books.find((b) => b.slug === params.slug);
        
        if (!book) {
            throw error(404, `Book ${params.slug} not found`);
        }
        // Helper: normalize
        const stripSubtitle = (s) => (s ? String(s).split(/[:\-\u2014]/)[0] : s);
        const norm = (s) => (s ? String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() : '');
        const onlyDigitsX = (s) => (s ? String(s).replace(/[^0-9Xx]/g, '').toUpperCase() : '');
        const stop = new Set(['a','an','the','and','or','of','to','in','on','for','my','your','van','de','het','der','die','das']);
        const THRESHOLD = 8; // locked matching threshold

        // Scoring function available to simulations and main matcher
        const scoreNoteFactory = (bk) => {
            const bIsbn10 = onlyDigitsX(bk['ISBN']);
            const bIsbn13 = onlyDigitsX(bk['ISBN13']);
            const bTitle = norm(stripSubtitle(bk['Title']));
            const bAuthor = norm(bk['Author']);
            const bYear = bk['Original Publication Year'] || bk['Year Published'] || null;
            const bPublisher = norm(bk['Publisher']);

            const scoreNote = (n) => {
                const nTitle = norm(stripSubtitle(n.title));
                const nAuthors = Array.isArray(n.author) ? n.author.map(norm) : [norm(n.author)];
                const nAuthor = nAuthors[0] || '';
                const nYear = n.year || null;
                const nPublisher = norm(n.publisher);

                let score = 0;
                // Title similarity via token overlap
                const tA = new Set(bTitle.split(' ').filter((w) => w && !stop.has(w)));
                const tB = new Set(nTitle.split(' ').filter((w) => w && !stop.has(w)));
                const inter = new Set([...tA].filter((x) => x && tB.has(x)));
                const union = new Set([...tA, ...tB]);
                const jacc = union.size ? inter.size / union.size : 0;
                if (jacc >= 0.9) score += 5;
                else if (jacc >= 0.75) score += 4;
                else if (jacc >= 0.6) score += 3;

                // Author last-name match or high similarity
                const last = bAuthor.split(' ').pop();
                if (last && nAuthor.includes(last)) score += 4;
                else if (nAuthor && nAuthor === bAuthor) score += 4;

                // Year proximity
                if (bYear && nYear && Math.abs(Math.round(bYear) - Math.round(nYear)) <= 1) score += 2;

                // Publisher token overlap (low weight)
                if (bPublisher && nPublisher) {
                    const pA = new Set(bPublisher.split(' '));
                    const pB = new Set(nPublisher.split(' '));
                    const pInter = new Set([...pA].filter((x) => x && pB.has(x)));
                    const pUnion = new Set([...pA, ...pB]);
                    const pj = pUnion.size ? pInter.size / pUnion.size : 0;
                    if (pj >= 0.6) score += 1;
                }
                return score;
            };

            return { scoreNote, isbn: { bIsbn10, bIsbn13 }, bTitle, bAuthor };
        };

        // Collect candidate note matches for a given book
        const findNoteForBook = (bk) => {
            const ctx = scoreNoteFactory(bk);
            const { bIsbn10, bIsbn13 } = ctx.isbn;
            // Tier 1: ISBN exact
            const isbnHit = notes.find((n) => {
                const nIsbn = onlyDigitsX(n.isbn);
                const n10 = onlyDigitsX(n.isbn10);
                const n13 = onlyDigitsX(n.isbn13);
                return (
                    (nIsbn && (nIsbn === bIsbn10 || nIsbn === bIsbn13)) ||
                    (n10 && (n10 === bIsbn10 || n10 === bIsbn13)) ||
                    (n13 && (n13 === bIsbn10 || n13 === bIsbn13))
                );
            });
            if (isbnHit) return { note: isbnHit, via: 'isbn', score: 100 };

            // Tier 1b: exact normalized title AND author-last-name containment
            const last = ctx.bAuthor.split(' ').pop();
            const titleAuthorHit = notes.find((n) => {
                const nTitle = norm(stripSubtitle(n.title));
                const nAuthors = Array.isArray(n.author) ? n.author.map(norm) : [norm(n.author)];
                const nAuthor = nAuthors[0] || '';
                return nTitle === ctx.bTitle && last && nAuthor.includes(last);
            });
            if (titleAuthorHit) return { note: titleAuthorHit, via: 'title+author', score: 90 };

            // Tier 2: title+author+year/publisher scoring (fuzzy)
            const { scoreNote } = ctx;

            let best = null;
            for (const n of notes) {
                const s = scoreNote(n);
                if (s >= THRESHOLD && (!best || s > best.score)) best = { note: n, score: s, via: 'fuzzy' };
            }
            return best;
        };

        // Current book note (threshold locked via THRESHOLD)
        const match = findNoteForBook(book) || null;

        return {
            book,
            note: match ? match.note : null,
            noteMatchVia: match ? match.via : null
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
        
        return entries;
    } catch (e) {
        console.error('entries() failed:', e);
        return []; // This would cause pages to not be prerendered
    }
}
// This function has been added to svelte.config.js and enables prerendering of book pages.
