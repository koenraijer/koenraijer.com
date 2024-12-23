<!-- Category.svelte -->
<script>
    export let category
    export let count
    export let slug
</script>

<a 
    href={`/category/${slug}`}
    class="pill"
>
    {category}
    <span class="ml-1 text-muted-foreground">({count})</span>
</a>