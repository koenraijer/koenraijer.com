<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { TableOfContents } from 'lucide-svelte';
  import { Button } from '$lib/shadcn/ui/button';
  import FadedScrollArea from '$lib/components/FadedScrollArea.svelte';
  import * as Drawer from "$lib/shadcn/ui/drawer";
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  
  export let post; // Add this to accept the post prop
  
  function fadeSlide(node, options) {
    const slideTrans = slide(node, options);
    return {
      duration: options?.duration || 200,
      css: (t) => `
        ${slideTrans ? slideTrans.css(t, options) : ''}
        opacity: ${t};
      `
    };
  }
  
  let allowedHeadings = ['h2', 'h3', 'h4', 'h5'];
  let isDrawerOpen = false;
  let headings = [];
  let activeHeading = null;
  let scrollY;
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
  
  function handleHeadingClick() {
    isDrawerOpen = false;
  }
  
  // Media query states
  let isMobile = false;
  let isTablet = false;
  
  function updateMediaQueries() {
    if (!browser) return;
    
    const width = window.innerWidth;
    isMobile = width < 768; // sm and below
    isTablet = width >= 768 && width < 1280; // md and lg
  }

  $: if (browser) {
    updateMediaQueries();
  }

  let isLoaded = false;
  onMount(() => {
    // Wait for next tick to ensure page transition is complete
    setTimeout(() => {
      isLoaded = true;
      updateMediaQueries();
      updateHeadings();
      updateActiveHeading();
      window.addEventListener('resize', updateMediaQueries);
    }, 750);
    
    return () => {
      window.removeEventListener('resize', updateMediaQueries);
    };
  });
</script>

<svelte:window 
  on:scroll={updateActiveHeading}
  bind:scrollY
/>

<div class="relative">
  <!-- Main content -->
  <slot />

  {#key isLoaded}
    <!-- Desktop ToC (lg and up) -->
    {#if !isMobile && !isTablet && headings.length > 0}
      <div
        id="desktop-toc"
        class="fixed left-28 top-60 text-xs w-48 hidden xl:block"
        transition:fadeSlide={{ duration: 400 }}
      >
        <FadedScrollArea class="h-[calc(100vh-15rem-8rem)] py-4">
          <nav>
            {#each headings as heading}
              <a
                href="#{heading.id}"
                class="block !text-xxs text-muted-foreground/80 hover:text-foreground transition-colors"
                style="padding-left: {heading.depth * 0.75}rem"
                class:text-foreground={activeHeading === heading}
              >
                {heading.title}
              </a>
            {/each}
          </nav>
        </FadedScrollArea>
      </div>
    {/if}

    <!-- Tablet ToC Button (md only) -->
    {#if isTablet && headings.length > 0}
      <div class="fixed top-20 right-10 z-50 md:block xl:hidden">
        <Button
          variant="outline"
          size="icon"
          class="rounded-full w-10 h-10 bg-background/95 shadow-md hover:shadow-lg transition-all"
          on:click={() => isDrawerOpen = true}
        >
          <TableOfContents class="w-5 h-5" />
        </Button>
      </div>

      <Drawer.Root direction="left" bind:open={isDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Table of Contents</Drawer.Title>
          </Drawer.Header>
          <ScrollArea class="h-[calc(100vh-8rem)] px-4">
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
    {/if}

    <!-- Mobile ToC Button (sm and below) -->
    {#if isMobile && headings.length > 0}
      <div class="fixed top-20 right-10 z-50">
        <Button
          variant="outline"
          size="icon"
          class="rounded-full w-10 h-10 bg-background/95 shadow-md hover:shadow-lg transition-all"
          on:click={() => isDrawerOpen = true}
        >
          <TableOfContents class="w-5 h-5" />
        </Button>
      </div>

      <Drawer.Root bind:open={isDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Table of Contents</Drawer.Title>
          </Drawer.Header>
          <ScrollArea class="h-[50vh] px-4">
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
    {/if}
  {/key}
</div>