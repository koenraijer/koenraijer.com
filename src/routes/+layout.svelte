<script lang="ts">
	export let data;
	import '../app.postcss';

	import { browser } from '$app/environment';
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths'

	// UI
	import Footer from '$lib/components/Footer.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { Undo2, Download } from 'lucide-svelte';
	import AnimatedLogo from '$lib/components/AnimatedLogo.svelte';

	// All other imports
	import { Toaster } from "$lib/shadcn/ui/sonner";
	import { ModeWatcher, mode } from "mode-watcher";
	import PageTransition from '../lib/components/Transition.svelte';

	// Copy code button
	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);

		for (const node of document.querySelectorAll('pre > code')) {
			const preElement = node.parentElement;
			if (!preElement) continue;

			// Create a wrapper div for the scroll container
			const scrollWrapper = document.createElement('div');
			scrollWrapper.style.position = 'relative';
			scrollWrapper.style.overflow = 'auto';

			// Move code into wrapper
			node.parentElement.insertBefore(scrollWrapper, node);
			scrollWrapper.appendChild(node);

			// Create button container that stays fixed
			const buttonContainer = document.createElement('div');
			buttonContainer.style.position = 'absolute';
			buttonContainer.style.right = '8px';
			buttonContainer.style.top = '8px';
			buttonContainer.style.zIndex = '50';
			buttonContainer.style.pointerEvents = 'auto';

			new CopyButton({
			target: buttonContainer,
			props: {
				content: node.textContent ?? '',
			},
			});

			// Add button to pre element, outside scroll wrapper
			preElement.appendChild(buttonContainer);
		}
	});

	// Books page navigation stuff
	let previousPage: string = base;

	// Map of paths to their display names
	const pathNames: { [key: string]: string } = {
		'/': 'Index',
		'/books': 'Books'
	};

	afterNavigate(({from}) => {
	if (from) {
		previousPage = from.url.pathname;
	}
	});

	// Get the display name for the previous page
	$: previousPageName = pathNames[previousPage] || 'Back';

	function goBack() {
	if (previousPage) {
		goto(previousPage, { replaceState: true });
	} else {
		goto("/books", { replaceState: true });
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
	<link rel="preload" href="/fonts/Newsreader/Newsreader-Italic-VariableFont_opsz,wght.ttf" as="font" type="font/ttf" crossorigin="">
	
</svelte:head>

<ModeWatcher />
<Toaster />

<!-- <ScrollArea orientation="both" class="!m-0 !p-0 w-screen h-screen"> -->
<div class="w-full grid grid-rows-[auto_1fr_auto] min-h-[100svh]">
	<!-- Header -->
	<header class="px-4 md:px-8 py-6 md:pt-8 h-fit relative">
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
		{:else if $page.url.pathname.startsWith('/books/')}
			<button 
				on:click={goBack} 
				class="inline-flex items-center group text-sm text-muted-foreground/80 hover:text-foreground"
			>
				<Undo2 class="w-4 h-4 mr-1"/>
				{previousPageName}
			</button>
		{:else}
			<AnimatedLogo />
		{/if}

		{#if $page.url.pathname === '/'}
			<a class="sm:hidden absolute inline-flex top-6 right-4 items-center gap-x-1 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors" href="https://koenraijer.com/240504_resume.pdf"><Download class="w-3 h-3 inline"/>Download Resume</a>
		{/if}
	</header>

	<!-- Main Content Area -->
	<PageTransition url={data.url}>
		<main>
			<slot />
		</main>
	</PageTransition>

	<!-- Footer -->
	<Footer />
</div>
<!-- </ScrollArea> -->