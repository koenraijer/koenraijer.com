export function formatDate(date, locales = 'nl') {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString(locales, { month: 'short' }).toUpperCase();
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
}