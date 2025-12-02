import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

// Get git commit info at build time
function getGitCommitHash() {
	try {
		return execSync('git log -1 --format="%h"').toString().trim();
	} catch {
		return 'unknown';
	}
}

function getGitCommitDate() {
	try {
		return execSync('git log -1 --format="%cd" --date=format:"%m.%d"').toString().trim();
	} catch {
		return '';
	}
}

export default defineConfig({
	define: {
		__GIT_COMMIT_HASH__: JSON.stringify(getGitCommitHash()),
		__GIT_COMMIT_DATE__: JSON.stringify(getGitCommitDate())
	},
	plugins: [enhancedImages(), sveltekit()]
});
