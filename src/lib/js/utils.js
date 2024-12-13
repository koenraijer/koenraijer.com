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
/**
 * @param {string | number | Date} date
 */
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

/**
 * Convert a date to relative time format (e.g., "13 hr ago", "1 wk ago")
 * @param {string | number | Date} date - Date to convert
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSec < 60) {
        return `${diffSec} sec ago`;
    } else if (diffMin < 60) {
        return `${diffMin} min ago`;
    } else if (diffHr < 24) {
        return `${diffHr} hr ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffWeeks < 4) {
        return `${diffWeeks} wk${diffWeeks > 1 ? 's' : ''} ago`;
    } else if (diffMonths < 12) {
        return `${diffMonths} mo${diffMonths > 1 ? 's' : ''} ago`;
    } else {
        return `${diffYears} yr${diffYears > 1 ? 's' : ''} ago`;
    }
}