import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [vitePreprocess({}), mdsvex(mdsvexConfig)],

    kit: {
        adapter: adapter(),
        prerender: {
            entries: ['*'],
            handleHttpError: ({ path, referrer, message }) => {
                // Specifically handle the problematic URL
                if (path === '/books/hyperion-by-dan-simmons-1989-05-26') {
                    console.warn(`Skipping problematic URL: ${path}`);
                    return;
                }

                // Log other 404s but continue building
                if (message.includes('404')) {
                    console.warn(`Warning: ${message}. Skipping prerender for ${path}`);
                    return;
                }

                // Throw error for other types of errors
                throw new Error(message);
            }
        }
    }
};

export default config;
