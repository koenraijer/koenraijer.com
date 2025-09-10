<script lang="ts" context="module">
    // Purpose: to display images using vite image optimisation inside normal html code
    const images = import.meta.glob([
        '../../images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
    ], {
        eager: true,
        query: { enhanced: true }
    });

    const getEnhancedImage = (path: string): { default: string } | undefined => {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return images[`../../images/${cleanPath}`] as { default: string } | undefined;
    };
</script>

<script lang="ts">
    export let src = '';
    export let alt = '';

    $: enhancedSrc = src ? getEnhancedImage(src)?.default : undefined;
    $: useEnhanced = src?.endsWith('.webp') && enhancedSrc?.sources;
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
            <img 
                src={enhancedSrc.img.src}
                {alt}
                title={alt}
                loading="lazy"
                width={enhancedSrc.img.w}
                height={enhancedSrc.img.h}
                class="border border-border rounded-none"
                {...$$restProps}
            />
        </picture>
    {:else}
        <picture>
            <img {src} {alt} title={alt} loading="lazy" class="border border-border rounded-none" {...$$restProps} />
        </picture>
    {/if}
{/if}
