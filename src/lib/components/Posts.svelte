<script>
    export let posts; // Make this component receive 'posts' as a prop
    export let limit = Infinity; // Add a 'limit' prop with a default value of Infinity
    export let compact = false; // Add a 'compact' prop with a default value of false
    import { formatDate } from '$lib/js/utils'; // import your formatDate helper function

    // When posts or limit change, update the displayedPosts
    let displayedPosts = [];
    $: displayedPosts = posts.slice(0, limit);

    // Group posts by year
    function groupPostsByYear(posts) {
    let groupedPosts = {};

    posts.forEach(post => {
        const year = new Date(post.date).getFullYear();

        if (!groupedPosts[year]) {
            groupedPosts[year] = [];
        }

        groupedPosts[year].push(post);
    });

    return groupedPosts;
}

    let groupedPosts = groupPostsByYear(posts);
</script>

{#if compact}
    {#each Object.entries(groupedPosts).sort((a, b) => b[0] - a[0]) as [year, posts], i}
    <div class="grid grid-cols-4 py-4 pb-6 gap-x-2">
        <p class="date col-start-1 col-end-2 text-surface-400 uppercase">
            {year}
        </p>
        <div class="col-start-2 col-end-5">
            {#each posts as post}
                <div class="pb-2">
                    <a href={"/" + post.slug} class="group block">
                        <h4 class="group-hover:underline">{post.title}</h4>
                    </a>
                </div>
            {/each}
        </div>
    </div>
        {#if i !== Object.entries(groupedPosts).sort((a, b) => b[0] - a[0]).length - 1}
            <hr class="!border-surface-200"/>
        {/if}
    {/each}
{:else}
    <ul>
        {#each displayedPosts as post, i}
            <li>
                <a class="group font-sans" href={"/" + post.slug}>
                    <div class="grid grid-cols-1 py-4 pb-4 gap-x-2">
                        <p class="date sm:pb-1 text-surface-400 text-sm font-sans">
                            {formatDate(post.date)} — {post.readingTime}
                        </p>
                        <div class="">
                            <h4 class="text-base font-semibold group-hover:underline">{post.title}</h4>
                            <p class="description pt-1 text-surface-700-200-token">{post.description}</p>
                        </div>
                    </div>
                    {#if i !== displayedPosts.length - 1}
                        <hr class="!border-surface-200"/>
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
    {#if displayedPosts.length < 1}
        <p>
            There were no results matching the search query. 
        </p>
    {/if}
{/if}
