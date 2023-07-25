<script lang="js">
	import { formatDate } from '$lib/utils'
	import HomeButton from '$lib/components/HomeButton.svelte'
	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.post.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
</svelte:head>

<article class="w-full px-6">
  	<!-- Title -->
	<hgroup class="text-surface-900-50-token max-w-[65ch] mx-auto mt-12 flex items-center">
		<div>
			<div class="relative inline-flex gap-x-4">
				<div class="sm:absolute sm:left-0 sm:top-0 transform sm:-translate-x-[137.5%]">
					<HomeButton />
				</div>
				<h1 class="text-3xl font-semibold mb-4">{data.post.title}</h1>
			</div>
			<p class="uppercase mb-8 text-surface-400">{formatDate(data.post.date)} - {data.post.readingTime}</p>
		</div>
	</hgroup>


	<!-- Post -->
	<div class="text-surface-900-50-token mx-auto overflow-x-scroll prose prose-headings:prose-a:no-underline relative">
		{@html data.post.content}

		<hr class="!border-surface-900-50-token border-2 flex-grow mb-4"/>
	</div>

	<!-- Tags -->
	<div class="text-surface-900-50-token max-w-[65ch] mx-auto mb-4 ">
		{#if data.post.categories.length > 1}
			<span class="mr-2">Categories: </span>
		{:else }
			<span class="mr-2">Category: </span>
		{/if}
		{#each data.post.categories as category}
			<button class="surface-4 btn border rounded-none dark:text-surface-100 text-surface-900 mr-2 bg-surface-hover-token">{category}</button>
		{/each}
	</div>
	
  <!-- Pagination -->
	<div class="flex py-6 justify-between max-w-5xl mx-auto">
		<div class="inline-flex">
			{#if data.post.previous}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
				<a class="anchor pl-2" href={data.post.previous.slug}>{data.post.previous.title}</a>
			{/if}
		</div>
		<div class="inline-flex">
			{#if data.post.next}
				<a class="anchor pr-2" href={data.post.next.slug}>{data.post.next.title}</a>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
			{/if}
		</div>
	</div>
</article>

