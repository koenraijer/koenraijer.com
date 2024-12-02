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

<article class="w-full section">
    <!-- Title -->
    <hgroup class="w-full">
        <h2 class="text-2xl my-4 font-[500]">Changelog</h2>
    </hgroup>

    <!-- Post content -->
    <div class="prose proseClasses proseCodeClasses mt-8 sm:mt-12">
        <svelte:component this={changelog} />
    </div>
</article>
