export async function load({ data }) {
    console.log(data.post)
    // Use data.post to match  
    return {
        post: data.post,
    }
}
