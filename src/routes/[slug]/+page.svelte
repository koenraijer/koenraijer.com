<script lang="js">
	import { formatDate } from '$lib/js/utils'
	import { popup } from '@skeletonlabs/skeleton';
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


<div class="grid grid-cols-5 mx-auto relative mt-12 max-w gap-x-8">
	<div class="w-full {data.post.ToC ? "col-start-1" : "col-start-2"} col-span-full px-6 sm:px-8 mx-auto">
		<!-- Title -->
		<hgroup class="text-surface-900-50-token lg:mx-0 w-full !mx-auto">
			<div>
				{#if data.post.title}
				<div class="text-surface-900-50-token font-semibold">
					<h2 class="text-3xl my-4">{data.post.title}</h2>
				</div>
				{/if}
				<p class="mb-8 text-base text-surface-400 font-sans">
					{#if data.post.date}
						{#if data.post.updated}
							<span use:popup={updatedPopup}>{formatDate(data.post.date)}</span> - 
							<div class="bg-surface-700 dark:bg-surface-700 rounded-container p-2 z-20 text-xs relative"  data-popup="updatedPopup">
								<p class="font-sans text-surface-50 dark:text-surface-200"><span class="font-semibold">Updated:</span> {formatDate(data.post.updated)}</p>
							</div>
						{:else}
							<span>{formatDate(data.post.date)}</span> - 
						{/if}
					{/if}
					{#if data.post.readingTime}
						<span use:popup={wordCountPopup}>{data.post.readingTime}</span>
						<div class="bg-surface-700 dark:bg-surface-700 rounded-container p-2 z-20 text-xs relative"  data-popup="wordCountPopup">
							<p class="font-sans text-surface-50 dark:text-surface-200">{data.post.wordCount} words</p>
						</div>
					{/if}
				</p>
			</div>
		</hgroup>
	</div>
	{#if data.post.ToC}
	<aside class="w-fit h-full lg:w-full font-sans md:pt-2 pt-0 md:mb-4 mb-8 mx-6 sm:mx-8 z-50 lg:col-start-1 lg:col-span-1 lg:block md:hidden col-span-full" aria-label="Table of Contents">
			<ToC post={data.post}/>
	</aside>
	{/if}
	<article class="w-full lg:col-span-3 lg:col-start-2 col-span-full px-6 sm:px-8 mx-auto relative">
		{#if data.post.ToC}
			<aside class="w-fit font-sans md:pt-2 pt-0 md:mb-4 mb-8 mr-8 md:float-left hidden md:block lg:hidden relative z-100" aria-label="Table of Contents">
					<ToC post={data.post}/>
			</aside>
		{/if}
		<!-- Post content -->
		<div class="text-surface-900-50-token break-words prose-p:z-0 !max-w-none md:prose-p:pl-4 dark:prose-p:font-thin dark:prose-li:font-thin font-serif prose-headings:font-sans prose-inline-code:overflow-x-scroll prose prose-headings:prose-a:no-underline relative prose-code:text-surface-900-50-token prose-blockquote:text-surface-900-50-token prose-blockquote:prose-quoteless prose-code:text-sm prose-code:text-wrap prose-inline-code:text-wrap prose-inline-code:text-sm prose-inline-code:font-mono prose-inline-code:font-normal prose-inline-code:bg-surface-100-800-token prose-inline-code:rounded prose-inline-code:before:content-none prose-inline-code:after:content-none prose-inline-code:p-1 prose-code:dark:text-[0.9rem] prose-ul:mt-0 prose-li:my-0 prose-a:my-0 prose-p:mb-0 prose-ol:mt-0">
			{@html data.post.content}
		</div>
	</article>

</div>

<!-- Categories -->
<div class="w-full card-shimmer border-t border-b border-surface-200-700-token rounded-none mt-12">
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
		<div class="grid {xor(!data.post.previous, !data.post.next) ? 'grid-rows-1' : 'grid-rows-2'} md:grid-rows-1 grid-cols-2 py-4 md:py-6 justify-between text-base">
			{#if data.post.previous}
			<a class="row-start-1 col-span-full md:col-span-1 group flex flex-wrap flex-col p-4 pl-0" href={data.post.previous.slug}>
				<div class="inline-flex align-top">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
					</svg>
					<h4 class="font-semibold group-hover:underline font-sans">&nbsp;Newer post</h4>
				</div>
				<p class="">{data.post.previous.title}</p>
			</a>
			{:else}
			<span class="row-start-1 col-span-full md:col-span-1 group flex flex-wrap flex-col p-4 pl-0 italic ">
				No post newer than this!
			</span>
			{/if}
			<!-- Add vertical divider-->
			<div class="col-span-full md:col-span-1 md:col-start-2 row-start-1 md:row-start-1 md:row-end-2 border-l-2 border-surface-200-700-token md:block hidden"></div>
			{#if data.post.next}
			<a class="md:row-start-1 col-span-full md:col-start-2 {data.post.previous ? "row-start-2" : ""} group flex flex-wrap flex-col p-4 pr-0 items-end" href={data.post.next.slug}>
				<div class="inline-flex align-top">
					<p class="font-semibold group-hover:underline font-sans">Older post&nbsp;</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 stroke-2 self-center">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
					</svg>
				</div>
					<p class="text-right">{data.post.next.title}</p>
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