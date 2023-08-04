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
    <link rel="preload" href="/ducks.webp" as="image">
</svelte:head>

<section class="grid grid-cols-1 md:grid-cols-2 bg-surface-100 dark:bg-surface-800 shadow-sm overflow-hidden">
    <div class="relative p-6 sm:p-8 row-span-2">
        <div class="relative h-full" style="padding-bottom: 66.66%;">
            {#if !imageLoaded}
                <div class="placeholder absolute inset-0 animate-pulse rounded-none h-full bg-surface-50-900-token"></div>
            {:else}
                <!-- Apply fade transition to the image -->
                <div class="absolute inset-0" style="background: url('{info.avatar}') no-repeat center / cover;" in:fade={{duration: 100}}></div>
            {/if}
        </div>
    </div>
    <div class="flex flex-col p-6 sm:p-8 md:pl-0 pt-0 md:pt-8 row-span-2 overflow-auto">
        <p class="text-xl font-normal flex-grow">   
            {@html info.bio}
        </p>
        <div class="pt-8 lg:pt-36">
            <Socials />
        </div>
    </div>
</section>
