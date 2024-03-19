import { json } from '@sveltejs/kit'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

async function getPostsAndCategories() {
    let posts = []
    let categoriesData = new Map(); // Map to store categories and their data

    const paths = import.meta.glob('/src/posts/*.md', { eager: true })

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata
            const content = file.default
            const htmlContent = content.render().html; // Get the rendered HTML content
            const html = parse(htmlContent)
            const preview = metadata.preview ? parse(metadata.preview) : html.querySelector('p') ? html.querySelector('p') : ""
            const post = { 
                ...metadata, 
                slug, 
                readingTime: readingTime(html.structuredText).text, 
                content: htmlContent, 
                preview: {
                    html: preview.toString(),
                    text: preview.structuredText ?? preview.toString()
                }
            } 

            // If the post is published, push it to the posts array and add/update its categories in the categoriesData map
            if (post.published) {
                posts.push(post)
                post.categories.forEach(category => {
                    const categorySlug = category.toLowerCase().replace(/ /g, '-'); // create a slug from category name
                    if (categoriesData.has(category)) {
                        categoriesData.set(category, {...categoriesData.get(category), count: categoriesData.get(category).count + 1})
                    } else {
                        categoriesData.set(category, {slug: categorySlug, count: 1})
                    }
                });
            }
        }
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    const categories = Object.fromEntries(categoriesData); // Convert the Map to an object
    return { posts, categories } // Return both posts and categories with their counts and slugs
}

export async function GET() {
    const data = await getPostsAndCategories()
    return json(data)
}