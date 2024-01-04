<script>
    export let title 
    export let subtitle
</script>

<hgroup class="text-surface-900-50-token flex items-center lg:mx-0 !mx-auto">
    <div>
        <slot></slot>
        {#if title}
		<div class="prose-headings:text-surface-900-50-token prose-headings:font-semibold prose">
            <h1 class="mb-4">{title}</h1>
        </div>
        {/if}
        {#if subtitle}
            <p class="mb-8 text-surface-400">{subtitle}</p>
        {/if}
    </div>
</hgroup>