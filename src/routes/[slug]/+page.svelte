<script lang="js">
	import { formatDate } from '$lib/utils'
	import HomeButton from '$lib/components/HomeButton.svelte'
	import Categories from '$lib/components/Categories.svelte'
	import ToC from '$lib/components/ToC.svelte'
	export let data

	const xor = (a, b) => (a || b) && !(a && b);

	// Convert the object to an array of entries [key, value]
	let categoriesArray = Object.entries(data.post.categories).map(([category, details]) => ({
		category,
		...details
	}));
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.post.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
</svelte:head>

<div class="grid grid-cols-6 mx-auto max-w-[75ch] h-full relative px-6">
	<article class="w-full lg:col-span-5 col-span-full">
		<!-- Title -->
		<hgroup class="text-surface-900-50-token mx-auto mt-12 flex items-center">
			<div>
				<div class="relative inline-flex gap-x-4">
					<div class="screen-5xl:absolute screen-5xl:left-0 screen-5xl:top-0 transform screen-5xl:-translate-x-[137.5%]">
						<HomeButton />
					</div>
					<h1 class="text-3xl font-semibold mb-4">{data.post.title}</h1>
				</div>
				<p class="uppercase mb-8 text-surface-400">{formatDate(data.post.date)} - {data.post.readingTime}</p>
			</div>
		</hgroup>

		<!-- Post content -->
		<div class="text-surface-900-50-token mx-auto overflow-x-scroll prose prose-headings:prose-a:no-underline relative leading-loose">
			{@html data.post.content}
			
			<hr class="!border-surface-900-50-token border-2 flex-grow mb-4"/>
		</div>

		<!-- Categories -->
		<div class="text-surface-900-50-token max-w-[65ch] mx-auto mb-4">
			<Categories categories={categoriesArray}/>
		</div>
	  
	</article>

	<!-- Table of contents -->
	<div class="h-full col-span-1 pt-12">
		<aside class="sticky hidden w-[15.25rem] ml-4 xl:block top-8 col-span-1" aria-label="Table of Contents">
			<ToC title={data.post.title} allowedHeadings={['h2', 'h3', 'h4']} />
		</aside>
	</div>

	<!-- Pagination -->
	<div class="grid {xor(!data.post.previous, !data.post.next) ? 'grid-rows-1' : 'grid-rows-2'} md:grid-rows-1 grid-cols-2 py-6 justify-between w-full col-span-full">
		{#if data.post.previous}
		<a class="row-start-1 justify-self-start col-span-full md:col-start-1 group flex flex-wrap flex-col p-4" href={data.post.previous.slug}>
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
		<a class="md:row-start-1 col-span-full lg:transform lg:translate-x-24 md:col-start-2 {data.post.previous ? "row-start-2" : ""} justify-self-end group flex flex-wrap flex-col p-4" href={data.post.next.slug}>
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
