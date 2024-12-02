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
	<!-- Title -->
	<hgroup class="w-full !mx-auto">
		<div>
			<h2 class="text-2xl my-4 font-[500]">{"Category: " + data.category}</h2>
		</div>
	</hgroup>	
</div>

<div class="section">
	<h2 id="posts" class="text-sm font-normal text-muted-foreground/80 mb-2">Posts</h2>

    <Posts posts={data.categoryPosts} />
</div>
<!-- Categories -->
<div class="section">
	<h2 id="projects" class="text-sm font-normal text-muted-foreground/80 mb-2">All Categories</h2>

	<Categories categories={data.categories} />
</div>