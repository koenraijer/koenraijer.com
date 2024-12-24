// api/posts/+server.js
import { json } from '@sveltejs/kit'
import readingTime from 'reading-time'

async function getPostsAndCategories() {
    let posts = []
    let categoriesData = new Map();

    const paths = import.meta.glob(['/src/posts/*.md', '/src/posts/*.svx'], { eager: true });
    
    posts = await Promise.all(
        Object.entries(paths).map(async ([path, file]) => {
            const slug = path.split('/').at(-1)?.replace('.md', '')
            
            if (file && typeof file === 'object' && 'metadata' in file && slug) {
                const metadata = file.metadata
                const moduleInfo = file  // Use the file object directly
                const stats = readingTime(moduleInfo.default.render().html, { wordsPerMinute: 250 })
                const preview = metadata.preview || moduleInfo.default.render().html.match(/<p>(.*?)<\/p>/)?.[1] || ""

                if (metadata.published) {
                    metadata.categories?.forEach(category => {
                        const categorySlug = category.toLowerCase().replace(/ /g, '-')
                        if (categoriesData.has(category)) {
                            categoriesData.set(category, {
                                ...categoriesData.get(category), 
                                count: categoriesData.get(category).count + 1
                            })
                        } else {
                            categoriesData.set(category, {slug: categorySlug, count: 1})
                        }
                    })

                    return {
                        ...metadata,
                        slug,
                        readingTime: stats.text,
                        wordCount: stats.words,
                        modulePath: `/src/posts/${slug}.md`, // Store the path for dynamic import
                        preview: {
                            html: preview,
                            text: preview.replace(/<[^>]*>/g, '')
                        }
                    }
                }
            }
            return null
        })
    )

    posts = posts
        .filter(post => post !== null)
        .sort((first, second) => 
            new Date(second.date).getTime() - new Date(first.date).getTime()
        )

    const categories = Object.fromEntries(categoriesData)
    return { posts, categories }
}

export async function GET() {
    const data = await getPostsAndCategories()
    return json(data)
}