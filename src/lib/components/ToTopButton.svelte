<script>
    import { fade } from 'svelte/transition';
    import { ArrowUp } from 'lucide-svelte' 
    export let absolute = false;
    function toTop() {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<button class="social bg-background !z-40 border {absolute ? "fixed bottom-5 right-5 sm:bottom-8 sm:right-8" : ""}" on:click={() => {
    toTop();
}} transition:fade={{duration: 100}}>
    <ArrowUp  class="w-4 h-4"/>
</button>
