<script>
	import Hero from '../lib/components/Hero.svelte';
	import Categories from '../lib/components/Categories.svelte';
	import Posts from '../lib/components/Posts.svelte';
	export let data
    let searchQuery = '';

	$: searchedPosts = data.posts.filter((post) => {
		let titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
		let descriptionMatch = post.description 
			? post.description.toLowerCase().includes(searchQuery.toLowerCase()) 
			: false;

		return titleMatch || descriptionMatch;
	});

	let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
		category,
		count,
		slug
	}));

	data.categories = categoriesArray;

	let limit = 4;

	const loadMore = () => {
		if (limit < searchedPosts.length) {
			limit += 5; // Increase the limit by 5 only if limit is less than the length of the posts
		}
	};
</script>

<section class="mt-12 max-w-5xl mx-auto">
	<Hero />
</section>

<section class="section">
	<div class="flex items-center mb-4">
		<div class="mx-auto max-w-md pr-4 md:pr-8">
			<form action="" class="relative mx-auto w-max">
				<input 
				bind:value={searchQuery} 
				type="search" 
				class="peer cursor-pointer relative z-10 h-10 w-10 rounded-none border border-surface-900-50-token bg-transparent pl-0 outline-none transition-width duration-300 focus:w-full focus:bg-surface-900-20-token focus:cursor-text focus:pl-16 focus:pr-4 !focus:outline-none !focus:ring-0 focus:shadow-none bg-surface-hover-token" 
				/>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="absolute inset-y-0 my-auto h-6 border-r border-transparent border-surface-900-50 px-3 peer-focus transform -translate-x-1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			</form>
		</div>
		<hr class="!border-surface-900-50-token border-2 flex-grow "/>
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
