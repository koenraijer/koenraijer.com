<script>
    export let data;
    import Posts from '$lib/components/Posts.svelte';
    import Categories from '$lib/components/Categories.svelte';

    let categoriesArray = Object.entries(data.categories).map(([category, {count, slug}]) => ({
        category,
        count,
        slug
    }));

    data.categories = categoriesArray;
</script>

<article class="section" aria-labelledby="category-title">
    <!-- Title -->
    <header>
        <h1 id="category-title" class="text-2xl my-4 font-[500]">Category <span class="text-muted-foreground/30" aria-hidden="true">/</span> {data.category}</h1>
    </header>    
</article>

<section class="section" aria-labelledby="posts-heading">
    <h2 id="posts-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">From the {data.category} Category</h2>
    <Posts posts={data.categoryPosts} />
</section>

<!-- Categories -->
<nav class="section" aria-labelledby="categories-heading">
    <h2 id="categories-heading" class="text-sm font-[500] text-muted-foreground/80 mb-2">Browse by Topic</h2>
    <Categories categories={data.categories} />
</nav>