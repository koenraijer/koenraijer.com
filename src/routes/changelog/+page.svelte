<script>
    import changelog from './CHANGELOG.md'
	import HomeButton from '$lib/components/HomeButton.svelte'
</script>

<!-- SEO -->
<svelte:head>
	<title>Changelog</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Changelog"/>
</svelte:head>

<div class="grid grid-cols-5 mx-auto section h-full relative px-6">
	<article class="w-full lg:col-span-3 lg:col-start-2 col-span-full">
		<!-- Title -->
		<hgroup class="text-surface-900-50-token mx-auto mt-12 flex items-center">
			<div>
				<div class="relative inline-flex gap-x-4">
					<div class="screen-5xl:absolute screen-5xl:left-0 screen-5xl:top-0 transform screen-5xl:-translate-x-[137.5%]">
						<HomeButton />
					</div>
					<h1 class="text-3xl font-semibold mb-4">Changelog</h1>
				</div>
			</div>
		</hgroup>

		<!-- Post content -->
		<div class="text-surface-900-50-token overflow-x-scroll prose prose-headings:prose-a:no-underline relative leading-loose prose-code:text-surface-900-50-token lg:mx-0 mx-auto">
			<svelte:component this={changelog} />

			<hr class="!border-surface-900-50-token border-2 flex-grow mb-4 mt-12"/>
		</div>
	  
	</article>
</div>
