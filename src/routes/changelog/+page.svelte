<script>
    import changelog from './CHANGELOG.md'
	import * as info from '$lib/js/info.js'

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(title)}`

	const url = `${info.website}/changelog`

	const title = "Changelog"
	const description = "A reverse chronological list of notable changes to this website, updated automatically whenever a new version is deployed."
</script>	

<!-- SEO -->
<svelte:head>
<title>{title} - {info.name}</title>
<meta name="description" content={description} />
<meta name="author" content={info.name} />

<!-- Facebook Meta Tags -->
<meta property="og:url" content={url} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content={info.website} />
<meta property="twitter:url" content={url} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="grid grid-cols-5 mx-auto section h-full relative px-6">
	<article class="w-full lg:col-span-3 lg:col-start-2 col-span-full">
		<!-- Title -->
		<hgroup class="text-surface-900-50-token mx-auto flex items-center">
			<div>
				<div class="relative inline-flex gap-x-4">
					<h1 class="text-3xl font-semibold mb-4">Changelog</h1>
				</div>
			</div>
		</hgroup>

		<!-- Post content -->
		<div class="text-surface-900-50-token prose prose-headings:prose-a:no-underline relative leading-loose prose-code:text-surface-900-50-token lg:mx-0 mx-auto">
			<svelte:component this={changelog} />
		</div>
	</article>
</div>
