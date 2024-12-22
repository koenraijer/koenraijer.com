// src/routes/api/books/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';

export const GET: RequestHandler = async () => {
    const booksPath = path.join(process.cwd(), 'static', 'book_data.json');
    const booksData = fs.readFileSync(booksPath, 'utf-8');
    const books = JSON.parse(booksData);
    return json(books);
};