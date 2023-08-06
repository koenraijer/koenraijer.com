<script>
    import { getContext } from 'svelte';
    const close = getContext('close');
    
    function toTop() {
        console.log('to top');
        
        // Scroll the main element with id "page-content" to the top
        const mainElement = document.getElementById('page-header');
        console.log(mainElement)
        if (mainElement) {
            mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
</script>

<button class="button" on:click={() => {
    toTop(); close();
}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M208.49,143.51a12,12,0,0,1-17,17L140,109V224a12,12,0,0,1-24,0V109L64.49,160.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0ZM216,28H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
    To top
</button>
