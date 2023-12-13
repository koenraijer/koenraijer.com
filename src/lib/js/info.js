import { dev } from '$app/environment';

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

export const email = 'koenrayer@gmail.com'

// Used for the hero
export const avatar = 'avatar.webp'

export const bio = { 
    text: `Hi, I'm Koen. I'm a medical doctor doing research on the crossroads of psychiatry and data science. I'm based in Sittard, the Netherlands. My research concerns predicting when people are having intrusions from past traumatic events using physiological data and machine learning. This is where I share my thoughts on a non-specific set of topics, although admittedly, it's mostly tacky programming tutorials because I can't stop myself from tweaking the website rather than writing posts.`,
    html: `Hey there, I'm Koen — a medical doctor at the intersection of psychiatry and data science, based in <s>Maastricht</s> Sittard, the Netherlands. My research concerns the detection of intrusive memories using physiological data and machine learning. This is where I <i>would like</i> to share my thoughts on a non-specific set of topics, although, admittedly, most are short programming tidbits because I can't stop myself from tweaking the website rather than writing posts. `
}
