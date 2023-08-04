<script>
	// Custom Skeleton theme
	import '../theme.postcss';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// All other imports
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import PageTransition from '../lib/components/Transition.svelte';
	export let data;
	import { onMount } from 'svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';

	let link;

	// Apply correct PrismJS theme based on theme
	onMount(() => {
		link = document.createElement('link');
		link.rel = 'stylesheet';

		// We'll apply the correct theme immediately on mount
		link.href = $modeCurrent ? '/css/prism.css' : '/css/prismDark.css';
		document.head.appendChild(link);
	});

	$: {
		if (link) { // Make sure that the link element has been created
		if ($modeCurrent) {
			link.href = '/css/prism.css';
		} else {
			link.href = '/css/prismDark.css';
		}
		}
	}
</script>

	<AppShell>

		<svelte:fragment slot="header">

		</svelte:fragment>
	
		<svelte:fragment slot="pageHeader">
			<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-surface-50-900-token max-w-6xl mx-auto" padding="p-4 px-6 screen-5xl:px-0">
				<svelte:fragment slot="lead">
					<a href="/" class="text-2xl font-semibold">Koen Raijer</a>
				</svelte:fragment>
					<!--(title)-->
				<svelte:fragment slot="trail">
					<!--(actions)-->
					<ThemeToggle />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
	
		<!-- Router Slot -->
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	
		<!-- (footer) -->
		<svelte:fragment slot="pageFooter">
			<div class="mx-auto w-full py-8 max-w-xl flex justify-between text-surface-500 px-6 sm:px-8 screen-5xl:px-0 gap-x-2">
				<span>
					© {new Date().getFullYear()} <a href="/" class="hover:underline">Koen Raijer</a>
				</span>
				<a href="/rss.xml" class="hover:underline">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-flex align-middle">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
					</svg>
					RSS
				</a>
				<a href="/changelog" class="hover:underline">Changelog</a>
				<a href="https://github.com/koenraijer/koenraijer.2.0" class="hover:underline" target="_self" rel="nofollow noopener noreferrer">Source</a>
			</div>
		</svelte:fragment>

	</AppShell>

