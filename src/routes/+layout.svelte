<script>
	// Custom Skeleton theme
	import '../theme.postcss';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// All other imports
	import {preparePageTransition} from '$lib/js/page_transition.js';
	import Footer from '$lib/components/Footer.svelte'
	import Menu from '$lib/components/Menu.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import PageTransition from '../lib/components/Transition.svelte';
	export let data;
	import { onMount } from 'svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import * as info from '$lib/js/info.js'
	import MenuButton from '../lib/components/MenuButton.svelte';
	import ToTopButton from '../lib/components/ToTopButton.svelte';
	import A from '$lib/components/A.svelte';
	// Workaround for page not scrolling to top on navigation
	import { afterNavigate } from '$app/navigation';

	preparePageTransition();
	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);
	});

	let link;
	let isDark = false;
	let logo;
	// Apply correct PrismJS theme based on theme

	onMount(() => {
		link = document.createElement('link');
		link.rel = 'stylesheet';

		// We'll apply the correct theme immediately on mount
		link.href = $modeCurrent ? '/css/prism.css' : '/css/prismDark.css';
		document.head.appendChild(link);

		// Set the correct favicon
    	logo = $modeCurrent ? "/favicon/favicon_light.svg" : "/favicon/favicon_dark.svg";
	});

	$: {
		if (link) { // Make sure that the link element has been created
		if ($modeCurrent) {
			link.href = '/css/prism.css';
			logo = "/favicon/favicon_light.svg";
		} else {
			link.href = '/css/prismDark.css';
			logo = "/favicon/favicon_dark.svg";
		}
		}
	}
</script>

<svelte:head>
	{#if $modeCurrent}
		<link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon_light/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon_light/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon_light/favicon-16x16.png">
		<link rel="manifest" href="/favicon/favicon_light/site.webmanifest">
	{:else}
		<link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon_dark/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon_dark/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon_dark/favicon-16x16.png">
		<link rel="manifest" href="/favicon/favicon_dark/site.webmanifest">
	{/if}
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
	<link rel="preload" href="/fonts/Mona Sans/Mona-Sans.woff2" as="font" type="font/woff2" crossorigin>
</svelte:head>

<div class="w-full grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-full min-h-[100svh] bg-surface-50-900-token">
	<div class="flex justify-between w-full place-self-center mx-auto pt-6 px-6 sm:px-8 sm:pt-8">
		<a href="/" class="text-lg font-semibold inline w-fit hover:underline whitespace-nowrap text-start" title="Visit homepage">
				Koen Raijer
			<!--
				{#if $modeCurrent}
					<svelte:component this={FaviconLight} />
				{:else}
					<svelte:component this={FaviconDark} />
				{/if}
				{#if $page.url.pathname === "/"}
					Koen Raijer
				{/if}
			-->
		</a>
		<div class="w-fit">
			<Menu>
				<svelte:fragment slot="small-screens">
					<MenuButton href="/books">Books</MenuButton>
					<MenuButton href="/changelog">Changelog</MenuButton>
					<MenuButton href="https://github.com/koenraijer/koenraijer.2.0">Source</MenuButton>
					<hr>
					<div class="flex row-nowrap justify-between gap-x-2">
						<ThemeToggle />
						<ToTopButton />
					</div>
				</svelte:fragment>
				<svelte:fragment slot="large-screens">
					<A href="/books" classes="whitespace-nowrap hover:underline font-normal text-lg text-surface-900-50-token">Books</A>
					<A href="/changelog" classes="whitespace-nowrap hover:underline font-normal text-lg text-surface-900-50-token">Changelog</A>
					<A href="https://github.com/koenraijer/koenraijer.2.0" classes="whitespace-nowrap hover:underline font-normal text-lg text-surface-900-50-token">Source</A>
					<ThemeToggle />
				</svelte:fragment>
			</Menu>
		</div>
	</div>
	
	<!-- Router Slot -->
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
	
	<!-- (footer) -->
	<Footer />
</div>


