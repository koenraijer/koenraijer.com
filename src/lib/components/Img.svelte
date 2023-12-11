<script>
    export let src;
    export let alt;
</script>

<svelte:head>
    <!--Preloading-->
    <link rel="preload" href={src} as="image">
</svelte:head>

<figure>
    <img {src} {alt} title={alt} loading="lazy" class="rounded-container"/>
    <figcaption class="text-base text-surface-400 mt-1 text-center">{alt}</figcaption>
</figure>    
