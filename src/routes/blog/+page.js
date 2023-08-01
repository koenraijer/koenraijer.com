export async function load({ fetch }) {
	const response = await fetch('api/posts')
	const {posts, categories} = await response.json()
	let featured;

	// Find the first post that has 'featured: true'
	for (let post of posts) {
		if (post.featured) {
			featured = post;
			break;
		}
	}

	return { posts, featured, categories } // Featured may be used in the future
}
