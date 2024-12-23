<script>
    import { onMount } from 'svelte';
    import { draw, fade } from 'svelte/transition';
    
    let visible = false;
    let strokeWidth = 17;
    onMount(() => {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            visible = true;
        }, 10);
    });
    </script>
    
    {#if visible}
    <a href="/" title="Home" aria-label="Go Home" class="!w-fit">
    <svg 
        in:fade={{duration: 450}}
        width="134" 
        height="143" 
        viewBox="0 0 134 143" 
        fill="none" 
        stroke="currentColor"
        stroke-width="inherit"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-foreground h-8 w-8 stroke-1"
    >

        <path 
            in:draw={{duration: 300, delay: 0}}
            d="M63.9655 38.6669C63.8442 -48.2997 27.5 94.5 23 132" 
            stroke-width={strokeWidth}
            stroke-linecap="square"
        />
        <path 
            in:draw={{duration: 300, delay: 100}}
            d="M64 39V132" 
            stroke-width={strokeWidth}
            stroke-linecap="round"
        />
        <path 
            in:draw={{duration: 300, delay: 175}}
            d="M124 10L64 132.229" 
            stroke-width={strokeWidth}
            stroke-linecap="round"
        />
        <path 
            in:draw={{duration: 300, delay: 275}}
            d="M101 60L124 132" 
            stroke-width={strokeWidth}
            stroke-linecap="round"
        />
    </svg>
    </a>
    {/if}