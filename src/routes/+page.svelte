<script>
	import Hero from '../lib/components/Hero.svelte';
	import Categories from '../lib/components/Categories.svelte';
	import Posts from '../lib/components/Posts.svelte';
	import Fuse from 'fuse.js';
	import * as info from '$lib/js/info.js';
	export let data
    let searchQuery = "";
	let focused = false;
	let hrWidth = "full"; // default value
	let inputWidth = "2.5rem"; // default width

	$: {
	if (focused) {
		hrWidth = "25%";
		inputWidth = "15rem"; // 3 times wider when input is focused
	} else {
		hrWidth = "100%";
		inputWidth = "2.5rem"; // default width
	}
	}

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

	let limit = 5;

	const loadMore = () => {
		if (limit < searchedPosts.length) {
			limit += 5; // Increase the limit by 5 only if limit is less than the length of the posts
		}
	};

	// SEO
	const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    	info.name
  	)}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fwww.koenraijer.io%2Ffavicon%2Ffavicon.svg`
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

<section class="mt-12 max-w mx-auto">
	<Hero />
</section>

<section class="section">
	<div class="flex items-center mb-4">
		<div class="mx-auto max-w-md pr-4 md:pr-8">
			<form action="" class="relative mx-auto w-max">
				<label for="search-input" class="sr-only">Search</label>
				<input 
					id="search-input"
					bind:value={searchQuery} 
					on:focus={() => focused = true} 
					on:blur={() => focused = false}
					style="width: {inputWidth};"
					type="search" 
					class="peer cursor-pointer relative z-10 h-10 w-10 rounded-none border border-surface-900-50-token bg-transparent pl-0 outline-none transition-width duration-300 focus:bg-surface-900-20-token focus:cursor-text focus:pl-16 focus:pr-4 !focus:outline-none !focus:ring-0 focus:shadow-none bg-surface-hover-token" 
				/>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="absolute inset-y-0 my-auto h-6 border-r border-transparent border-surface-900-50 px-3 peer-focus transform -translate-x-1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			</form>			
		</div>
		<hr style="width: {hrWidth};" class="!border-surface-900-50-token border-2 flex-grow transition-width duration-300"/>
		<h2 class="text-lg font-semibold flex-shrink-0 md:pl-8 pl-4 transition-width duration-300 -mt-1">Recent posts</h2>
	</div>
	<Posts posts={searchedPosts} limit={limit}/>
	{#if limit < searchedPosts.length}
		<div class="w-full flex justify-center mt-8">
			<button class="social" on:click={loadMore}>Load more posts</button>
		</div>
	{/if}
</section>

<section class="section">
	<div class="flex items-center">
		<h2 class="text-lg font-semibold flex-shrink-0 md:pr-8 pr-4 transition-width duration-300 -mt-1">Categories</h2>
		<hr class="!border-surface-900-50-token border-2 flex-grow "/>
	</div>
	<div class="py-4"></div>
	<Categories categories={data.categories}/>
</section>

<section class="section">
	<div class="flex items-center">
		<hr class="!border-surface-900-50-token border-2 flex-grow "/>
		<h2 class="text-lg font-semibold flex-shrink-0 md:pl-8 pl-4 transition-width duration-300 -mt-1">Archive</h2>
	</div>
	<div class="py-4"></div>
	<Posts posts={data.posts} compact/>
</section>


