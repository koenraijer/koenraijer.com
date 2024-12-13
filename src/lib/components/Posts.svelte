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

<div 
    class="flex flex-col gap-y-1 !leading-tight"
    role="list"
    aria-label="Blog posts"
>
    {#each posts as post (post.slug)}
        <div 
            class="inline"
            role="listitem"
        >
            <a 
                href={"/" + post.slug} 
                class="text-sm anchor"
                aria-label="{post.title}, published {formatDate(post.date)}"
            >
                {post.title}
            </a>
            <span 
                class="text-muted-foreground/70 text-xs"
                aria-hidden="true"
            >
                <CornerDownRight 
                    class="w-3 h-3 inline"
                    aria-hidden="true"
                /> 
                <time datetime={new Date(post.date).toISOString()}>
                    {formatDate(post.date)}
                </time>
            </span>
        </div>
    {/each}
</div>
