import { dev } from '$app/environment';

/**
 * @type {string}
 */
export let website;

// Root URL of your website
if (dev) {
    website = 'http://localhost:5173' 
} else {
    website = 'https://koenraijer.io'
}

export const domain = 'koenraijer.io'

// Title / logo for the website
export const title = 'Koen Raijer'

export const firstName = 'Koen'
export const lastName = 'Raijer'
export const name = `${firstName} ${lastName}`

export const email = 'hello@koenraijer.com'

// Used for the hero
export const avatar = 'avatar_nobg.png' //'avatar.webp'

export const bio = { 
    text: `Hi, I'm Koen! Welcome to this always-changing, never-finished website. I work in psychiatry, and I do research that applies computational methods to psychology and psychiatry. This is where I would like to share thoughts and updates, although most of the time I'm just tweaking the website.`,
    html: `Hi, I'm Koen! Welcome to this always-changing, never-finished website. I work in psychiatry, and I do research that applies computational methods to psychology and psychiatry. This is where I <i>would like</i> to share thoughts and updates, but most of the time I'm just tweaking the website. If you read just one thing, check out <a href="/experience-sampling" class="anchor">this self-experiment on experience sampling</a>.`
}

// Hi! Welcome to this always-changing and never-finished hobby project. I work in clinical psychiatry as a medical doctor and am doing research at the intersection of psychiatry and data science. This is where I <i>would like</i> to share my thoughts and report back to the world, although, admittedly, most <a href="#recent_posts" class="anchor">posts</a> are short programming tidbits because I can't stop myself from tweaking the website rather than doing proper writing.
// 👋 Hey there, I'm Koen — a medical doctor at the intersection of psychiatry and data science, based in <s>Maastricht</s> Sittard, the Netherlands. My research concerns the detection of intrusive memories using physiological data and machine learning. This is where I <i>would like</i> to share my thoughts on a non-specific set of topics, although, admittedly, most are short programming tidbits because I can't stop myself from tweaking the website rather than writing posts. 

export const menuItems = [
    { href: "/books", title: "Books" },
    { href: "/projects", title: "Projects" },
    { href: "/changelog", title: "Changelog" },
    { href: "/240504_resume.pdf", title: "CV" },
    { href: "https://github.com/koenraijer/koenraijer.io", title: "Source" }
];

export const projects = {
    "ReAsset": {
        "title": "ReAsset",
        "time_period" : "2023",
        "description": "A web app to help you rebalance assets your investment portfolio with the minimum amount of transactions, saving you time and money.",
        "image": "reasset.app.png",
        "link": "https://reasset.koenraijer.io/", 
        "code" : "https://github.com/koenraijer/reasset",
        "languages": [ "Javascript", "SvelteKit", "TailwindCSS"],
        "finished" : false
    },
    "Outline Labs": {
        "title": "Outline Labs",
        "time_period" : "2024",
        "description": "A web app for creating schemas that enable quick medical note-taking.",
        "image": "",
        "link": "https://outline-labs.web.app/", 
        "code" : "",
        "languages": [ "Typescript", "SvelteKit", "TailwindCSS", "Firebase"],
        "finished" : false
    }
}