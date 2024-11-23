<script lang="js">
	import { formatDate } from '$lib/js/utils.js'
	import Categories from '$lib/components/Categories.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import ToTopButton from '$lib/components/ToTopButton.svelte'
	import ToC from '$lib/components/ToC.svelte'
	import * as info from '$lib/js/info.js'
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	export let data

	const xor = (a, b) => (a || b) && !(a && b);

	// Convert the object to an array of entries [key, value]
	let categoriesArray = Object.entries(data.post.categories).map(([category, details]) => ({
		category,
		...details
	}));

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(data.post.title)}`

	const url = `${info.website}/${data.post.slug}`

	// Popups
	const wordCountPopup = {
		event: 'hover',
		target: 'wordCountPopup',
		placement: 'bottom'
	};
	const updatedPopup = {
		event: 'hover',
		target: 'updatedPopup',
		placement: 'bottom'
	};

	// Scroll to top
	let isScrollingUp = writable(false);
	let lastScrollY = 0;
	let scrollOffset = writable(0);
	function handleScroll() {
		const currentScrollY = window.scrollY;
		scrollOffset.set(currentScrollY);

		if (currentScrollY < lastScrollY && currentScrollY > 750) {
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

<section class="section">
	<!-- Title -->
	<hgroup class="lg:mx-0 w-full !mx-auto">
		<div>
			{#if data.post.title}
				<h2 class="text-2xl my-4">{data.post.title}</h2>
			{/if}
			<p class="mb-8 text-sm font-sans">
				{#if data.post.date}
					{#if data.post.updated}
						<span>{formatDate(data.post.date)}
							({formatDate(data.post.updated)})
						</span> -
					{:else}
						<span>{formatDate(data.post.date)}</span> -
					{/if}
				{/if}
				{#if data.post.readingTime}
					{data.post.wordCount} words
				{/if}
			</p>
		</div>
	</hgroup>

	<!-- Post -->
	<ToC post={data.post}>
	<article>
		<!-- Post content -->
		<div class="break-words prose-p:z-0 !max-w-none prose-inline-code:overflow-x-scroll prose prose-headings:prose-a:no-underline relative prose-blockquote:prose-quoteless prose-code:text-sm prose-code:text-wrap prose-inline-code:text-wrap prose-inline-code:text-sm prose-inline-code:font-mono prose-inline-code:font-normal prose-inline-code:rounded prose-inline-code:before:content-none prose-inline-code:after:content-none prose-inline-code:p-1 prose-ul:mt-0 prose-li:my-0 prose-ul:ml-2 prose-li:ml-2 prose-a:my-0 prose-p:mb-0 prose-ol:mt-0">
			{@html data.post.content}
		</div>
	</article>
	</ToC>
</section>

<!-- Categories -->
<section class="section">
	<h2 class="text-sm font-normal text-muted-foreground/80 mb-2">Filed under</h2>
	<Categories categories={categoriesArray}/>
</section>

<!-- Pagination -->
<section class="section">
	<div class="flex flex-col md:flex-row justify-between gap-4">
	  {#if data.post.previous}
		<a href={data.post.previous.slug} class="text-sm anchor flex items-center gap-1">
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
		  </svg>
		  {data.post.previous.title}
		</a>
	  {:else}
		<span class="text-sm text-muted-foreground/80">No newer posts</span>
	  {/if}
  
	  {#if data.post.next}
		<a href={data.post.next.slug} class="text-sm anchor flex items-center gap-1 md:ml-auto">
		  {data.post.next.title}
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
		  </svg>
		</a>
	  {:else}
		<span class="text-sm text-muted-foreground/80 md:ml-auto">No older posts</span>
	  {/if}
	</div>
</section>