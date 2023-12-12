<script lang="js">
	import { formatDate } from '$lib/js/utils'
	import Categories from '$lib/components/Categories.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
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

<div class="grid grid-cols-5 mx-auto h-full relative mt-12">
	<article class="w-full lg:col-span-3 lg:col-start-2 col-span-full px-6 sm:px-8 screen-5xl:px-0 max-w">
		<!-- Title -->
		<PageTitle title={data.post.title} {subtitle} />

		<!-- Post content -->
		<div class="text-surface-900-50-token overflow-x-scroll prose prose-headings:prose-a:no-underline relative leading-loose prose-code:text-surface-900-50-token lg:mx-0 mx-auto prose-blockquote:text-surface-900-50-token prose-blockquote:prose-quoteless">
			{@html data.post.content}
		</div>
	</article>

	<!-- Table of contents -->
	<div class="h-full col-span-1 xl:block hidden pr-6 sm:pr-8 max-w">
		<aside class="sticky ml-6 mb-8 top-8" aria-label="Table of Contents">
			{#if !data.post.noToC}
				<ToC title={data.post.title} allowedHeadings={['h2', 'h3', 'h4']} />
			{/if}
		</aside>
	</div>

	<!-- Categories -->
	<div class="grid grid-cols-5 w-screen col-span-full bg-surface-100-800-token border-t border-b border-surface-200-700-token rounded-none">
		<div class="lg:col-span-3 lg:col-start-2 col-span-full text-surface-900-50-token max-w-[65ch] flex gap-x-2 place-items-center my-6 px-6 sm:px-8 screen-5xl:px-0">
			<b>Filed under:</b> 
			<Categories categories={categoriesArray}/>
		</div>
	</div>
	  
	<!-- Pagination -->
	<div class="grid grid-cols-5 w-screen col-span-full mx-auto">
		<div class="grid {xor(!data.post.previous, !data.post.next) ? 'grid-rows-1' : 'grid-rows-2'} md:grid-rows-1 grid-cols-2 py-6 justify-between lg:col-span-3 lg:col-start-2 col-span-full max-w-[65ch] px-6 sm:px-8 screen-5xl:px-0">
			{#if data.post.previous}
			<a class="row-start-1 justify-self-start col-span-full md:col-span-1 group flex flex-wrap flex-col p-4 pl-0" href={data.post.previous.slug}>
				<div class="inline-flex align-top">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
					</svg>
					<p class="font-semibold group-hover:underline">&nbsp;Previous post</p>
				</div>
				<p class="">{data.post.previous.title}</p>
			</a>
			{/if}
		
			{#if data.post.next}
			<a class="md:row-start-1 col-span-full md:col-start-2 {data.post.previous ? "row-start-2" : ""} justify-self-stretch group flex flex-wrap flex-col p-4 pr-0 items-end" href={data.post.next.slug}>
				<div class="inline-flex align-top">
					<p class="font-semibold group-hover:underline">Next post&nbsp;</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
					</svg>
				</div>
				<p class="">{data.post.next.title}</p>
			</a>
			{/if}
		</div>
	</div>
</div>


