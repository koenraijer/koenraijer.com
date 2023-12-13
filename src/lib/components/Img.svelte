<script>
    export let src;
    export let alt;
    export let fullbleed;
</script>

<svelte:head>
    <!--Preloading-->
    <link rel="preload" href={src} as="image">
</svelte:head>

<figure>
    <img {src} {alt} title={alt} loading="lazy" class="rounded-container mx-auto max-h-[80vh]" class:fullbleed/>
    <figcaption class="text-base text-surface-500 mt-1 text-center">{alt}</figcaption>
</figure>    
