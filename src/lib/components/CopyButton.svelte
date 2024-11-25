<script>
    import { Copy, Check } from 'lucide-svelte';
    export let content;
    let copied = false;
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(content);
      copied = true;
      setTimeout(() => {
         copied = false;
      }, 1500);
    };
</script>
  
<button 
    on:click={copyToClipboard} 
    class="social"
>
    {#if copied}
        <Check class="w-4 h-4"/>
    {:else}
        <Copy class="w-4 h-4"/>
    {/if}
</button>