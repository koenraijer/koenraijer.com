<script>
    export let src;
    export let alt;
    export let fullbleed;
    let width;
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
    <!--Preloading-->
    <link rel="preload" href={src} as="image">
</svelte:head>

<figure>
    <img {src} {alt} title={alt} loading="lazy" class="rounded-container mx-auto max-h-[80vh] h-auto" style={width ? `width: ${width}px; max-width: 100%;` : ''} class:fullbleed/>
    <figcaption class="text-base text-surface-500 mt-1 text-center">{alt}</figcaption>
</figure>    
