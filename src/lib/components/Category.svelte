<!-- Category.svelte -->
<script>
    export let category
    export let count
    export let slug
</script>

<a 
    href={`/category/${slug}`}
    class="inline-flex items-center text-xs px-2.5 py-0.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
>
    {category}
    <span class="ml-1 text-muted-foreground">({count})</span>
</a>