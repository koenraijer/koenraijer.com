<script lang="ts" context="module">
    // PURPOSE: This component is an mdsvex custom element that replaced the <img> element, enabling svelte enhanced image support in mdsvex.
    // Import all images at build time from the static directory
    const images = import.meta.glob([
        '../../../images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
    ], {
        eager: true,
        query: { enhanced: true }
    });

    // Helper function to get the enhanced image
    const getEnhancedImage = (path: string): { default: string } | undefined => {
        const fullPath = `../../../images/${path}`;
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

    // Parse width from alt text if provided - improved parsing
    $: if (alt?.includes('|')) {
        const parts = alt.split('|');
        alt = parts[0].trim();
        // Extract only the number from the width part
        const widthValue = parts[1].trim().replace(/[^0-9]/g, '');
        width = !isNaN(Number(widthValue)) ? Number(widthValue) : undefined;
    }

    // Check if image is vertical on load - with proper typing
    function handleLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        isVertical = img.naturalHeight > img.naturalWidth;
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
    <div class="flex items-center justify-center w-full">
        <figure class="mx-auto w-full {isVertical ? 'max-h-[80vh]' : ''} {width ? '' : 'max-w-full'}">
            {#if useEnhanced && enhancedSrc}
                <picture class="block w-full">
                    <!-- Sources remain the same -->
                    <img 
                        src={enhancedSrc.img.src}
                        {alt}
                        title={alt}
                        loading="lazy"
                        on:load={handleLoad}
                        class="rounded-lg mx-auto {isVertical ? 'h-auto w-auto max-h-[80vh]' : 'w-full'} object-contain"
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
                    class="rounded-lg mx-auto {isVertical ? 'h-auto w-auto max-h-[80vh]' : 'w-full'} object-contain"
                    style={width ? `width: ${width}px; max-width: 100%;` : ''}
                    class:fullbleed
                    {...$$restProps}
                />
            {/if}
            {#if alt}
                <figcaption class="figcaption pb-4 md:mb-12">{alt}</figcaption>
            {/if}
        </figure>        
    </div>
{/if}