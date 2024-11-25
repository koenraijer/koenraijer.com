<script>
	import Hero from '$lib/components/Hero.svelte';
	import { Link2 } from 'lucide-svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Book from '$lib/components/Book.svelte';
	import * as info from '$lib/js/info.js';
	import A from '$lib/components/A.svelte';
	import FadedScrollArea from "$lib/components/FadedScrollArea.svelte";

	// @ts-ignore
	import { slide } from 'svelte/transition';
	
	/**
	 * @param {Element} node
	 * @param {import("svelte/transition").SlideParams | undefined} options
	 */
	// @ts-ignore
	function fadeSlide(node, options) {
        const slideTrans = slide(node, options);
        return {
            // @ts-ignore
            duration: options.duration,
            css: (/** @type {number} */ t) => `
				${slideTrans ? 
				// @ts-ignore
				slideTrans.css(t, options) : ''}
                opacity: ${t};
            `
        };
    }
	
	// @ts-ignore
	export let data

	let isHovered = false;

	let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
		category,
		count,
		slug
	}));

	data.categories = categoriesArray;

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(info.name)}`

</script>

<!-- SEO -->
<svelte:head>
  <title>{info.name}</title>
  <meta name="description" content={info.bio.text} />
  <meta name="author" content={info.name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={info.website} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={info.name} />
  <meta property="og:description" content={info.bio.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={info.website} />
  <meta property="twitter:url" content={info.website} />
  <meta name="twitter:title" content={info.name} />
  <meta name="twitter:description" content={info.bio.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<section class="section md:max-w-5xl">
	<Hero />
</section>

<!-- Three column layout container -->
<div class="section md:max-w-5xl flex flex-col md:grid md:grid-cols-3 md:gap-x-4 h-auto">

	<!-- Posts column -->
	<section>
		<h2 id="writing" class="text-sm font-normal text-muted-foreground/80 mb-2">Writing</h2>
		<FadedScrollArea class="md:h-[30vh] md:pr-4">
					<Posts posts={data.posts}/>
		</FadedScrollArea>
	</section>

	<!-- Books column -->
	<section class="mt-8 sm:mt-12 md:mt-0 h-fit">
		<h2 
			id="reading" 
			class="text-sm font-normal text-muted-foreground/80 mb-2"
			on:mouseenter={() => isHovered = true}
			on:mouseleave={() => isHovered = false}
		>
			<a href="/books" class="inline-flex items-center">
				Reading 
				<Link2 class="w-4 h-4 text-muted-foreground/40 dark:text-muted-foreground/70 inline rotate-45 ml-1"/>
				{#if isHovered}
					<span
					class="overflow-hidden whitespace-nowrap text-muted-foreground/50 dark:text-muted-foreground/80 pl-2 text-xs"
					transition:fadeSlide={{ axis: "x", duration: 200 }}
					>
					visit /books
					</span>
				{/if}
			</a>
		</h2>
		<FadedScrollArea class="md:h-[30vh] md:pr-4">
				{#each data.current_books as book}
					<Book book={book} compact/>
				{/each}
		</FadedScrollArea>
	</section>

	<!-- Projects column -->
	<section class="mt-8 sm:mt-12 md:mt-0 h-fit">
		<h2 id="projects" class="text-sm font-normal text-muted-foreground/80 mb-2">Projects</h2>

		<FadedScrollArea class="md:h-[30vh] md:pr-4">
				<div class="flex flex-col">
					<A href="https://reasset.koenraijer.com/" classes="anchor text-sm">ReAsset</A>
					<A href="https://outline-labs.web.app/" classes="anchor text-sm">Outline Labs</A>
				</div>
		</FadedScrollArea>
	</section>
</div>

<!-- Now -->
<section class="section md:max-w-5xl h-fit">
	<h2 id="now" class="text-sm font-normal text-muted-foreground/80 mb-2">Now</h2>
	<p class="text-sm">
		<span>Working at Zuyderland Mental Health Service. Writing </span>
		<A classes="text-sm anchor" href="https://doi.org/10.17605/OSF.IO/CR5F8">a scoping review</A> on ambulatory assessment in PTSD. Learning Firebase by working on <A href="https://outline-labs.web.app/" classes="anchor text-sm">Outline Labs</A>. Recently: finished MSc in Data Science & Society at Tilburg University.
	</p>	
</section>