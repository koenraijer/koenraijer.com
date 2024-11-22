<script lang="ts">
    import { onMount } from 'svelte';
    import Socials from '$lib/components/Socials.svelte';
    import * as info from '$lib/js/info.js';
    import { toast } from 'svelte-sonner';
    
    const STORAGE_KEY = 'domain-warning-dismissed';
    
    onMount(() => {
      const isDismissed = localStorage.getItem(STORAGE_KEY);
      if (!isDismissed) {
        toast(
          'The `.io` domain will no longer be available per January 22nd 2025. Please visit koenraijer.com instead.', 
          {
            duration: 10000,
            action: {
              label: "Don't show again",
              onClick: () => localStorage.setItem(STORAGE_KEY, 'true')
            }
          }
        );
      }
    });
</script>

<section>
    <h1 class="text-2xl mb-4">{info.name}</h1>
    <p class="mb-6">{@html info.bio.html}</p>
    <Socials />
</section>