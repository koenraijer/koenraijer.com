/*
export function formatDate(date, locales = 'usa') {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    let month = dateObject.toLocaleString(locales, { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = dateObject.getFullYear();

    return `${month} ${day}, ${year}`;
}
*/

// Write function that takes in format "YYYY/MM/DD" and returns "DD/MM/YYYY"
export function formatDate(date, locales = 'usa', compact = false) {
    if (compact) {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        let month = dateObject.toLocaleString(locales, { month: 'long' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const year = dateObject.getFullYear();
    
        return `${month} ${day}, ${year}`;
    }
}