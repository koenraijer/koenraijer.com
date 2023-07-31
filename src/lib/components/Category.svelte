<script>
    export let category
    export let count
    export let slug
</script>

<a class="social" href={`/category/${slug}`}>{category} ({count})</a>
