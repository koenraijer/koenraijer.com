<script lang="ts">
    import * as info from '$lib/js/info.js';
    import Github from '$lib/components/icons/Github.svelte';
    import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
    import Goodreads from '$lib/components/icons/Goodreads.svelte';
    import { Rss } from 'lucide-svelte';
</script>

<div class="flex flex-row flex-wrap gap-1.5" aria-label="Social media links">
    <a class="social" target="_blank" aria-label="Github" rel="noopener" href={info.github_repo} title="Github repository">
        <Github class="w-4 h-4" aria-hidden="true"/>
    </a>
    <a class="social" target="_blank" aria-label="LinkedIn" rel="noopener" href={info.linkedin} title="LinkedIn">
        <LinkedIn class="w-4 h-4" aria-hidden="true"/>
    </a>
    <a class="social" target="_blank" aria-label="Goodreads" rel="noopener" href={info.goodreads} title="Goodreads">
        <Goodreads class="w-4 h-4" aria-hidden="true"/>
    </a>
    <a class="social" aria-label="RSS" data-sveltekit-preload-data="off" rel="noopener external" href="/rss.xml" title="RSS">
        <Rss class="w-4 h-4" aria-hidden="true"/>
    </a>
</div>