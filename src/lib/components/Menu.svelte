<script>
    import { clickOutside } from '$lib/js/click_outside.js';
    import { setContext } from 'svelte';
    let isOpen = false;
    let hoverTimeout; // variable to store the timeout

    function handleClickOutside() {
        isOpen = false;
    }

    function close() {
        isOpen = false;
    }

    function handleMouseEnter() {
        // Set a timeout to open the menu after 200ms
        hoverTimeout = setTimeout(() => {
            isOpen = true;
        }, 200);
    }

    function handleMouseLeave() {
        // Clear the timeout if the cursor leaves the button before 200ms
        clearTimeout(hoverTimeout);
    }

    setContext('close', close);
</script>

<div class="fixed sm:relative z-50" use:clickOutside on:outclick={handleClickOutside}>
    <button
        class="transition-colors decoration-none flex justify-center items-center hover:bg-surface-50-900-token p-2 cursor-pointer duration-[200ms] border border-surface-300-600-token hover:border-surface-900-50-token rounded-container bg-surface-100-800-token"
        on:click|stopPropagation={() => isOpen = !isOpen}
        on:mouseenter={handleMouseEnter} 
        on:mouseleave={handleMouseLeave}
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
    </button>

        <div
            class="absolute top-full {isOpen ? "visible" : "invisible"} right-0 mt-4 w-fit h-fit transition-colors decoration-none flex flex-col justify-stretch p-2 duration-[200ms] border border-surface-300-600-token rounded-container bg-surface-100-800-token gap-y-2"
        >
            <slot></slot>
        </div>
    </div>
  
    