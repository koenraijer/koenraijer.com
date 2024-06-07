<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';  // Import fade transition
    import Socials from '$lib/components/Socials.svelte';
    import * as info from '$lib/js/info.js';
    let imageLoaded = false;
  
    onMount(() => {
      const img = new Image();
      img.onload = () => {
        imageLoaded = true;
      };
      img.onerror = () => {
        console.error('Error loading image');
      };
      img.src = info.avatar; // set src after attaching event handlers
    });
</script>

<svelte:head>
    <!--Preloading-->
    <link rel="preload" href="/{info.avatar}" as="image">
    <link rel="preload" href="/avatar_pixelbg2.png" as="image">
</svelte:head>

<section class="card-shimmer z-0 grid grid-cols-1 md:grid-cols-5 border-t border-b md:border border-surface-200-700-token shadow-sm overflow-hidden md:rounded-container rounded-none md:gap-4">
    <div class="flex flex-col p-6 md:p-8 md:pr-0 pt-0 overflow-auto col-span-3 row-start-2 md:row-start-1">
        <h2 class="text-2xl font-semibold pb-4">{info.name}</h2>
        <p class="text-base flex-grow">   
            {@html info.bio.html}
        </p>
        <div class="pt-8 text-base">
            <Socials />
        </div>
    </div>
    <div class="relative p-6 lg:p-8 block md:flex-col place-content-start col-span-2"> 
        <div class="relative aspect-square ml-0 mr-auto md:mx-auto h-24 md:h-auto group transition-all shadow-sm shadow-white dark:shadow-black">
            {#if !imageLoaded}
                <div class="placeholder absolute inset-0 animate-pulse rounded-container h-full bg-surface-200/30 dark:bg-surface-700/30"></div>
            {:else}
                <div class="absolute inset-0 rounded-container bg-primary-500 mix-blend-difference group-hover:mix-blend-normal transition-colors" in:fade={{duration: 100}}></div>
                <div class="absolute inset-0 rounded-container mix-blend-difference group-hover:mix-blend-normal " style="background: url('/avatar_pixelbg2.png') no-repeat center / cover;" in:fade={{duration: 100}}></div>
                <div class="absolute inset-0 rounded-container group-hover:mix-blend-normal" style="background: url('{info.avatar}') no-repeat center / cover;" in:fade={{duration: 100}}></div>
            {/if}
        </div>
    </div>
</section>