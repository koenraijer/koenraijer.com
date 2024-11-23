<script lang="ts">
    import { onMount } from 'svelte';
    import { LocateFixed, FileText, Download } from 'lucide-svelte'
    import * as info from '$lib/js/info.js';
    import { toast } from 'svelte-sonner';
    
    const STORAGE_KEY = 'domain-warning-dismissed';
    
    let locationTooltipVisible = false;
    let avatarTooltipVisible = false;
    let tooltipX = 0;
    let tooltipY = 0;
    
    function handleMouseMove(event: MouseEvent) {
      tooltipX = event.pageX + 10;
      tooltipY = event.pageY + 10;
    }

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

<div class="relative">
  <div class="w-full flex justify-end h-6 absolute -top-7 right-0 sm:right-6">
    <a class="inline-flex items-center gap-x-1 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors" href="/240504_resume.pdf"><Download class="w-3 h-3 inline"/>Download Resume</a>
  </div>
  <h1 class="text-base mb-4 !leading-8">
    <span 
      role="tooltip"
      on:mousemove={handleMouseMove}
      on:mouseenter={() => avatarTooltipVisible = true}
      on:mouseleave={() => avatarTooltipVisible = false}
      class="relative inline-block cursor-cell"
    >
      {info.name}
      {#if avatarTooltipVisible}
        <span 
          class="fixed z-50 rounded-full whitespace-nowrap transition-all duration-75"
          style="left: {tooltipX}px; top: {tooltipY}px"
        >
          <img src="/241122_avatar.png" alt="Avatar" class="w-24 h-24 rounded-full border-muted-foreground/20 border-4" fetchpriority="high"/>
        </span>
      {/if}
    </span>
    ~ 
    mental health tech w/o losing the spark 
    <span class="text-muted-foreground/30">/</span>
    psychiatry resident 
    <span 
      role="tooltip"
      on:mousemove={handleMouseMove}
      on:mouseenter={() => locationTooltipVisible = true}
      on:mouseleave={() => locationTooltipVisible = false}
      class="relative inline-block cursor-help"
    >
      @ Reinier van Arkel
      {#if locationTooltipVisible}
        <span 
          class="fixed z-50 bg-background whitespace-nowrap duration-75 flex flex-col gap-2 text-xs border rounded-full px-2 !py-0 leading-0 !my-0 h-6 text-muted-foreground hover:bg-muted transition-colors"
          style="left: {tooltipX}px; top: {tooltipY}px"
        >
          <span class="text-xs inline-flex items-center gap-x-1"><LocateFixed class="w-4 h-4 inline"/> 's Hertogenbosch <span class="font-mono text-xs">NL</span></span>
        </span>
      {/if}
    </span>
    <span class="text-muted-foreground/30">/</span>
    current obsession: everything free energy
  </h1>
</div>
