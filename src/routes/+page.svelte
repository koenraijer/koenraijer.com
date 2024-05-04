<script>
	import Hero from '$lib/components/Hero.svelte';
	import Categories from '$lib/components/Categories.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Book from '$lib/components/Book.svelte';
	import Fuse from 'fuse.js';
	import * as info from '$lib/js/info.js';
	export let data
	let searchQuery = "";
	let focused = false;

	let searchedPosts = data.posts; // Define searchedPosts

	// Fuse options
	const options = {
		keys: ['title', 'description', 'categories'],
		threshold: 0.4,
		location: 0,
		minMatchCharLength: 1,
		shouldSort: true,
		includeMatches: true,
		findAllMatches: true,
	};

	// Create fuse instance
	let fuse = new Fuse(data.posts, options);
	
	// Apply searchterm
	$: {
		if (searchQuery) {
			let results = fuse.search(searchQuery);
			searchedPosts = results.map(result => result.item);
		} else {
			searchedPosts = data.posts;
		}
	}

	let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
		category,
		count,
		slug
	}));

	data.categories = categoriesArray;

	let limit = Number.POSITIVE_INFINITY

	const loadMore = () => {
		if (limit < searchedPosts.length) {
			limit += 5; // Increase the limit by 5 only if limit is less than the length of the posts
		}
	};

	// SEO
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(info.name)}`

</script>

<!-- SEO -->
<svelte:head>
  <title>{info.name}</title>
  <meta name="description" content={info.bio} />
  <meta name="author" content={info.name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={info.website} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={info.name} />
  <meta property="og:description" content={info.bio} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={info.website} />
  <meta property="twitter:url" content={info.website} />
  <meta name="twitter:title" content={info.name} />
  <meta name="twitter:description" content={info.bio} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<section class="mt-12 max-w mx-auto md:px-8 lg:px-16">
	<Hero />
</section>

<section class="section">
	<div class="flex sm:flex-row items-center mb-4 w-full flex-wrap sm:flex-nowrap">
		<div class="flex items-center w-full sm:flex-grow my-4 sm:my-0 ">
			<h2 id="recent_posts" class="text-2xl font-semibold flex-shrink-0 sm:pr-8 pr-4 -mt-1 rounded-container"><a href="#recent_posts">Recent posts</a></h2>
			<hr class="!border-surface-500-400-token border-2 w-full"/>
		</div>
		<div class="w-full sm:pl-8 basis-full {focused ? "sm:basis-[200%] md:basis-3/5" : "sm:basis-[4.75rem]"} transition-all duration-300 ease-in-out">
			<search class="relative w-full">
				<form>
					<label for="search-input" class="sr-only">Search</label>
					<input 
						id="search-input"
						bind:value={searchQuery} 
						on:focus={() => focused = true} 
						on:blur={() => focused = false}
						type="search" 
						class="peer cursor-pointer relative z-10 h-10 w-full rounded-container border border-surface-900-50-token bg-transparent outline-none transition-width duration-300 focus:bg-surface-900-20-token focus:cursor-text pl-12 sm:pl-0 sm:focus:pl-12 !focus:outline-none !focus:ring-0 focus:shadow-none bg-surface-hover-token" 
					/>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="absolute inset-y-0 my-auto h-6 border-r border-transparent border-surface-900-50 peer-focus pl-2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
				</form>	
			</search>

		</div>
	</div>
	
	<Posts posts={searchedPosts} limit={limit}/>
	{#if limit < searchedPosts.length}
		<div class="w-full flex justify-center mt-8">
			<button class="social" on:click={loadMore}>Load more posts</button>
		</div>
	{/if}
	<!-- Consider using a fixed height and scrollbar like on https://robinrendle.com/ -->
	<!--
	<div class="h-[calc(100vh-8rem)] overflow-y-scroll border">
		<Posts posts={searchedPosts} limit={limit}/>
		{#if limit < searchedPosts.length}
			<div class="w-full flex justify-center mt-8">
				<button class="social" on:click={loadMore}>Load more posts</button>
			</div>
		{/if}
	</div>
	-->
</section>

<section class="section flex flex-col">
	<div class="flex items-center w-full sm:flex-grow my-4 pb-4">
		<h2 class="text-2xl font-semibold flex-shrink-0 sm:pr-8 pr-4 -mt-1 rounded-container">Currently reading</h2>
		<hr class="!border-surface-500-400-token border-2 w-full"/>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
		{#each data.current_books as book}
			<Book book={book} compact/>
		{/each}
	</div>
</section>
<div class="grid md:grid-cols-3 mt-12 max-w mx-auto md:px-16 md:gap-x-8 lg:gap-x-12 relative pb-12">
	<section class="md:col-span-2 px-6 sm:px-8 md:px-0">
		<div class="flex items-center">
			<h2 class="text-2xl font-semibold flex-shrink-0 sm:pr-8 pr-4 transition-width duration-300 -mt-1">Archive</h2>
			<hr class="!border-surface-500-400-token border-2 w-full"/>
		</div>
		<Posts posts={data.posts} compact/>
	</section>
	
	<section class="w-full mt-12 md:mt-4 h-full ">
		<div class="card-shimmer p-8 md:p-6 lg:p-8 bg-surface-100-800-token shadow-sm rounded-none md:rounded-container border-t border-b md:border border-surface-200-700-token self-start sticky top-12">
			<div class="flex items-center pb-4">
				<h2 class="text-2xl font-semibold flex-shrink-0 md:pr-8 pr-4 transition-width duration-300 -mt-1">Categories</h2>
			</div>
			<Categories categories={data.categories}/>
		</div>
	</section>	
</div>

