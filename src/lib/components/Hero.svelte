<script lang="ts">
    import { onMount } from 'svelte';
    import { LocateFixed, Download } from 'lucide-svelte'
    import * as info from '$lib/js/info.js';
    import { toast } from 'svelte-sonner';
    
    const STORAGE_KEY = 'domain-warning-dismissed';
    
    let locationTooltipVisible = false;
    let avatarTooltipVisible = false;
    let tooltipX = 0;
    let tooltipY = 0;
    let zoomLevel = 0; // Track zoom state: 0 = normal, 1 = bigger, 2 = biggest

    function handleMouseMove(event: MouseEvent) {
      // Don't update position if the mouse is over the image
      if (event.target instanceof HTMLImageElement) return;
      
      tooltipX = event.pageX + 10;
      tooltipY = event.pageY + 10;
    }

    function handleAvatarClick(event: MouseEvent) {
      // Don't increment zoom if clicking the image
      if (event.target instanceof HTMLImageElement) return;
      
      zoomLevel = (zoomLevel + 1) % 3;
    }

    $: avatarSize = zoomLevel === 0 ? 'w-24 h-24' : 
                    zoomLevel === 1 ? 'w-32 h-32' : 
                    'w-40 h-40';

    onMount(() => {
      const isDismissed = localStorage.getItem(STORAGE_KEY);
      if (!isDismissed) {
        toast(
          'The `.io` domain will no longer be available per January 22nd 2025. Please visit koenraijer.com instead.', 
          {
            duration: 10000,
            action: {
              label: "Don't show again",
              onClick: () => localStorage.setItem(STORAGE_KEY, 'true')
            }
          }
        );
      }
    });
</script>

<!-- Preload image-->
<svelte:head>
  <link rel="preload" as="image" href="/241122_avatar.png" type="image/png" />
</svelte:head>

<div class="relative flex flex-row gap-x-2">
  <div class="w-full flex justify-end h-6 absolute -top-8 right-0 sm:right-6">
    <a class="inline-flex items-center gap-x-1 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors" href="https://koenraijer.com/240504_resume.pdf" data-sveltekit-preload-data="off"><Download class="w-3 h-3 inline"/>Download Resume</a>
  </div>
  <h1 class="text-base md:text-xl mb-4 !leading-10">
    <button 
      on:click={handleAvatarClick}
      on:mousemove={handleMouseMove}
      on:mouseenter={() => avatarTooltipVisible = true}
      on:mouseleave={() => avatarTooltipVisible = false}
      class="relative inline-block cursor-cell"
    >
      {info.name}
      {#if avatarTooltipVisible}
          <span 
              class="fixed z-50 rounded-full whitespace-nowrap"
              style="left: {tooltipX}px; top: {tooltipY}px"
          >
              <img 
                  src="/241122_avatar.png" 
                  alt="Avatar" 
                  class="{avatarSize} rounded-full border-muted-foreground/20 border-4 transition-all" 
                  fetchpriority="high"
              />
          </span>
      {/if}
    </button>
    ~ 
    psychiatry resident 
    <button 
      on:mousemove={handleMouseMove}
      on:mouseenter={() => locationTooltipVisible = true}
      on:mouseleave={() => locationTooltipVisible = false}
      class="relative inline-block cursor-help"
    >
      @ Reinier van Arkel
      {#if locationTooltipVisible}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span 
          role="button"
          tabindex={0}
          on:click|stopPropagation
          class="fixed z-50 bg-background whitespace-nowrap duration-75 flex flex-col gap-2 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors"
          style="left: {tooltipX}px; top: {tooltipY}px"
        >
          <span class="text-xs inline-flex items-center gap-x-1"><LocateFixed class="w-4 h-4 inline"/> 's Hertogenbosch <span class="font-mono text-xs">NL</span></span>
        </span>
      {/if}
    </button>
    <span class="text-muted-foreground/30">/</span>
    current obsession: everything free energy
  </h1>
</div>
