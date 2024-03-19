<script>
    export let title;
    export let size = "normal"

    let classes = "py-1 px-3 text-base"
    if (size === "small") {
        classes = "py-0.5 px-2 text-sm"
    }
</script>

<div class="{classes} relative transition-colors rounded-full border border-surface-200-700-token text-surface-900-50-token" 
   title={title}>
    {title}
</div>