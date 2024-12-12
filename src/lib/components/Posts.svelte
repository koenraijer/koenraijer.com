<script>
    export let posts;
    import { CornerDownRight } from 'lucide-svelte';
    
    /**
	 * @param {string | number | Date} dateString
	 */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
    }
</script>

<div class="flex flex-col gap-y-1 !leading-tight">
    {#each posts as post}
        <div class="inline">
            <a href={"/" + post.slug} class="text-sm anchor">
                {post.title}
            </a>
            <span class="text-muted-foreground/70 text-xs">
                <CornerDownRight class="w-3 h-3 inline"/> {formatDate(post.date)}
            </span>
        </div>
    {/each}
</div>