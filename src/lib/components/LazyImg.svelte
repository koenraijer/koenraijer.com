<script lang="ts" context="module">
    // PURPOSE: lazy loading images for books page. Does the same thing as Image.svelte but with lazy loading.
    // Import all images at build time
    const images = import.meta.glob([
        '/src/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
    ], {
        eager: true,
        query: { enhanced: true }
    });

    function getImagePath(src: string) {
        // Try different path formats
        const possiblePaths = [
            src,
            `/src${src}`,
            `/src/images${src}`,
            `/src/images/book_covers${src.startsWith('/') ? src : `/${src}`}`
        ];

        for (const path of possiblePaths) {
            if (images[path]) {
                return images[path];
            }
        }
        return undefined;
    }
</script>

<script lang="ts">
    import lazyLoad from "$lib/js/lazy_load_modifier";
    
    export let src: string;
    export let imgClasses = "";
    export let parentClasses = "";
    export let placeholderClasses = "";
    export let alt = "";
    export let style = "";
    export let styleTag = "";
    export let loading: 'lazy' | 'eager' = 'lazy';
    
    // Only use lazy loading modifier if loading is 'lazy'
    $: shouldLazyLoad = loading === 'lazy';

    $: load = false;

    // Get enhanced image data
    $: enhancedImage = getImagePath(src)?.default;
</script>

<div 
    use:lazyLoad={shouldLazyLoad} 
    on:isVisible={() => (load = shouldLazyLoad ? true : (load = true))} 
    class={parentClasses}
>
    <figure class="s-MjpFyM6B2tB_">
        {#if !shouldLazyLoad || load}
            {#if enhancedImage && typeof enhancedImage === 'object' && 'sources' in enhancedImage}
                <picture>
                    {#if enhancedImage.sources.avif}
                        <source srcset={enhancedImage.sources.avif} type="image/avif">
                    {/if}
                    {#if enhancedImage.sources.webp}
                        <source srcset={enhancedImage.sources.webp} type="image/webp">
                    {/if}
                    <img 
                        src={enhancedImage.img.src}
                        {alt}
                        title={alt}
                        loading={loading}
                        class={`${imgClasses} w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 s-MjpFyM6B2tB_`}
                        {style}
                        style:--tag={styleTag}
                        width={enhancedImage.img.w}
                        height={enhancedImage.img.h}
                    />
                </picture>
            {:else}
                <img 
                    {src}
                    {alt}
                    title={alt}
                    loading={loading}
                    class={`${imgClasses} w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 s-MjpFyM6B2tB_`}
                    {style}
                    style:--tag={styleTag}
                />
            {/if}
        {:else}
            <div class={placeholderClasses + " placeholder w-full h-full animate-pulse rounded-container bg-surface-200-700-token"}></div>
        {/if}
    </figure>   
</div>

<style>
    img {
        view-transition-name: var(--tag);
    }
</style>