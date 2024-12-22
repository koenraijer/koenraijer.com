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

    let rabbitholes = info.rabbitholes

    // Get last three items, most recent first
    $: visibleHoles = rabbitholes
      .slice(-3)
      .reverse();
</script>

<!-- Preload image-->
<svelte:head>
  <link rel="preload" as="image" href="/241122_avatar.webp" type="image/webp" />
</svelte:head>

<div class="relative flex flex-row gap-x-2">
  <!-- Resume Download -->
  <div class="w-full flex justify-end h-6 absolute -top-8 right-0 sm:right-6">
      <a 
          class="sm:inline-flex hidden items-center gap-x-1 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors" 
          href="https://koenraijer.com/240504_resume.pdf"
          aria-label="Download resume (PDF)"
          download
      >
          <Download class="w-3 h-3 inline" aria-hidden="true"/>
          Download Resume
      </a>
  </div>

  <h1 class="text-base md:text-xl mb-4 md:!leading-10">
      <!-- Name with Avatar -->
      <button 
          on:click={handleAvatarClick}
          on:mousemove={handleMouseMove}
          on:mouseenter={() => avatarTooltipVisible = true}
          on:mouseleave={() => avatarTooltipVisible = false}
          class="relative inline-block cursor-cell"
          aria-label="Click to cycle through avatar sizes"
          aria-expanded={avatarTooltipVisible}
      >
          {info.name}
          {#if avatarTooltipVisible}
              <span 
                  class="fixed z-50 rounded-full whitespace-nowrap"
                  style="left: {tooltipX}px; top: {tooltipY}px"
                  role="img"
                  aria-label="Profile picture of {info.name}"
              >
                  <img 
                      src="/241122_avatar.webp" 
                      alt="Profile picture of {info.name}"
                      class="{avatarSize} rounded-full border-muted-foreground/20 border-4 transition-all" 
                      fetchpriority="high"
                      loading="eager"
                      aria-hidden="true"
                  />
              </span>
          {/if}
      </button>

      ~
      psychiatry resident 

      <!-- Location Info -->
      <button 
          on:mousemove={handleMouseMove}
          on:mouseenter={() => locationTooltipVisible = true}
          on:mouseleave={() => locationTooltipVisible = false}
          class="relative inline-block cursor-help"
          aria-label="Location information"
          aria-expanded={locationTooltipVisible}
      >
          @ Reinier van Arkel
          {#if locationTooltipVisible}
              <span 
                  role="tooltip"
                  class="fixed z-50 bg-background whitespace-nowrap duration-75 flex flex-col gap-2 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-7 text-muted-foreground hover:bg-muted transition-colors"
                  style="left: {tooltipX}px; top: {tooltipY}px"
              >
                  <span class="text-xs inline-flex items-center gap-x-1">
                      <LocateFixed class="w-4 h-4 inline" aria-hidden="true"/> 
                      's Hertogenbosch <span class="font-mono text-xs">NL</span>
                  </span>
              </span>
          {/if}
      </button>

      <span class="text-muted-foreground/30" aria-hidden="true">/</span>

      <!-- Rabbit Holes Section -->
      <span id="rabbithole-label">latest rabbit hole:</span>
      <div 
          class="relative inline group w-fit h-full"
          role="list"
          aria-labelledby="rabbithole-label"
      >
          {#each visibleHoles as hole, i}
              {#if i === 0}
                  <span 
                      class="cursor-s-resize"
                      role="listitem"
                      aria-label="Current rabbit hole"
                  >
                      {hole}
                  </span>
              {:else}
                  <div 
                      class="absolute top-0 left-0 pointer-events-none w-full h-full"
                      role="listitem"
                      aria-label="Previous rabbit hole {i}"
                  >
                      <div 
                          class="absolute left-0 transition-all opacity-0 translate-y-0 scale-98
                              group-hover:delay-[0ms] group-hover:duration-300
                              duration-300 w-full text-sm md:text-base"
                          class:group-hover:opacity-[0.4]={i === 1}
                          class:group-hover:opacity-[0.2]={i === 2}
                          class:group-hover:delay-75={i === 2}
                          class:delay-150={i === 1}
                          class:delay-0={i === 2}
                          style:top={`${i * 1.4}rem`}
                      >
                          <div
                              class:pl-1.5={i === 1}
                              class:pl-3={i === 2}
                              class:-mt-1={i === 2}
                          >
                              <span class="whitespace-nowrap">
                                  {hole}
                              </span>
                          </div>
                      </div>
                  </div>
              {/if}
          {/each}
      </div>
  </h1>
</div>