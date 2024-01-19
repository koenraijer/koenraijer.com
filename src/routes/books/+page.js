export async function load({ fetch }) {
    try {
        const books = await fetch("/book_data.json").then(res => res.json())
        return { books }
    } catch (err) {
        console.error(`Error parsing JSON: ${err}`);
    }
}
