<script>
    export let categories
    import Category from './Category.svelte'
</script>

<div class="flex flex-row flex-wrap gap-2">
    {#each categories as {category, count, slug}}
        <Category category={category} count={count} slug={slug}/>
    {/each}
</div>
