export async function load({ data }) {
    return {
        posts: data.posts,
        category: data.category
    };
}