<script>
    import { Lightbox } from 'svelte-lightbox';
    export let src;
    export let alt;
</script>

<svelte:head>
    <!--Preloading-->
    <link rel="preload" href={src} as="image">
</svelte:head>

<Lightbox>
    <figure>
        <img {src} {alt} title={alt} loading="lazy"/>
        <figcaption class="text-base text-surface-400-600-token">{alt}</figcaption>
    </figure>    
</Lightbox>
