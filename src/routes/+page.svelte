<script>
	import Hero from '$lib/components/Hero.svelte';
	import Categories from '$lib/components/Categories.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Book from '$lib/components/Book.svelte';
	import * as info from '$lib/js/info.js';
	export let data

	let searchedPosts = data.posts; // Define searchedPosts

	let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
		category,
		count,
		slug
	}));

	data.categories = categoriesArray;

	let limit = 5 // Number.POSITIVE_INFINITY

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(info.name)}`

</script>

<!-- SEO -->
<svelte:head>
  <title>{info.name}</title>
  <meta name="description" content={info.bio.text} />
  <meta name="author" content={info.name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={info.website} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={info.name} />
  <meta property="og:description" content={info.bio.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={info.website} />
  <meta property="twitter:url" content={info.website} />
  <meta name="twitter:title" content={info.name} />
  <meta name="twitter:description" content={info.bio.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<section class="mt-8 sm:mt-12 max-w mx-auto md:px-8 lg:px-16">
	<Hero />
</section>

<section class="section">
	<h2 id="recent_posts" class="text-base font-medium text-muted-foreground"><a href="#recent_posts">Writing</a></h2>
	<Posts posts={searchedPosts}/>
</section>

<section class="section flex flex-col">
	<div class="flex items-center w-full sm:flex-grow my-4 pb-4">
		<h2 id="currently_reading" class="text-xl font-medium flex-shrink-0 sm:pr-8 pr-4 -mt-1 rounded-container"><a href="#recent_posts">Currently reading</a></h2>
		<hr class="!border-dotted !border-t-2 w-full !bg-transparent !border-surface-400"/>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-3 w-fit gap-6 relative place-content-start">
		{#each data.current_books as book}
			<Book book={book} compact/>
		{/each}
	</div>
	<a href="/books" class="button text-sm w-fit mx-auto mt-8">View all books
	</a>
</section>
<div class="grid md:grid-cols-3 mt-12 max-w mx-auto md:px-16 md:gap-x-8 lg:gap-x-12 relative pb-12">
	<section class="md:col-span-2 px-6 sm:px-8 md:px-0">
		<div class="flex items-center">
			<h2 id="archive" class="text-xl font-medium flex-shrink-0 sm:pr-8 pr-4 transition-width duration-300 -mt-1"><a href="#archive">Archive</a></h2>
			<hr class="!border-dotted !border-t-2 w-full !bg-transparent !border-surface-400"/>
		</div>
		<Posts posts={data.posts} />
	</section>
	
	<section class="w-full mt-12 md:mt-4 h-full ">
		<div class="card-shimmer p-8 md:p-6 lg:p-8 bg-surface-100-800-token shadow-sm rounded-none md:rounded-container border-t border-b md:border border-surface-200-700-token self-start sticky top-12">
			<div class="flex items-center pb-4">
				<h2 class="text-lg font-semibold flex-shrink-0 md:pr-8 pr-4 transition-width duration-300 -mt-1">Categories</h2>
			</div>
			<Categories categories={data.categories}/>
		</div>
	</section>	
</div>

