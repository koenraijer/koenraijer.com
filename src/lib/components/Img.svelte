<script lang="ts" context="module">
    // PURPOSE: This component is a wrapper around the <img> element that allows for svelte enhanced image support in mdsvex.
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
    export let fullbleed = false;
    let width: string | number | undefined;
    let isVertical = false;

    // Convert path and get enhanced image if applicable
    $: enhancedSrc = src ? getEnhancedImage(src)?.default : undefined;

    // Check if we have a valid enhanced image
    $: hasEnhancedImage = enhancedSrc && 
        typeof enhancedSrc === 'object' && 
        'sources' in enhancedSrc &&
        'img' in enhancedSrc;

    // Check if image is vertical on load
    function handleLoad(event: { target: HTMLImageElement }) {
        const img = event.target;
        isVertical = img.naturalHeight > img.naturalWidth;
    }

    // Parse width from alt text if provided
    $: if (alt?.includes('|')) {
        const parts = alt.split('|');
        alt = parts[0].trim();
        width = parts[1].trim();
        if (isNaN(Number(width))) {
            console.error('Invalid width value. Width must be a number.');
            width = undefined;
        }
    }

    // Determine if we should use enhanced:img or regular img
    $: useEnhanced = src && !src.endsWith('.gif') && 
        (src.endsWith('.jpg') || 
         src.endsWith('.jpeg') || 
         src.endsWith('.png') || 
         src.endsWith('.webp')) &&
        hasEnhancedImage;
</script>

{#if src}
    <div class="flex items-center justify-center">
        <figure class="mx-auto {isVertical ? 'max-h-[80vh] md:max-w-[400px]' : 'max-w-full'} h-auto">
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
                        on:load={handleLoad}
                        class="rounded-lg object-contain {isVertical ? 'h-full w-auto' : 'w-full'} mx-auto"
                        style={width ? `width: ${width}px; max-width: 100%;` : ''}
                        class:fullbleed
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
                    on:load={handleLoad}
                    class="rounded-lg object-contain {isVertical ? 'h-full w-auto' : 'w-full'} mx-auto"
                    style={width ? `width: ${width}px; max-width: 100%;` : ''}
                    class:fullbleed
                    {...$$restProps}
                />
            {/if}
            {#if alt}
                <figcaption class="!text-muted-foreground text-xs text-center mt-2">{alt}</figcaption>
            {/if}
        </figure>        
    </div>
{/if}
