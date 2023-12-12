export function formatDate(date, locales = 'usa') {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    let month = dateObject.toLocaleString(locales, { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = dateObject.getFullYear();

    return `${month} ${day}, ${year}`;
}