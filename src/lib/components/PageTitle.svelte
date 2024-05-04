<script>
    export let title 
    export let subtitle
</script>

<hgroup class="text-surface-900-50-token lg:mx-0 w-full !mx-auto">
    <div>
        <slot></slot>
        {#if title}
		<div class="text-surface-900-50-token font-semibold">
            <h2 class="text-3xl mb-12">{title}</h2>
        </div>
        {/if}
        {#if subtitle}
            <p class="mb-8 text-base text-surface-400">{subtitle}</p>
        {/if}
    </div>
</hgroup>