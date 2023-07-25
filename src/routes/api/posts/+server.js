import { json } from '@sveltejs/kit'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

async function getPosts() {
	let posts = []

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata
			const content = file.default
			const html = parse(content.render().html)
			const post = { ...metadata, slug, readingTime: readingTime(html.structuredText).text } 
			post.published && posts.push(post)
		}
	}

	posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
