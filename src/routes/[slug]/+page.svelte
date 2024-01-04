<script lang="js">
	import { formatDate } from '$lib/js/utils'
	import Categories from '$lib/components/Categories.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import ActiveTracker from '$lib/components/ActiveTracker.svelte'
	import ToC from '$lib/components/ToC.svelte'
	import * as info from '$lib/js/info.js'
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

	const subtitle = `${formatDate(data.post.date)} - ${data.post.readingTime}`
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


<div class="grid grid-cols-5 mx-auto relative mt-12 max-w">
	<article class="w-full lg:col-span-3 lg:col-start-2 col-span-full px-6 sm:px-8 mx-auto">
		<!-- Title -->
		<PageTitle title={data.post.title} {subtitle} />
		
		{#if data.post.ToC}
			<aside class="w-fit mb-8" aria-label="Table of Contents">
					<ToC post={data.post} />
			</aside>
		{/if}
		<!-- Post content -->
		<div class="text-surface-900-50-token prose prose-headings:prose-a:no-underline relative leading-loose prose-code:text-surface-900-50-token prose-blockquote:text-surface-900-50-token prose-blockquote:prose-quoteless prose-inline-code:text-base prose-inline-code:font-mono prose-inline-code:font-normal prose-inline-code:bg-surface-100-800-token prose-inline-code:rounded prose-inline-code:before:content-none prose-inline-code:after:content-none prose-inline-code:p-1 prose-code:dark:text-[0.9rem]">
			{@html data.post.content}
		</div>
	</article>

</div>

<!-- Categories -->
<div class="w-full bg-surface-100-800-token border-t border-b border-surface-200-700-token rounded-none mt-12">
	<div class="w-full mx-auto relative max-w px-6 sm:px-8 md:px-16">
		<div class="text-surface-900-50-token flex gap-x-2 place-items-center my-6 mx-auto w-fit">
			<b>Filed under:</b> 
			<Categories categories={categoriesArray}/>
		</div>
	</div>
</div>

<!-- Pagination -->
<div class="w-screen mx-auto relative max-w">
	<div class="w-full px-6 sm:px-8 md:px-16 mx-auto">
		<div class="grid {xor(!data.post.previous, !data.post.next) ? 'grid-rows-1' : 'grid-rows-2'} md:grid-rows-1 grid-cols-2 py-6 justify-between">
			{#if data.post.previous}
			<a class="row-start-1 col-span-full md:col-span-1 group flex flex-wrap flex-col p-4 pl-0" href={data.post.previous.slug}>
				<div class="inline-flex align-top">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
					</svg>
					<h4 class="font-semibold text-lg group-hover:underline">&nbsp;Newer post</h4>
				</div>
				<p class="text-xl">{data.post.previous.title}</p>
			</a>
			{:else}
			<span class="row-start-1 col-span-full md:col-span-1 group flex flex-wrap flex-col p-4 pl-0 italic">
				No post more recent than this one!
			</span>
			{/if}
			<!-- Add vertical divider-->
			<div class="col-span-full md:col-span-1 md:col-start-2 row-start-1 md:row-start-1 md:row-end-2 border-l-2 border-surface-200-700-token md:block hidden"></div>
			{#if data.post.next}
			<a class="md:row-start-1 col-span-full md:col-start-2 {data.post.previous ? "row-start-2" : ""} group flex flex-wrap flex-col p-4 pr-0 items-end" href={data.post.next.slug}>
				<div class="inline-flex align-top">
					<p class="font-semibold text-lg group-hover:underline">Older post&nbsp;</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
					</svg>
				</div>
					<p class="text-right text-xl">{data.post.next.title}</p>
			</a>
			{:else}
				<span class="md:row-start-1 col-span-full md:col-start-2 {data.post.previous ? "row-start-2" : ""} group flex flex-wrap flex-col p-4 pr-0 items-end italic">
					No post older than this one!
				</span>
			{/if}

		</div>
	</div>
</div>

<!--
	< Previously for pagination >
	<div class="grid grid-cols-5 w-screen mx-auto relative max-w">
		<div class="w-full lg:col-span-3 lg:col-start-2 col-span-full max-w-[75ch] px-6 sm:px-8 mx-auto">

	< Previously for categories >
	<div class="w-full bg-surface-100-800-token border-t border-b border-surface-200-700-token rounded-none mt-12">
		<div class="grid grid-cols-5 mx-auto relative max-w">
-->