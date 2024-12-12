<script>
    // Intende use: showing a progress bar on top of the page when a user scrolls down. May be reintroduced at some point.
    import {active_heading, active_tracker} from '$lib/js/stores'
	import {fly} from 'svelte/transition'
    import {browser} from '$app/environment'
    let y;
    let progressBar;

    const setProgressBar = () => {
        if(browser) {
          let scrollDist = document.documentElement.scrollTop || document.body.scrollTop;
          let progressWidth = (scrollDist / (document.body.scrollHeight - document.documentElement.clientHeight)) * 100;
          if (progressBar) {
            progressBar.style.width = progressWidth + "%";
            }
        }
      }
      
</script>

<svelte:window on:load={setProgressBar} on:scroll={setProgressBar} bind:scrollY={y} />

{#if $active_tracker} 
    <nav in:fly|global={{ duration: 150 }} out:fly|global={{ duration: 150 }} class="fixed top-0 z-10 w-full bg-surface-100-800-token border-surface-200-700-token border-b">
        <div class="text-sm p-4 mx-auto w-fit"> {$active_heading.title} </div>
        <div id="progressBar" class="absolute top-full h-0.5 bg-secondary-500" bind:this={progressBar}></div>
    </nav>
{/if}