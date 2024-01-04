<script>
    export let title 
    export let subtitle
</script>

<hgroup class="text-surface-900-50-token flex items-center lg:mx-0 !mx-auto">
    <div>
        <slot></slot>
        {#if title}
            <h1 class="text-3xl font-semibold mb-4">{title}</h1>
        {/if}
        {#if subtitle}
            <p class="mb-8 text-surface-400">{subtitle}</p>
        {/if}
    </div>
</hgroup>