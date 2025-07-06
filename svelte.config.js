import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [vitePreprocess({}), mdsvex(mdsvexConfig)],

    kit: {
        adapter: adapter(),
        // files: {
        //     assets: ['src/images']
        // },
        prerender: {
            entries: ['*'],
            handleHttpError: ({ path, referrer, message }) => {
                // Log 404s but continue building
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
