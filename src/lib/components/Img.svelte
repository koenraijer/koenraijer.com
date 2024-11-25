<script>
    export let src;
    export let alt;
    export let fullbleed;
    let width;
    let isVertical = false;

    // Check if image is vertical on load
    function handleLoad(event) {
        const img = event.target;
        isVertical = img.naturalHeight > img.naturalWidth;
    }

    $: if (alt.includes('|')) {
        const parts = alt.split('|');
        alt = parts[0].trim();
        width = parts[1].trim();
        if (isNaN(width)) {
            console.error('Invalid width value. Width must be a number.');
            width = undefined;
        }
    }
</script>

<svelte:head>
    <link rel="preload" href={src} as="image">
</svelte:head>

<div class="flex items-center justify-center">
    <figure class="mx-auto {isVertical ? 'max-h-[80vh] md:max-w-[400px]' : 'max-w-full'} h-auto">
        <img 
            {src} 
            {alt} 
            title={alt} 
            loading="lazy" 
            on:load={handleLoad}
            class="rounded-lg object-contain {isVertical ? 'h-full w-auto' : 'w-full'}" 
            style={width ? `width: ${width}px; max-width: 100%;` : ''}
            class:fullbleed
        />
        <figcaption class="!text-muted-foreground text-xs text-center mt-2">{alt}</figcaption>
    </figure>        
</div>