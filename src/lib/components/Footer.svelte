<script lang="ts">
	import Socials from './Socials.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { FileClock } from 'lucide-svelte';
	import * as info from '$lib/js/info.js';
</script>

<footer class="mb-8 mt-10 section md:max-w-5xl flex flex-row justify-between w-full">
	<Socials />
	<div class="flex flex-row items-center gap-1.5">
		{#if info.git_commit_hash}
			<a
				href={info.git_commit_url}
				class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.625rem] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
				target="_blank"
				rel="noopener"
				title="Latest commit"
			>
				{info.git_commit_hash}{#if info.git_commit_date}&nbsp;· {info.git_commit_date}{/if}
			</a>
		{/if}
		<a href="/changelog" class="social" title="Changelog">
			<FileClock class="h-4 w-4" />
		</a>
		<ThemeToggle />
	</div>
</footer>
