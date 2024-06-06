<script>
    export let category
    export let count
    export let slug
</script>

<a class="group text-sm py-1 px-3 relative transition-colors hover:bg-surface-200-700-token rounded-full border border-surface-200-700-token text-surface-900-50-token" href={`/category/${slug}`}>{category}
    <span class="relative ml-2 mr-1 before:content-[''] dark:before:group-hover:bg-secondary-700 before:group-hover:bg-secondary-500 before:transition-colors before:top-1/2 before:left-1/2 before:absolute before:h-5 before:w-5 before:bg-secondary-300 dark:before:bg-secondary-700 before:border before:border-secondary-600 before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2">
        <span class="relative text-sm">{count}</span>
    </span>
</a>
