<script>
	import Hero from '$lib/components/Hero.svelte';
	import { Link2 } from 'lucide-svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Book from '$lib/components/Book.svelte';
	import * as info from '$lib/js/info.js';
	import A from '$lib/components/A.svelte';

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
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(info.name)}&description=${encodeURIComponent(info.bio.text)}`;

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


<!-- Introduction -->
<section class="section md:max-w-5xl" aria-label="Introduction">
    <Hero />
</section>

<!-- Current Status -->
<section 
    class="section md:max-w-5xl h-fit md:mt-12"
    aria-labelledby="now-heading"
>
    <h2 id="now-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">Now</h2>
    <p class="text-sm">
        <span>Working at a mental health care facility. Doing </span>
        <A classes="text-sm anchor" href="https://doi.org/10.17605/OSF.IO/CR5F8">research</A> on ambulatory assessment in PTSD. Coding <A href="https://outline-labs.web.app/" classes="anchor text-sm">Outline Labs</A>. Relocating to Utrecht. Recently graduated from Tilburg University in data science. 
    </p>    
</section>

<!-- Two column layout container -->
<div class="section md:max-w-5xl flex flex-col md:grid md:grid-cols-2 md:gap-x-4 h-auto md:mt-12">
    <!-- Reading section -->
    <section 
        class="mt-0 h-fit"
        aria-labelledby="reading-heading"
    >
        <h2 
            id="reading-heading" 
            class="text-sm font-[500] text-muted-foreground/80 mb-2"
			on:mouseenter={() => isHovered = true}
			on:mouseleave={() => isHovered = false}
        >
            <a 
                href="/books" 
                class="inline-flex items-center"
                aria-label="View all books"
            >
                Reading 
                <Link2 
                    class="w-4 h-4 text-muted-foreground/40 dark:text-muted-foreground/70 inline rotate-45 ml-1"
                    aria-hidden="true"
                />
                {#if isHovered}
                    <span
                        class="overflow-hidden whitespace-nowrap text-muted-foreground/50 dark:text-muted-foreground/80 pl-2 text-xs font-normal"
                        transition:fadeSlide={{ axis: "x", duration: 200 }}
                    >
                        visit /books
                    </span>
                {/if}
            </a>
        </h2>
        <div 
            class="flex flex-col gap-y-2"
            role="list"
            aria-label="Currently reading"
        >
            {#each data.current_books as book}
                <div role="listitem">
                    <Book {book} compact/>
                </div>
            {/each}
        </div>
    </section>

    <!-- Projects section -->
    <section 
        class="mt-8 sm:mt-12 md:mt-0 h-fit"
        aria-labelledby="projects-heading"
    >
        <h2 id="projects-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">Projects</h2>
        <div 
            class="flex flex-col leading-tight gap-y-1"
            role="list"
            aria-label="Project list"
        >
            <div role="listitem">
                <A href="https://reasset.koenraijer.com/" classes="anchor text-sm">ReAsset</A>
                <span class="text-muted-foreground text-sm -ml-1">. Rebalance your stocks efficiently.</span>
            </div>
            <div role="listitem">
                <A href="https://outline-labs.web.app/" classes="anchor text-sm">Outline Labs</A>
                <span class="text-muted-foreground text-sm -ml-1">. Faster clinical notetaking.</span>
            </div>
        </div>
    </section>
</div>

<!-- Writing section -->
<section 
    class="section md:max-w-5xl h-fit"
    aria-labelledby="writing-heading"
>
    <h2 id="writing-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">Writing</h2>
    <Posts posts={data.posts}/>
</section>

<!-- Contact section -->
<section 
    class="section md:max-w-5xl h-fit"
    aria-labelledby="connect-heading"
>
    <h2 id="connect-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">Connect</h2>
    <p class="text-sm">
        Reach me at <A href="mailto:hello@koenraijer.com" aria-label="Send email to hello@koenraijer.com">hello@koenraijer.com</A>.
    </p>
</section>