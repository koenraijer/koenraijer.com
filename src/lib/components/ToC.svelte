<script lang="ts">
  import { onMount } from 'svelte';
  import { TableOfContents } from 'lucide-svelte';
  import * as Dialog from "$lib/shadcn/ui/dialog";
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { afterNavigate, goto } from '$app/navigation';
  
  function fadeSlide(node, options) {
    const slideTrans = slide(node, options);
    return {
      delay: options?.delay || 0,    // Add this line
      duration: options?.duration || 200,
      css: (t) => `
        ${slideTrans ? slideTrans.css(t, options) : ''}
        opacity: ${t};
      `
    };
  }
  
  let allowedHeadings = ['h2', 'h3'];
  let isDialogOpen = false;
  let isMobileDrawerOpen = false;
  let headings = [];
  let activeHeading = null;
  let scrollY;
  let isMounted = false;

  const scrollMarginTop = 105;
  
  function updateHeadings() {
    const nodes = [
      ...document.querySelectorAll(`article :where(${allowedHeadings.join(', ')}):not(#__sections)`)
    ];
    const depths = nodes.map((node) => Number(node.nodeName[1]));
    const minDepth = Math.min(...depths);
  
    headings = nodes.map((node, i) => {
      let depth = depths[i] - minDepth;
      return {
        title: node.innerText,
        depth,
        node,
        id: node.id
      };
    });
  }
  
  function updateActiveHeading() {
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].node.getBoundingClientRect().top <= scrollMarginTop) {
        activeHeading = headings[i];
      }
    }
  }
  
  function handleHeadingClick(id) {
    isDialogOpen = false;
    goto(`#${id}`);
  }
  
  // Media query states
  let isMobile = false;
  let isTablet = false;
  
  function updateMediaQueries() {
    if (!browser) return;
    const width = window.innerWidth;
    isMobile = width < 768;
    isTablet = width >= 768 && width < 1280;
  }

  onMount(() => {
    updateMediaQueries();
    updateHeadings();
    updateActiveHeading();
    window.addEventListener('resize', updateMediaQueries);
    
    // Set timeout
    isMounted = true;
    return () => {
      window.removeEventListener('resize', updateMediaQueries);
    };
  });


  let shouldAnimate = false;

  afterNavigate(() => {
    shouldAnimate = true;
  });

  // Layout tuning (split top/bottom control)
  export let topStartPx = 144;       // initial top offset (~8rem)
  export let topTuckedPx = 48;       // tucked top offset (~3.5rem)
  export let transitionRangePx = 320;// interpolation range for tuck
  export let bottomViewportGapPx = 48; // white margin at bottom of viewport
  export let navBottomGapPx = 4;       // gap between ToC bottom and Post navigation

  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOutQuad(x) { return 1 - (1 - x) * (1 - x); }

  let currentTopPx = topStartPx;
  let maxH = `calc(100vh - ${topStartPx + bottomViewportGapPx}px)`;
  let postNavEl: HTMLElement | null = null;

  $: (function updateTopAndHeight() {
    const tLinear = Math.min(Math.max(scrollY / transitionRangePx, 0), 1);
    const t = easeOutQuad(tLinear);
    currentTopPx = Math.round(lerp(topStartPx, topTuckedPx, t));
    // Compute viewport-constrained max height
    const vhLimit = (typeof window !== 'undefined') ? (window.innerHeight - (currentTopPx + bottomViewportGapPx)) : 0;
    // If post navigation exists and is within viewport, constrain bottom to it
    let navLimit = Infinity;
    if (typeof window !== 'undefined') {
      if (!postNavEl) postNavEl = document.querySelector('nav[aria-label="Post navigation"]');
      const rect = postNavEl?.getBoundingClientRect();
      if (rect) {
        // Distance from top of viewport to bottom of nav, minus current top and an extra gap
        navLimit = rect.bottom - currentTopPx - navBottomGapPx;
      }
    }
    const px = Math.max(0, Math.min(vhLimit, navLimit));
    maxH = px > 0 ? `${Math.round(px)}px` : `calc(100vh - ${currentTopPx + bottomViewportGapPx}px)`;
  })();
