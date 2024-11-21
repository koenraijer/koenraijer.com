<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';  // Import fade transition
    import Socials from '$lib/components/Socials.svelte';
    import * as info from '$lib/js/info.js';
    let imageLoaded = false;
        
    const STORAGE_KEY = 'domain-warning-dismissed';
    let isVisible = true;
    
    function handleDismiss() {
        isVisible = false;
        localStorage.setItem(STORAGE_KEY, 'true');
    }

    onMount(() => {
        // Check localStorage on component mount
        const isDismissed = localStorage.getItem(STORAGE_KEY);
        if (isDismissed) {
            isVisible = false;
        }
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

<div class="relative w-full bg-orange-100 border border-orange-200 rounded my-4" class:hidden={!isVisible}>
    <div class="max-w-screen-xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between gap-x-4">
            <p class="text-orange-800 text-sm">
                <a href="https://thenewstack.io/what-is-the-future-of-the-io-domain/" class="underline hover:text-orange-900">Recent news</a> suggests there is a high likelihood the .io domain will cease to exist. That's why I've changed this website's domain name to <a href="https://koenraijer.com" class="underline hover:text-orange-900">koenraijer.com</a>.
            </p>
            <button
                on:click={handleDismiss}
                class="flex-shrink-0 group"
                aria-label="Dismiss"
            >
                <svg class="h-5 w-5 text-orange-800 hover:text-orange-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    </div>
</div>

<section class="card-shimmer z-0 grid grid-cols-1 md:grid-cols-6 border-t border-b md:border border-surface-200-700-token shadow-sm overflow-hidden md:rounded-container rounded-none md:gap-4">
    <div class="flex flex-col p-6 md:p-8 md:pr-0 pt-0 overflow-auto col-span-4 row-start-2 md:row-start-1">
        <h2 class="text-2xl font-semibold pb-4">{info.name}</h2>
        <p class="text-base flex-grow">   
            {@html info.bio.html}
        </p>
        <div class="pt-4 text-base">
            <Socials />
        </div>
    </div>
    <div class="relative p-6 lg:p-8 block md:flex-col place-content-start col-span-2"> 
        <div class="relative aspect-square ml-0 mr-auto md:mx-auto h-36 md:h-auto group transition-all sm:shadow-sm shadow-white dark:shadow-black">
            {#if !imageLoaded}
                <div class="placeholder absolute inset-0 animate-pulse rounded-full md:rounded-container h-full bg-surface-200/30 dark:bg-surface-700/30"></div>
            {:else}
                <div class="absolute inset-0 rounded-full md:rounded-container bg-[#2989FF] mix-blend-difference group-hover:mix-blend-normal transition-colors" in:fade|global={{duration: 100}}></div>
                <div class="absolute inset-0 rounded-full md:rounded-container mix-blend-difference group-hover:mix-blend-normal" style="background: url('/avatar_pixelbg2.png') no-repeat center / cover;" in:fade|global={{duration: 100}}></div>
                <div class="absolute inset-0 rounded-full md:rounded-container group-hover:mix-blend-normal" style="background: url('{info.avatar}') no-repeat center / cover;" in:fade|global={{duration: 100}}></div>
            {/if}
        </div>
    </div>
</section>