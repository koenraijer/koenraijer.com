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
	import CopyButton from '$lib/components/CopyButton.svelte';
	import A from '$lib/components/A.svelte';

	// Floating UI
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	
	// Workaround for page not scrolling to top on navigation
	import { afterNavigate } from '$app/navigation';

	// preparePageTransition(); // View transitions API

	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);
		for (const node of document.querySelectorAll('pre > code')) {
			const preElement = node.parentElement;
			preElement.style.position = 'relative'; // Set position relative to the <pre> element
			preElement.style.overflow = 'auto'; // Set overflow to auto to allow scrolling
			
			const buttonContainer = document.createElement('div');
			buttonContainer.style.position = 'absolute'; // Position absolutely relative to <pre>
			// Width and height of pre element
			buttonContainer.style.bottom = '0';
			buttonContainer.style.top = '0';
			buttonContainer.style.right = '0';
			buttonContainer.style.height = '100%'; // Adjust height as needed for the button
			buttonContainer.style.backgroundColor = 'transparent';
			buttonContainer.style.zIndex = '10';
			
			node.style.overscrollBehaviorX = 'hide'; // Set overscroll-x to auto TO MAKE COPYBUTTON APPEAR AGAIN

			new CopyButton({ // Use any desired Svelte component here
				target: buttonContainer,
				props: {
					content: node.textContent ?? '',
				},
			});

			preElement.appendChild(buttonContainer);
		}
	});

	let menuItems = info.menuItems;
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

<div class="w-full grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-[100svh] bg-surface-50 dark:bg-surface-800">
	<div class="flex justify-between w-full place-self-center mx-auto pt-6 px-6 sm:px-8 sm:pt-8">
		<a href="/" class="text-lg font-medium dark:font-normal inline w-fit hover:underline whitespace-nowrap text-start" title="Visit homepage">
				Koen Raijer
		</a>
		<div class="w-fit flex flex-row flex-nowrap gap-x-4 md:flex-row-reverse">
			<ThemeToggle />
			<Menu>
				<svelte:fragment slot="small-screens">
					{#each menuItems as item}
						<MenuButton href={item.href}>{item.title}</MenuButton>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="large-screens">
					{#each menuItems as item}
						<A href={item.href} classes="whitespace-nowrap hover:underline font-normal text-base text-surface-900-50-token dark:font-thin font-normal">{item.title}</A>
					{/each}
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


