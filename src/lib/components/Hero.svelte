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

<section class="grid grid-cols-1 lg:grid-cols-2 bg-surface-100-800-token border-t border-b md:border border-surface-200-700-token shadow-sm overflow-hidden md:rounded-container rounded-none">
    <div class="relative p-6 sm:p-8 row-span-2">
        <div class="relative aspect-square" style="padding-bottom: 33.33%;">
            {#if !imageLoaded}
                <div class="placeholder absolute inset-0 animate-pulse rounded-container h-full bg-surface-50-900-token"></div>
            {:else}
                <!-- Apply fade transition to the image -->
                <div class="absolute inset-0 rounded-container" style="background: url('{info.avatar}') no-repeat center / cover;" in:fade={{duration: 100}}></div>
            {/if}
        </div>
    </div>
    <div class="flex flex-col p-6 md:p-8 md:pt-0 lg:pl-0 pt-0 lg:pt-8 row-span-2 overflow-auto">
        <p class="text-lg font-normal flex-grow">   
            {@html info.bio.html}
        </p>
        <div class="pt-8">
            <Socials />
        </div>
    </div>
</section>
