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
	import { Clock, Calendar } from 'lucide-svelte'
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

<section class="section ">
	<!-- Title -->
	<hgroup class="w-full !mx-auto">
		<div>
			{#if data.post.title}
				<h2 class="text-2xl my-4 font-[500]">{data.post.title}</h2>
			{/if}
			<div class="mb-8 text-xs text-muted-foreground md:flex md:flex-row md:items-center break-words">
				{#if data.post.date}
						<Calendar class="h-3 w-3 inline mr-1" />
						<span class="mr-2">{formatDate(data.post.date)}</span>
						{#if data.post.updated}
							<span class="text-muted-foreground/70 mr-2">(updated {formatDate(data.post.updated)})</span>
						{/if}
				{/if}
				{#if data.post.readingTime}
						<Clock class="h-3 w-3 inline mr-1" />
						<span>{data.post.wordCount} words</span>
				{/if}
			</div>
		</div>
	</hgroup>

	<article class="relative">
		<!-- Post content -->
		<div class="prose proseClasses proseCodeClasses">
			{@html data.post.content}
		</div>

		<!-- Post -->
		<ToC post={data.post} />
	</article>
</section>

<!-- Categories -->
<section class="section">
	<div class="flex flex-row h-fit row-nowrap items-center">
		<h2 class="text-xs font-normal text-muted-foreground/80">Filed under:&nbsp;&nbsp;</h2>
		<Categories categories={categoriesArray}/>
	</div>
</section>

<!-- Pagination -->
<section class="section">
	<hr class="mb-4">
	<div class="flex flex-col md:flex-row justify-between gap-y-2">
		<div class="flex flex-col">
			{#if data.post.previous}
				<span class="text-xs font-normal text-muted-foreground/80">Previous</span>
				<a href={data.post.previous.slug} class="text-sm anchor">
				{data.post.previous.title}
				</a>
			{:else}
				<span class="text-xs text-muted-foreground/80">No newer posts</span>
			{/if}
		</div>
		<div class="text-right flex flex-col">
			{#if data.post.next}
				<span class="text-xs font-normal text-muted-foreground/80">Next</span>
				<a href={data.post.next.slug} class="text-sm anchor ml-auto text-right">
					{data.post.next.title}
				</a>
			{:else}
				<span class="text-xs text-muted-foreground/80 md:ml-auto">No older posts</span>
			{/if}
		</div>
	</div>
</section>