<script>
    export let categories
    import Category from './Category.svelte'
</script>

<div >
    {#each categories as {category, count, slug}, i}
        {#if i < categories.length - 1 && i > 0}
            <span class="text-muted-foreground/30">&nbsp;|&nbsp;</span>
        {/if}
        <Category category={category} count={count} slug={slug}/>
    {/each}
</div>
