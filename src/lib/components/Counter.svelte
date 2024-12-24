<script>
  import { onMount } from 'svelte';
  let count = 0;
  let mounted = false;
  
  onMount(() => {
      mounted = true;
  });
</script>

{#if mounted}
  <button on:click={() => count += 1}>
      Count is {count}
  </button>
{:else}
  <button>
      Count is 0
  </button>
{/if}