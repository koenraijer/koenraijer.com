<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { TableOfContents } from 'lucide-svelte';
  import { Button } from '$lib/shadcn/ui/button';
  import { ScrollArea } from '$lib/shadcn/ui/scroll-area';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let allowedHeadings = ['h2', 'h3', 'h4', 'h5', 'h6'];
  
  let isOpen = false;
  let headings = [];
  let activeHeading = null;
  let scrollY;
  const scrollMarginTop = 105;

  // Function to update headings on mount
  function updateHeadings() {
    const nodes = [
      ...document.querySelectorAll(`article :where(${allowedHeadings.join(', ')}):not(#__sections)`)
    ];
    const depths = nodes.map((node) => Number(node.nodeName[1]));
    const minDepth = Math.min(...depths);

    let d0 = 1;
    let d1 = 1;
    let d2 = 1;

    headings = nodes.map((node, i) => {
      let prefix;
      let depth = depths[i] - minDepth;

      if (depth === 0) {
        if (depths[i - 1] !== 0) {
          d1 = 1;
          d2 = 1;
        }
        prefix = d0.toString();
        d0 += 1;
      } else if (depth === 1) {
        prefix = `${d0 - 1}.${d1}`;
        d1 += 1;
      } else if (depth === 2) {
        prefix = `${d0 - 1}.${d1 - 1}.${d2}`;
        d2 += 1;
      }

      return {
        title: node.innerText,
        depth,
        node,
        prefix,
        id: node.id
      };
    });
  }

  // Function to update active heading based on scroll position
  function updateActiveHeading() {
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].node.getBoundingClientRect().top <= scrollMarginTop) {
        activeHeading = headings[i];
      }
    }
  }

  onMount(() => {
    updateHeadings();
    updateActiveHeading();
  });

  // Close ToC when clicking outside
  function handleClickOutside(event) {
    const toc = document.getElementById('toc-sidebar');
    const tocButton = document.getElementById('toc-button');
    if (isOpen && toc && !toc.contains(event.target) && !tocButton.contains(event.target)) {
      isOpen = false;
    }
  }
</script>

<svelte:window 
  on:scroll={updateActiveHeading}
  on:click={handleClickOutside}
  bind:scrollY
/>

<!-- ToC Button -->
<Button
  id="toc-button"
  variant="outline"
  size="icon"
  class="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-background/95 shadow-md hover:shadow-lg transition-all"
  on:click={() => isOpen = !isOpen}
>
  <TableOfContents class="w-5 h-5" />
</Button>

<!-- ToC Sidebar -->
{#if isOpen}
<div
  id="toc-sidebar"
  class="fixed top-0 right-0 w-64 h-full bg-background border-l shadow-lg z-40"
  transition:slide={{ duration: 200, axis: 'x', easing: cubicOut }}
>
  <ScrollArea class="h-full">
    <div class="p-6">
      <h2 class="text-sm font-medium mb-4">Table of Contents</h2>
      <nav class="space-y-1">
        {#each headings as heading}
          <a
            href="#{heading.id}"
            class="block text-sm py-1 hover:text-primary transition-colors"
            style="padding-left: {heading.depth * 0.75}rem"
            class:text-primary={activeHeading === heading}
            on:click={() => isOpen = false}
          >
            <span class="font-medium">{heading.prefix}</span>
            <span class="ml-2">{heading.title}</span>
          </a>
        {/each}
      </nav>
    </div>
  </ScrollArea>
</div>

<!-- Push main content when sidebar is open -->
<div class="transition-all duration-200" style="margin-right: {isOpen ? '16rem' : '0'}">
  <slot />
</div>
{:else}
<slot />
{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>