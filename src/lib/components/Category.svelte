<script>
    export let category
    export let count
    export let slug
</script>

<a class="text-xs transition-colors hover:underline text-muted-foreground" href={`/category/${slug}`}>{category}
        ({count})
</a>
