<script>
    export let data;
    import Posts from '$lib/components/Posts.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
    import Categories from '$lib/components/Categories.svelte';

    let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
		category,
		count,
		slug
	}));

	data.categories = categoriesArray;
</script>

<div class="section">
    <PageTitle title={"Category: " + data.category}></PageTitle>
    <Posts posts={data.categoryPosts} />
</div>

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