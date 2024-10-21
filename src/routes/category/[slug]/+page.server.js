import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/posts')
        const { posts, categories } = await response.json()

        // Look up the category name by its slug
        const categoryName = Object.keys(categories).find(key => categories[key].slug === params.slug);

        // Check if the category exists
        if (!categoryName) {
            throw new Error(`Category ${params.slug} does not exist`);
        }

        // Filter the posts by the category
        const filteredPosts = posts.filter(post => post.categories.includes(categoryName));

        return {
            posts,
            categories,
            categoryPosts: filteredPosts,
            category: categoryName
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}. ${e}`);
    }
}
