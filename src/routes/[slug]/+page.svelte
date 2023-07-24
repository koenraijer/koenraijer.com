<script lang="js">
	import { formatDate } from '$lib/utils'

	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="w-full">
  <!-- Title -->
	<hgroup class="text-surface-900-50-token max-w-[65ch] mx-auto mt-12">
		<h1 class="text-3xl font-semibold mb-4">{data.meta.title}</h1>
		<p class="uppercase mb-8 text-surface-400">{formatDate(data.meta.date)} - 0 MIN READ</p>
	</hgroup>

  <!-- Post -->
	<div class="text-surface-900-50-token mx-auto overflow-x-scroll prose">
		<svelte:component this={data.content} />

		<hr class="!border-surface-900-50-token border-2 flex-grow "/>

	</div>

	<!-- Tags -->
	<div class="text-surface-900-50-token max-w-[65ch] mx-auto mb-4 ">
		{#if data.meta.categories.length > 1}
			<span class="mr-2">Categories: </span>
		{:else }
			<span class="mr-2">Category: </span>
		{/if}
		{#each data.meta.categories as category}
			<button class="surface-4 btn border rounded-none dark:text-surface-100 text-surface-900 mr-2 bg-surface-hover-token">{category}</button>
		{/each}
	</div>
	
  <!-- Pagination -->
	<div class="flex py-6 justify-between max-w-5xl mx-auto">
		<div class="inline-flex">
			{#if data.previous}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
				<a class="anchor pl-2" href={data.previous.slug}>{data.previous.title}</a>
			{/if}
		</div>
		<div class="inline-flex">
			{#if data.next}
				<a class="anchor pr-2" href={data.next.slug}>{data.next.title}</a>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
			{/if}
		</div>
	</div>
</article>