</script>

<style>
  /* Smoothly animate tiny changes to top to avoid jaggedness */
  .toc-container { transition: top 100ms ease-out; will-change: top; }
  /* Keep layout stable; hide scrollbars but allow scrolling */
  .toc-scroll { scrollbar-gutter: stable both-edges; }
  .toc-scroll { scrollbar-width: none; }
  .toc-scroll::-webkit-scrollbar { width: 0; height: 0; }
  .toc-scroll::-webkit-scrollbar-track { background: transparent; }
  .toc-scroll::-webkit-scrollbar-thumb { background-color: transparent; }
  @media (prefers-color-scheme: dark) {
    .toc-scroll { scrollbar-width: none; }
    .toc-scroll::-webkit-scrollbar { width: 0; height: 0; }
  }
</style>

<svelte:window 
  on:scroll={updateActiveHeading}
  bind:scrollY
/>

{#if headings.length > 0}
    <!-- Desktop ToC (xl and up) -->
    {#if !isMobile && !isTablet}
      {#key shouldAnimate}
      <div
        in:fadeSlide={{ duration: 400, delay: 500 }}
        class="toc-container fixed text-xs w-48 hidden xl:block -translate-x-72 overflow-y-auto pr-2 overscroll-contain toc-scroll"
        style={`top:${currentTopPx}px; max-height:${maxH}`}
        tabindex="0"
      >
          <nav>
            {#each headings as heading}
              <a
                href="#{heading.id}"
                class="block text-xxs text-muted-foreground/80 hover:text-foreground transition-colors"
                style="padding-left: {heading.depth * 0.5}rem"
                class:text-foreground={activeHeading === heading}
              >
                {heading.title}
              </a>
            {/each}
          </nav>
      </div>
      {/key}
    {/if}

      <!-- Tablet ToC Button (md only)
      {#if isTablet || isMobile}
        <Dialog.Root bind:open={isDialogOpen}>
          <Dialog.Trigger>
            <button
              class="fixed top-5 right-5 sm:top-8 sm:right-8 z-50 social bg-background border"
            >
              <TableOfContents class="w-4 h-4" />
            </button>
          </Dialog.Trigger>
          <Dialog.Content class="sm:!max-w-md">
            <Dialog.Header>
              <Dialog.Title class="text-sm font-normal text-muted-foreground/80 text-left">Table of Contents</Dialog.Title>
            </Dialog.Header>
            <nav class="h-full w-full flex flex-col justify-between mx-auto my-auto sm:mx-0 sm:my-0 text-left">
              {#each headings as heading}
                <button
                  class="block w-fit text-xs py-1 anchor transition-colors text-left"
                  style="padding-left: {heading.depth * 0.75}rem"
                  class:text-foreground={activeHeading === heading}
                  on:click={handleHeadingClick(heading.id)}
                >
                  {heading.title}
              </button>
              {/each}
            </nav>
          </Dialog.Content>
        </Dialog.Root>
      {/if} -->
  
      <!-- Mobile ToC Button (sm and below) -->
      <!-- {#if isMobile}
        <div class="fixed top-5 right-5 sm:top-8 sm:right-8 z-50">
          <button
            class="social bg-background border"
            on:click={() => isMobileDrawerOpen = !isMobileDrawerOpen}
          >
            <TableOfContents class="w-4 h-4" />
          </button>
        </div>
  
        <Drawer.Root bind:open={isMobileDrawerOpen}>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Table of Contents</Drawer.Title>
            </Drawer.Header>
            <ScrollArea class="h-[75vh] px-4">
              <nav class="space-y-1">
                {#each headings as heading}
                  <a
                    href="#{heading.id}"
                    class="block text-sm py-1 text-muted-foreground hover:text-foreground transition-colors"
                    style="padding-left: {heading.depth * 0.75}rem"
                    class:text-foreground={activeHeading === heading}
                    on:click={handleHeadingClick}
                  >
                    {heading.title}
                  </a>
                {/each}
              </nav>
            </ScrollArea>
          </Drawer.Content>
        </Drawer.Root>
      {/if}   -->
{/if}
