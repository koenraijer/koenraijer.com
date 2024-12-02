export async function load({ data }) {
    return {
        posts: data.posts,
        categories: data.categories,
        categoryPosts: data.categoryPosts,
        category: data.category
    };
}