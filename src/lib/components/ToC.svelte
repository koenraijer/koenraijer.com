<script lang="ts">
  import { onMount } from 'svelte';
  import { TableOfContents } from 'lucide-svelte';
  import * as Dialog from "$lib/shadcn/ui/dialog";
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  
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
  
  function handleHeadingClick() {
    isDialogOpen = false;
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
</script>

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
        class="fixed top-0 text-xs w-48 hidden -translate-x-72 translate-y-32"
        class:xl:block={shouldAnimate}
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

      <!-- Tablet ToC Button (md only) -->
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
            <nav class="h-full w-full flex flex-col justify-between mx-auto my-auto sm:mx-0 sm:my-0">
              {#each headings as heading}
                <a
                  href="#{heading.id}"
                  class="block text-xs py-1 anchor transition-colors"
                  style="padding-left: {heading.depth * 0.75}rem"
                  class:text-foreground={activeHeading === heading}
                  on:click={handleHeadingClick}
                >
                  {heading.title}
                </a>
              {/each}
            </nav>
          </Dialog.Content>
        </Dialog.Root>
      {/if}
  
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