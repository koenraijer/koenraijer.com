<script>
    // Intended use: to trigger animations when an element is in view, but the component doesn't seem to work together with mdsvex.
    import { inview } from 'svelte-inview';
    import { onMount } from 'svelte';
  
    export let rootMargin = '-50px';
    export let unobserveOnEnter = true;
    
    let isInView = false;
    let scrollDirection;
    let mounted = false;
    
    const options = {
      root: null,
      rootMargin,
      unobserveOnEnter,
      threshold: 0.1
    };
  
    const handleChange = ({ detail }) => {
      isInView = detail.inView;
      scrollDirection = detail.scrollDirection?.vertical;
    };
  
    onMount(() => {
      mounted = true;
    });
  </script>
  
  {#if mounted}
    <div 
      use:inview={options} 
      on:inview_change={handleChange}
      class="animate-wrapper min-h-[381px]"
    >
      <slot {isInView} {scrollDirection} />
    </div>
  {:else}
    <!-- SSR fallback -->
    <div class="animate-wrapper min-h-[381px]">
      <slot isInView={false} scrollDirection="down" />
    </div>
  {/if}
  
  <style>
    .animate-wrapper {
      width: 100%;
      display: block;
    }
  </style>