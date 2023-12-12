export async function load({ fetch }) {
    try {
        const res = await fetch('/BookData.json');
        const data = await res.json();
        return {
            columns: data[0],
            books: data.slice(1)  // skip the first item which are column titles
        }
    } catch (err) {
        console.error(`Error parsing JSON: ${err}`);
    }
}
