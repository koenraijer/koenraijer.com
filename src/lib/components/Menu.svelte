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

    /*
    function handleMouseEnter() {
        // Set a timeout to open the menu after 200ms
        hoverTimeout = setTimeout(() => {
            isOpen = true;
        }, 200);
    }
    */

    function handleMouseLeave() {
        // Clear the timeout if the cursor leaves the button before 200ms
        clearTimeout(hoverTimeout);
    }

    setContext('close', close);
</script>

<div class="relative md:hidden z-50" use:clickOutside on:outclick={handleClickOutside}>
    <button
        class="transition-all decoration-none flex justify-center items-center p-2 cursor-pointer duration-[200ms] border {isOpen ? "border-surface-50-900-token shadow-lg" : "border-surface-200-700-token"} shadow-white dark:shadow-black rounded-container bg-transparent bg-surface-hover-token"
        on:click|stopPropagation={() => isOpen = !isOpen}
        on:mouseleave={handleMouseLeave}
    > <!-- on:mouseenter={handleMouseEnter} -->
        {#if !isOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        {/if}
    </button>

    <div
        class="absolute top-full {isOpen ? 'visible' : 'invisible'} right-0 mt-4 h-fit w-[75vw] sm:w-[50vw] transition-colors decoration-none flex flex-col justify-stretch p-2 duration-[200ms] rounded-container bg-surface-100-800-token gap-y-2 shadow-lg shadow-white dark:shadow-black"
    >
        <slot name="small-screens"/>
    </div>
</div>
<div class="md:flex hidden gap-x-6 place-items-center">
    <slot name="large-screens"/>
</div>

<!-- Overlay -->
{#if isOpen}
    <div
        class="fixed inset-0 bg-white dark:bg-black opacity-75 z-40"
        on:click={handleClickOutside}
    ></div>
{/if}