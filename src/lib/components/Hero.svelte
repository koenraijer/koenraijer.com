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
</svelte:head>

<section class="card-shimmer z-0 grid grid-cols-1 md:grid-cols-3 bg-surface-100-800-token border-t border-b md:border border-surface-200-700-token shadow-sm overflow-hidden md:rounded-container rounded-none md:gap-4">
    <div class="flex flex-col p-6 md:p-8 md:pr-0 pt-0 overflow-auto col-span-2 row-start-2 md:row-start-1">
        <h2 class="text-2xl font-semibold pb-4">{info.name}</h2>
        <p class="text-base flex-grow">   
            {@html info.bio.html}
        </p>
        <div class="pt-8 text-base">
            <Socials />
        </div>
    </div>
    <div class="relative p-6 lg:p-8 block md:flex-col md:justify-center"> <!-- Added flex utilities here -->
        <div class="relative aspect-square ml-0 mr-auto md:mx-auto h-36 md:h-auto">
            {#if !imageLoaded}
                <div class="placeholder absolute inset-0 animate-pulse rounded-container h-full bg-surface-200/30 dark:bg-surface-700/30"></div>
            {:else}
                <!-- Apply fade transition to the image -->
                <div class="absolute inset-0 rounded-container" style="background: url('{info.avatar}') no-repeat center / cover;" in:fade={{duration: 100}}></div>
            {/if}
        </div>
    </div>
</section>
