import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

// Get git commit info at build time
function getGitCommitInfo() {
	try {
		const output = execSync('git log -1 --format="%h|%cd" --date=format:"%m.%d"').toString().trim();
		const [hash, date] = output.split('|');
		return { hash, date };
	} catch {
		return { hash: 'unknown', date: '' };
	}
}

const gitInfo = getGitCommitInfo();

export default defineConfig({
	define: {
		__GIT_COMMIT_HASH__: JSON.stringify(gitInfo.hash),
		__GIT_COMMIT_DATE__: JSON.stringify(gitInfo.date)
	},
	plugins: [enhancedImages(), sveltekit()]
});
