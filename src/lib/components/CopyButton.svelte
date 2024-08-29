<script>
    // CopyButton.svelte

    export let content;
    export let style;
  
    let copied = false;
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(content);
      copied = true;
      setTimeout(() => {
         copied = false;
      }, 1500);
    };
  
    let buttonStyle = 'padding: 0.5em; background-color: #2c4ecb; color: #fff; border: none; cursor: pointer; position: absolute; right: 0; top: 0; z-index: 10;';
</script>
  
<button on:click={copyToClipboard} style={buttonStyle}>
    {#if copied}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-5 h-5" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-5 h-5" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
    {/if}
</button>
