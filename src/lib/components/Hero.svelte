<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';  // Import fade transition
    import Socials from '$lib/components/Socials.svelte';
    let imageLoaded = false;
  
    onMount(() => {
      const img = new Image();
      img.onload = () => {
        imageLoaded = true;
      };
      img.onerror = () => {
        console.error('Error loading image');
      };
      img.src = '/ducks.webp'; // set src after attaching event handlers
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
                <div class="absolute inset-0" style="background: url('/ducks.webp') no-repeat center / cover;" in:fade={{duration: 100}}></div>
            {/if}
        </div>
    </div>
    <div class="flex flex-col p-6 sm:p-8 md:pl-0 pt-0 md:pt-8 row-span-2 overflow-auto">
        <p class="text-xl font-normal flex-grow">
            I'm <b>Koen</b>, a soon to be graduated medical doctor and data scientist based in Maastricht, The Netherlands. While COVID forced me to stay at home, I started to learn how to code. This ultimately led to me studying Data Science & Society at Tilburg University. Medically speaking, I am fully comitted to the field of psychiatry, and am doing research on the crossroads of psychiatry and data science.
        </p>
        <div class="pt-8 lg:pt-36">
            <Socials />
        </div>
    </div>
</section>
