<!-- Categories.svelte -->
<script>
    export let categories
    import Category from './Category.svelte'
</script>

<div class="flex flex-wrap gap-2">
    {#each categories as {category, count, slug}}
        <Category {category} {count} {slug}/>
    {/each}
</div>