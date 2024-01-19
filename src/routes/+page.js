export async function load({ fetch }) {
	const response = await fetch('api/posts')
	const {posts, categories} = await response.json()
	let featured;

	const current_books = await fetch("/book_data.json").then(res => res.json()).then(books => books.filter(book => book["Exclusive Shelf"] === "currently-reading"))

	// Find the first post that has 'featured: true'
	for (let post of posts) {
		if (post.featured) {
			featured = post;
			break;
		}
	}

	return { posts, featured, categories, current_books } // Featured may be used in the future
}
