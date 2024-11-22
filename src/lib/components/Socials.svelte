<script lang="ts">
    import * as info from '../js/info.js';
    import Github from '$lib/components/icons/Github.svelte';
    import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
    import Goodreads from '$lib/components/icons/Goodreads.svelte';
    import { Mail } from 'lucide-svelte';
</script>

<div class="flex flex-row flex-wrap gap-1.5">
    <a class="social" target="_blank" aria-label="Github" rel="noopener" href="https://github.com/koenraijer/">
        <Github class="w-4 h-4"/>
    </a>
    <a class="social" target="_blank" aria-label="LinkedIn" rel="noopener" href="https://www.linkedin.com/in/koen-raijer-3495a7127/">
        <LinkedIn class="w-4 h-4"/>
    </a>
    <a class="social" target="_blank" aria-label="Goodreads" rel="noopener" href="https://www.goodreads.com/koenraijer/">
        <Goodreads class="w-4 h-4"/>
    </a>
    <a class="social " target="_blank" aria-label="LinkedIn" rel="noopener" href="mailto:{info.email}">
        <Mail class="w-3.5 h-4"/>
    </a>
    <div class="sm:hidden block">
    </div>
</div>