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
	import Footer from '$lib/components/Footer.svelte'
	import Menu from '$lib/components/Menu.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import PageTransition from '../lib/components/Transition.svelte';
	export let data;
	import { onMount } from 'svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import * as info from '$lib/js/info.js'
	import BooksButton from '../lib/components/BooksButton.svelte';
	import ToTopButton from '../lib/components/ToTopButton.svelte';
	// Workaround for page not scrolling to top on navigation
	import { afterNavigate } from '$app/navigation';
	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);
	});
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

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
	<link rel="manifest" href="/favicon/site.webmanifest">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
</svelte:head>

<div class="w-full grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-full min-h-[100svh] bg-surface-50-900-token">
	<div class="flex justify-between w-full place-self-center mx-auto pt-6 px-6 sm:px-8 sm:pt-8">
		<a href="/" class="text-2xl font-semibold whitespace-nowrap hover:underline" title="Visit homepage">{info.title}</a>
		<Menu>
			<svelte:fragment slot="small-screens">
				<BooksButton />
				<hr>
				<div class="flex row-nowrap justify-between gap-x-2">
					<ThemeToggle />
					<ToTopButton />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="large-screens">
				<a href="/library" class="whitespace-nowrap hover:underline font-semibold text-lg text-surface-900-50-token">Library</a>
				<ThemeToggle />
			</svelte:fragment>
		</Menu>
	</div>
	
	<!-- Router Slot -->
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
	
	<!-- (footer) -->
	<Footer />
</div>


