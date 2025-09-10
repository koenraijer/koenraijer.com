<!-- Category.svelte -->
<script>
    import A from '$lib/components/A.svelte'
    export let category
    export let count
    export let slug
</script>

<A 
    href={"/category/" + slug}
    classes="anchor no-underline inline text-sm"
    noUnderline={true}
>
    <span class="underline decoration-dotted underline-offset-2 decoration-muted-foreground/30 hover:decoration-muted-foreground transition-colors">{category}</span>
    <span class="ml-1 text-muted-foreground no-underline">({count})</span>
</A>
