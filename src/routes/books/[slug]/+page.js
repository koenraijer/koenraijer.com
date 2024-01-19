export async function load({ data }) {
    try {
        return {
            data
        }
    } catch (err) {
        console.error(`Error parsing JSON: ${err}`);
    }
}
