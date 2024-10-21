<script>
    import { fade } from 'svelte/transition';
    export let absolute = false;
    function toTop() {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<button class="button !z-40 w-fit {absolute ? "fixed bottom-5 right-5 sm:bottom-10 sm:right-10 shadow-sm" : ""}" on:click={() => {
    toTop();
}} transition:fade={{duration: 100}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-5 h-5" viewBox="0 0 256 256"><path d="M208.49,143.51a12,12,0,0,1-17,17L140,109V224a12,12,0,0,1-24,0V109L64.49,160.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0ZM216,28H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
</button>
