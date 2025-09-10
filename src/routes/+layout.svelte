<script lang="ts">
	export let data;
	import '../app.postcss';

	import * as info from '$lib/js/info.js'
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths'

	// UI
	import Footer from '$lib/components/Footer.svelte';
	import CopyButton from '$lib/components/CodeCopyButton.svelte';
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
			goto(previousPage, { replaceState: true, noScroll: true });
		} else {
			goto("/books", { replaceState: true, noScroll: true });
		}
	}
</script>

<svelte:head>
	<!-- SEO -->
	<link rel="canonical" href="{info.website}{$page.url.pathname}" />

	<!-- Accept Webmentions -->
	<link rel="webmention" href="https://webmention.io/www.koenraijer.com/webmention" />
	<link rel="pingback" href="https://webmention.io/www.koenraijer.com/xmlrpc" />

	<!-- RSS Autodiscovery -->
	<link rel="alternate" type="application/rss+xml" title="RSS" href="https://www.koenraijer.com/rss.xml">

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
	<svelte:element 
		this="link"
		rel="stylesheet" 
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" 
		media="print" 
		on:load={() => { const elem = document.querySelector('link[href*="katex"]'); if (elem) elem.setAttribute('media', 'all'); }}
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" 
		crossorigin="anonymous"
	/>

	<!-- Preload fonts -->
	<link rel="preload" href="/fonts/General_Sans/GeneralSans-Variable.ttf" as="font" type="font/ttf" crossorigin="">
	<link rel="preload" href="/fonts/General_Sans/GeneralSans-VariableItalic.ttf" as="font" type="font/ttf" crossorigin="">
	<link rel="preload" href="/fonts/Newsreader/Newsreader-Italic-VariableFont_opsz,wght.ttf" as="font" type="font/ttf" crossorigin="">
	
</svelte:head>

<ModeWatcher />
<Toaster />

<!-- h-card -->
<div class="h-card hidden">
	<img class="u-photo" src={info.avatar} alt="Koen Raijer's avatar" />
	<a class="p-name u-url" href="https://koenraijer.com">{info.name}</a>
	<a class="u-email" href={"mailto:" + info.email}>{info.email}</a>
	
	<p class="p-note">{info.bio.text}</p>
  
	<p>
	  <span class="p-org">Reinier van Arkel</span>
	  <span class="p-job-title">Psychiatry resident</span>
	</p>
  
	<!-- Social profiles -->
	<a class="u-url" rel="me" href={info.github}>GitHub</a>
	<a class="u-url" rel="me" href={info.linkedin}>LinkedIn</a>
	<a class="u-url" rel="me" href={info.goodreads}>GoodReads</a>
  </div>

<div class="w-full grid grid-rows-[auto_1fr_auto] min-h-[100svh]">
    <a 
		href="#main-content" 
		class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background"
	>
		Skip to main content
	</a>
	
	<!-- Header -->
    <header 
        class="px-4 md:px-8 py-6 md:pt-8 h-fit relative"
        aria-label="Primary navigation"
    >
        <nav aria-label="Primary navigation">
            {#if !$page.url.pathname.startsWith('/books/') && $page.url.pathname !== '/'}
                <div class="flex items-center group">
                    <a 
                        href="/"
                        class="inline-flex items-center group text-sm text-muted-foreground/80 hover:text-foreground"
                        aria-label="Return to index page"
                    >
                        <Undo2 class="w-4 h-4 mr-1" aria-hidden="true"/>
                        Index
                    </a>
                </div>
            {:else if $page.url.pathname.startsWith('/books/')}
                <button 
                    on:click={goBack} 
                    class="inline-flex items-center group text-sm text-muted-foreground/80 hover:text-foreground"
                    aria-label="Return to {previousPageName}"
                >
                    <Undo2 class="w-4 h-4 mr-1" aria-hidden="true"/>
                    {previousPageName}
                </button>
            {:else}
                <AnimatedLogo />
            {/if}

            
        </nav>
    </header>

    <!-- Main Content Area -->
    <PageTransition url={data.url}>
        <main 
            id="main-content"
            class="relative"
            tabindex="-1"
        >
            <slot />
        </main>
    </PageTransition>


	<!-- Footer -->
	<Footer />
	
</div>
