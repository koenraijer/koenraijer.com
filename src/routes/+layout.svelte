<script lang="ts">
	export let data;

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.postcss';

	// UI
	import Footer from '$lib/components/Footer.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { ScrollArea } from '$lib/shadcn/ui/scroll-area/';
	import { Undo2 } from 'lucide-svelte';

	// All other imports
	import { Toaster } from "$lib/shadcn/ui/sonner";
	import { ModeWatcher, mode } from "mode-watcher";
	import PageTransition from '../lib/components/Transition.svelte';
  
	// Variables
	let link: HTMLLinkElement;
	let logo: string;

	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0); // Workaround for page not scrolling to top on navigation

		// Add copy button to all code blocks
		for (const node of document.querySelectorAll('pre > code')) {
			const preElement = node.parentElement;
			if (!preElement) continue;
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

			(node as HTMLElement).style.overscrollBehaviorX = 'hide'; // Set overscroll-x to auto TO MAKE COPYBUTTON APPEAR AGAIN

			new CopyButton({ // Use any desired Svelte component here
				target: buttonContainer,
				props: {
					content: node.textContent ?? '',
				},
			});

			preElement.appendChild(buttonContainer);
		}
	});

	// Apply correct PrismJS theme based on theme
	onMount(() => {
		link = document.createElement('link');
		link.rel = 'stylesheet';
		// We'll apply the correct code theme immediately on mount
		link.href = $mode === 'light' ? '/css/prism.css' : '/css/prismDark.css';
		document.head.appendChild(link);
		// Set the correct favicon
    	logo = $mode === 'light' ? "/favicon/favicon_light.svg" : "/favicon/favicon_dark.svg";
	});

	$: {
		if (link) { // Make sure that the link element has been created
			if ($mode === 'light') {
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
	<!-- Preload the favicon based on theme -->
	{#if $mode === 'light'}
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

	<!-- Preload CSS stylesheets -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">

	<!-- Preload fonts -->
	<link rel="preload" href="/fonts/General_Sans/GeneralSans-Variable.ttf" as="font" type="font/ttf" crossorigin="">
	<link rel="preload" href="/fonts/General_Sans/GeneralSans-VariableItalic.ttf" as="font" type="font/ttf" crossorigin="">

</svelte:head>

<ModeWatcher />
<Toaster />

<!-- <ScrollArea orientation="both" class="!m-0 !p-0 w-screen h-screen"> -->
<div class="w-full grid grid-rows-[auto_1fr_auto] min-h-[100svh]">
	<!-- Header -->
	<header class="px-4 md:px-8 py-6 h-fit">
		<!-- Your header content -->
		{#if !$page.url.pathname.startsWith('/books/') && $page.url.pathname !== '/'}
			<div class="flex items-center group">
				<a 
					href="/"
					class="inline-flex items-center group text-sm text-muted-foreground/80 hover:text-foreground"
				>
					<Undo2 class="w-4 h-4 mr-1"/>
					Index
				</a>
			</div>
		{/if}
	</header>

	<!-- Main Content Area -->
	<PageTransition url={data.url}>
		<main class="relative min-h-0">
			<div class="h-full"> <!-- Scrollable container -->
			  <slot />
			</div>
		</main>
	</PageTransition>

	<!-- Footer -->
	<Footer />
</div>
<!-- </ScrollArea> -->