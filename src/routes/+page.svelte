<script>
	import Hero from '../lib/components/Hero.svelte';
	import { formatDate } from '$lib/utils'
	export let data
    let searchQuery = '';
	
	// Apply searchterm
		// Apply searchterm
		$: searchedPosts = data.posts.filter((post) => {
		let titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
		let descriptionMatch = post.description 
			? post.description.toLowerCase().includes(searchQuery.toLowerCase()) 
			: false;

		return titleMatch || descriptionMatch;
	});


</script>

<div class="mt-6 max-w-5xl mx-auto">
	<Hero />
</div>

<section class="mt-8 max-w-5xl mx-auto px-6 sm:px-8 screen-5xl:px-0">
	<ul class="">
		<div class="flex items-center mb-4">
			<div class="mx-auto max-w-md pr-4 md:pr-8">
				<form action="" class="relative mx-auto w-max">
					<input 
					bind:value={searchQuery} 
					type="search" 
					class="peer cursor-pointer relative z-10 h-10 w-10 rounded-none border border-surface-900-50-token bg-transparent pl-0 outline-none transition-width duration-300 focus:w-full focus:bg-surface-900-20-token focus:cursor-text focus:pl-16 focus:pr-4 !focus:outline-none !focus:ring-0 focus:shadow-none bg-surface-hover-token" 
					/>
					
				<!-- Search icon SVG -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="absolute inset-y-0 my-auto h-6 border-r border-transparent border-surface-900-50 px-3 peer-focus transform -translate-x-1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
				</form>
			</div>
			
			<hr class="!border-surface-900-50-token border-2 flex-grow "/>
			<h2 class="text-lg font-semibold flex-shrink-0 md:pl-8 pl-4 transition-width duration-300">Recent posts</h2>
		</div>
		
		{#each searchedPosts as post}
			<a class="group" href={post.slug}>
				<li class="grid grid-cols-4 py-4 pb-6">
					<p class="date col-start-1 col-end-2 text-surface-400 uppercase">{formatDate(post.date)} — {post.readingTime}</p>
					<div class="col-start-2 col-end-5">
						<span class="text-lg font-semibold group-hover:underline">{post.title}</span>
						<p class="description pt-[0.37rem] text-surface-700-200-token">{post.description}</p>
					</div>
				</li>

				<hr class="!border-surface-200"/>
			</a>
		{/each}
	</ul>
</section>

