import { dev } from '$app/environment';

/**
 * @type {string}
 */
export let website;

// Root URL of your website
if (dev) {
    website = 'http://localhost:5173' 
} else {
    website = 'https://koenraijer.com'
}

export const domain = website
export const title = 'Koen Raijer'
export const firstName = 'Koen'
export const lastName = 'Raijer'
export const name = `${firstName} ${lastName}`
export const email = 'contact.koenraijer@pm.me'
export const avatar = '/241122_avatar.webp'
export const bio = { 
    text: `Personal website of Koen Raijer. Psychiatry resident and researcher. Interests: personalized models of psychopathology, digital phenotyping, ambulatory assessment.`,
}

// Socials
export const github_repo = "https://github.com/koenraijer/koenraijer.com";
export const github = "https://github.com/koenraijer/"
export const linkedin = "https://www.linkedin.com/in/koen-raijer-3495a7127/";
export const goodreads = "https://www.goodreads.com/koenraijer/";

// Hero
export const rabbitholes = 
[
    'bicycle repair',
    'internet history',
    'free energy',
    'network theory',
    'rituals',
    'gnosticism',
]

// Old bio's:
// Hi! Welcome to this always-changing and never-finished hobby project. I work in clinical psychiatry as a medical doctor and am doing research at the intersection of psychiatry and data science. This is where I <i>would like</i> to share my thoughts and report back to the world, although, admittedly, most <a href="#recent_posts" class="anchor">posts</a> are short programming tidbits because I can't stop myself from tweaking the website rather than doing proper writing.
// 👋 Hey there, I'm Koen — a medical doctor at the intersection of psychiatry and data science, based in <s>Maastricht</s> Sittard, the Netherlands. My research concerns the detection of intrusive memories using physiological data and machine learning. This is where I <i>would like</i> to share my thoughts on a non-specific set of topics, although, admittedly, most are short programming tidbits because I can't stop myself from tweaking the website rather than writing posts. 
