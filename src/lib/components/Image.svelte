<script lang="ts" context="module">
    // Import all images at build time from the static directory
    const images = import.meta.glob([
        '../../../static/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
    ], {
        eager: true,
        query: { enhanced: true }
    });

    // Helper function to get the enhanced image
    const getEnhancedImage = (path: string): { default: string } | undefined => {
        const fullPath = `../../../static/${path}`;
        return images[fullPath] as { default: string } | undefined;
    };
</script>

<script lang="ts">
    export let src = '';
    export let alt = '';

    // Convert path and get enhanced image if applicable
    $: enhancedSrc = src ? getEnhancedImage(src)?.default : undefined;

    // Check if we have a valid enhanced image
    $: hasEnhancedImage = enhancedSrc && 
        typeof enhancedSrc === 'object' && 
        'sources' in enhancedSrc &&
        'img' in enhancedSrc;

    // Determine if we should use enhanced:img or regular img
    $: useEnhanced = src && !src.endsWith('.gif') && 
        (src.endsWith('.jpg') || 
         src.endsWith('.jpeg') || 
         src.endsWith('.png') || 
         src.endsWith('.webp')) &&
        hasEnhancedImage;
</script>

{#if src}
    {#if useEnhanced && enhancedSrc}
        <picture>
            {#if enhancedSrc.sources.avif}
                <source srcset={enhancedSrc.sources.avif} type="image/avif">
            {/if}
            {#if enhancedSrc.sources.webp}
                <source srcset={enhancedSrc.sources.webp} type="image/webp">
            {/if}
            {#if enhancedSrc.sources.jpeg}
                <source srcset={enhancedSrc.sources.jpeg} type="image/jpeg">
            {/if}
            {#if enhancedSrc.sources.png}
                <source srcset={enhancedSrc.sources.png} type="image/png">
            {/if}
            <img 
                src={enhancedSrc.img.src}
                {alt}
                title={alt}
                loading="lazy"
                width={enhancedSrc.img.w}
                height={enhancedSrc.img.h}
                {...$$restProps}
            />
        </picture>
    {:else}
        <img 
            src={src}
            {alt}
            title={alt}
            loading="lazy"
            {...$$restProps}
        />
    {/if}
{/if}