<script lang="js">
	import { formatDate, formatRelativeTime } from '$lib/js/utils.js'
	import Category from '$lib/components/Category.svelte'
	import ToTopButton from '$lib/components/ToTopButton.svelte'
	import ToC from '$lib/components/ToC.svelte'
    import A from '$lib/components/A.svelte'
	import * as info from '$lib/js/info.js'
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	export let data
	import { Calendar, BookText, History } from 'lucide-svelte'

	// Convert the object to an array of entries [key, value]
	let categoriesArray = Object.entries(data.post.categories).map(([category, details]) => ({
		category,
		...details
	}));

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(data.post.title)}&description=${encodeURIComponent(data.post.description)}&slug=${encodeURIComponent(data.post.slug)}`
	const url = `${info.website}/${data.post.slug}`

    const githubEditLink = `https://github.com/koenraijer/koenraijer.com/edit/main/src/posts/${data.post.slug}.md`

	// Scroll to top
	let isScrollingUp = writable(false);
	let lastScrollY = 0;
	let scrollOffset = writable(0);

	function handleScroll() {
		const currentScrollY = window.scrollY;
		scrollOffset.set(currentScrollY);
		
		const distanceFromBottom = document.documentElement.scrollHeight - (window.innerHeight + currentScrollY);
		
		if (currentScrollY < lastScrollY && distanceFromBottom >= 200) {
			isScrollingUp.set(true);
		} else {
			isScrollingUp.set(false);
		}
		lastScrollY = currentScrollY;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

</script>

<!-- SEO -->
<svelte:head>
  <title>{data.post.title} - {info.name}</title>
  <meta name="description" content={data.post.preview.text} />
  <meta name="author" content={info.name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.preview.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={info.website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.preview.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

{#if $isScrollingUp}
	<ToTopButton absolute />
{/if}

<article class="section h-entry">
    <!-- Header section -->
    <header class="w-full !mx-auto">
        {#if data.post.title}
            <h1 class="text-2xl my-4 font-[500] p-name">{data.post.title}</h1>
        {/if}

        <!-- h-entry stuff-->
        <a class="p-author h-card hidden" rel="author" href={info.website}>{info.name}</a>
        <p class="p-summary hidden">{data.post.description}</p>
        <a class="u-url hidden" href={info.website + "/" + data.post.slug}>{info.website + "/" + data.post.slug}</a>

        <div class="mb-8 text-xs text-muted-foreground md:inline-flex md:items-center break-words">
            {#if data.post.date}
                <span class="inline mr-2">
                    <Calendar class="h-3 w-3 mr-1 inline-flex flex-nowrap" aria-hidden="true" />
                    <time class="dt-published" datetime={data.post.date}>{formatDate(data.post.date)}</time>
                </span>
                {#if data.post.updated}
                    <span class="text-muted-foreground/70 mr-2 inline flex-nowrap">
                        <History class="h-3.5 w-3.5 inline" aria-hidden="true"/>
                        <time datetime={data.post.updated}>{formatRelativeTime(data.post.updated)}</time>
                    </span>
                {/if}
            {/if}
            {#if data.post.readingTime}
                <span class="inline">
                    <BookText class="h-3 w-3 mr-1 inline" aria-hidden="true" />
                    <span aria-label="Article length">{data.post.wordCount} words</span>
                </span>
            {/if}
        </div>
    </header>

    <!-- Post content -->
    <section class="relative">
        <div class="e-content prose proseClasses proseCodeClasses first-letter:text-[3.75rem] first-letter:font-[500] first-letter:float-left first-letter:!leading-[0.96] first-letter:tracking-[10px]">
            <svelte:component this={data.post.content} />
        </div>

        {#if data.post.ToC}
            <ToC post={data.post} />
        {/if}
    </section>
</article>

<!-- Categories -->
<section class="section flex justify-between" aria-label="Post categories">
    <div class="flex flex-wrap gap-2 items-center">
        <h2 class="text-xs font-normal text-muted-foreground/80">Filed under:</h2>
        {#each categoriesArray as {category, count, slug}}
            <Category {category} {count} {slug}/>
        {/each}
    </div>

    <A href={githubEditLink} classes="anchor !text-xs">Edit</A>
 </section>

<!-- Navigation -->
<nav class="section" aria-label="Post navigation">
    <hr class="mb-4">
    <div class="flex flex-col md:flex-row justify-between gap-y-2">
        <div class="flex flex-col">
            {#if data.post.previous}
                <span class="text-xs font-normal text-muted-foreground/80" id="prev-label">Previous</span>
                <a 
                    href={data.post.previous.slug} 
                    class="text-sm anchor"
                    aria-labelledby="prev-label"
                    rel="prev"
                >
                    {data.post.previous.title}
                </a>
            {:else}
                <span class="text-xs text-muted-foreground/80" aria-label="No newer posts available">No newer posts</span>
            {/if}
        </div>
        <div class="text-right flex flex-col">
            {#if data.post.next}
                <span class="text-xs font-normal text-muted-foreground/80" id="next-label">Next</span>
                <a 
                    href={data.post.next.slug} 
                    class="text-sm anchor ml-auto text-right"
                    aria-labelledby="next-label"
                    rel="next"
                >
                    {data.post.next.title}
                </a>
            {:else}
                <span class="text-xs text-muted-foreground/80 md:ml-auto" aria-label="No older posts available">No older posts</span>
            {/if}
        </div>
    </div>
</nav>

<section class="section" aria-label="Comments">
    <script src="https://giscus.app/client.js"
            data-repo="koenraijer/koenraijer.com"
            data-repo-id="R_kgDOJ_LamA"
            data-category="Announcements"
            data-category-id="DIC_kwDOJ_LamM4Clf9g"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="preferred_color_scheme"
            data-lang="en"
            data-loading="lazy"
            crossorigin="anonymous"
            async>
    </script>
</section>
