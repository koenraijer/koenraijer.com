<script>
    import { Copy, Check } from 'lucide-svelte';
    export let content;
    let copied = false;
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(content);
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };
 </script>
 
 <button 
    on:click={copyToClipboard}
    class="social !z-50 bg-background relative"
    aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    title={copied ? "Copied!" : "Copy to clipboard"}
 >
    {#if copied}
        <span role="status" class="sr-only">Copied to clipboard</span>
        <Check class="w-4 h-4" aria-hidden="true"/>
    {:else}
        <Copy class="w-4 h-4" aria-hidden="true"/>
    {/if}
 </button>