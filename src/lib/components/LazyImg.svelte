<script >
    import lazyLoad from "$lib/js/lazy_load_modifier";
    export let src;
    export let classes = "";
    export let alt = "";
    export let style = "";
    export let styleTag = "";
    $: load = false;

    function blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    async function loadImage() {
        const response = await fetch(src);
        const blob = await response.blob();
        return await blobToBase64(blob);
    }
</script >

<div use:lazyLoad on:isVisible={() => (load = true)}>
    {#if load}
        {#await loadImage()}
            <div class="placeholder w-full h-full animate-pulse rounded-container bg-surface-200-700-token"></div>
        {:then data}
            <figure>
                <img src={data} {alt} title={alt} loading="lazy" class={classes} {style} style:--tag={styleTag}/>
            </figure>    
        {/await}
    {/if}
</div>

<!-- src: https://alex-schnabl.medium.com/lazy-loading-images-and-components-in-svelte-and-sveltekit-using-typescript-6a8443bb9479 -->

<style>
    img {
        view-transition-name: var(--tag);
    }
</style>