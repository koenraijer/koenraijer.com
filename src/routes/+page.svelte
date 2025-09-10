<script>
	import Hero from '$lib/components/Hero.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Book from '$lib/components/Book.svelte';
	import * as info from '$lib/js/info.js';
	import A from '$lib/components/A.svelte';
    import { FileDown } from 'lucide-svelte';
    import { Download } from 'lucide-svelte';
    
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
    <h2 id="now-heading" class="text-sm font-[500] text-muted-foreground mb-2">Now</h2>
    <p class="text-sm">
        <span>Slowing down, learning, reflecting. Working at a mental health institution. Finishing up on </span>
        <A classes="text-sm anchor" href="https://doi.org/10.17605/OSF.IO/CR5F8">research</A> on ambulatory assessment in PTSD.
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
            class="text-sm font-[500] text-muted-foreground mb-2"
        >
            Reading
        </h2>
        <div 
            class="flex flex-col gap-y-1"
            role="list"
            aria-label="Currently reading"
        >
            {#each data.current_books as book}
                <div role="listitem">
                    <Book {book} compact/>
                </div>
            {/each}
        </div>
        <p class="mt-0">
            <A href="/books" classes="anchor text-xs italic" aria-label="See all books">[See all books]</A>
        </p>
    </section>

    <!-- Projects section -->
    <!-- <section 
        class="mt-8 sm:mt-12 md:mt-0 h-fit"
        aria-labelledby="projects-heading"
    >
        <h2 id="projects-heading" class="text-sm font-[500] text-muted-foreground mb-2">Projects</h2>
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
    </section> -->
</div>

<!-- Writing section -->
<section 
    class="section md:max-w-5xl h-fit"
    aria-labelledby="writing-heading"
>
    <h2 id="writing-heading" class="text-sm font-[500] text-muted-foreground mb-2">Writing</h2>
    <Posts posts={data.posts}/>
</section>

<!-- Contact section -->
<section 
    class="section md:max-w-5xl h-fit"
    aria-labelledby="connect-heading"
>
    <h2 id="connect-heading" class="text-sm font-[500] text-muted-foreground mb-2">Connect</h2>
    <p class="text-sm flex items-center gap-2 flex-wrap">
        <span>Reach me at <A me href={"mailto:" + info.email} aria-label={"Send email to " + info.email}>{info.email}</A></span>
        <span>
            or download 
            <A 
              href="https://koenraijer.com/240504_resume.pdf"
              aria-label="Download resume (PDF)"
              classes="anchor text-sm inline items-baseline"
              rel="noopener noreferrer"
              download
            >
              my resume
            </A>
            .
        </span>
    </p>
</section>
