<script lang="ts">
    import { onMount } from 'svelte';
    import { LocateFixed } from 'lucide-svelte'
    import * as info from '$lib/js/info.js';
    import { toast } from 'svelte-sonner';
    import { clickOutside } from '$lib/actions/clickOutside';
    
    const STORAGE_KEY = 'domain-warning-dismissed';
    
    let showLocation = false;
    let showAvatar = false;
    let zoomLevel = 0; // Track zoom state: 0 = small, 1 = medium

    let avatarButtonEl: HTMLButtonElement;
    let locationButtonEl: HTMLButtonElement;

    // No hover-out closing; only outside click or explicit toggle

    function handleAvatarClick() {
      if (!showAvatar) {
        showAvatar = true;
        zoomLevel = 0;
        return;
      }
      // Two sizes; third click closes
      if (zoomLevel === 0) {
        zoomLevel = 1;
      } else {
        showAvatar = false;
        zoomLevel = 0;
      }
    }

    // Preserve aspect ratio: control width only; two sizes
    $: avatarSize = zoomLevel === 0 ? 'w-24' : 'w-32';

    let rabbitholes = info.rabbitholes

    // Get last three items, most recent first
    $: visibleHoles = rabbitholes
      .slice(-3)
      .reverse();
</script>

<!-- Preload image-->
<svelte:head>
  <link rel="preload" as="image" href={info.avatar} type="image/webp" />
  <link rel="prefetch" href={info.avatar} />
</svelte:head>

<div class="relative flex flex-row gap-x-2">
  <h1 class="text-base md:text-xl mb-4 md:!leading-10">
      <!-- Name with Avatar -->
      <span
        class="relative inline-block"
        use:clickOutside={{ exclude: [avatarButtonEl], enabled: showAvatar }}
        on:outclick={() => { showAvatar = false; zoomLevel = 0; }}
      >
        <button
          bind:this={avatarButtonEl}
          on:click={handleAvatarClick}
          class="underline decoration-dotted underline-offset-2 cursor-pointer"
          aria-label="Show portrait; click to cycle size"
          aria-expanded={showAvatar}
        >
          {info.name}
        </button>
        {#if showAvatar}
          <span
            class="absolute left-0 top-full mt-1 z-20 bg-popover text-popover-foreground border border-foreground/50 rounded-sm p-1 w-max"
            role="img"
            aria-label="Profile picture of {info.name}"
          >
            <span class="absolute left-3 -top-1.5">
              <span class="block w-0 h-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-foreground/50"></span>
              <span class="absolute left-0 top-[2px] block w-0 h-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-popover"></span>
            </span>
            <img
              src={info.avatar}
              alt="Profile picture of {info.name}"
              class="{avatarSize} max-w-none h-auto border-muted-foreground/20 border transition-all"
              fetchpriority="high"
              loading="eager"
              decoding="sync"
              aria-hidden="true"
            />
          </span>
        {/if}
      </span>

      ~
      psychiatry resident 

      <!-- Location Info -->
      <span
        class="relative inline-block"
        use:clickOutside={{ enabled: showLocation }}
        on:outclick={() => (showLocation = false)}
      >
        <button
          bind:this={locationButtonEl}
          on:click={() => (showLocation = !showLocation)}
          class="cursor-pointer"
          aria-label="Location information"
          aria-expanded={showLocation}
        >
          @ <span class="relative inline-block underline decoration-dotted underline-offset-2">Reinier van Arkel
            {#if showLocation}
              <span
                role="tooltip"
                class="absolute left-0 top-full mt-1 z-20 bg-popover text-popover-foreground whitespace-nowrap text-xs border border-foreground/50 rounded-sm px-2 py-1"
              >
                <span class="absolute left-3 -top-1.5">
                  <span class="block w-0 h-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-foreground/50"></span>
                  <span class="absolute left-0 top-[2px] block w-0 h-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-popover"></span>
                </span>
                <span class="inline-flex items-center gap-x-1">
                  {'\'s-Hertogenbosch'} <span class="text-xs">NL</span>
                </span>
              </span>
            {/if}
          </span>
        </button>
      </span>

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
