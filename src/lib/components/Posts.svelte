<script>
    export let posts; // Make this component receive 'posts' as a prop
    export let limit = Infinity; // Add a 'limit' prop with a default value of Infinity
    export let compact = false; // Add a 'compact' prop with a default value of false
    import { formatDate } from '$lib/utils'; // import your formatDate helper function

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
    {#each Object.entries(groupedPosts).sort((a, b) => b[0] - a[0]) as [year, posts]}
    <div class="grid grid-cols-4 py-4 pb-6 gap-x-2">
        <p class="date col-start-1 col-end-2 text-surface-400 uppercase">
            {year}
        </p>
        <div class="col-start-2 col-end-5">
            {#each posts as post}
                <div class="pb-2">
                    <a href={"/" + post.slug} class="group block">
                        <span class="text-lg font-semibold group-hover:underline">{post.title}</span>
                    </a>
                    <hr class="!border-surface-200"/>
                </div>
            {/each}
        </div>
    </div>
    {/each}
{:else}
    {#each displayedPosts as post}
        <a class="group" href={"/" + post.slug}>
            <li class="grid grid-cols-4 py-4 pb-6 gap-x-2">
                <p class="date col-start-1 col-end-2 text-surface-400 uppercase">
                    {formatDate(post.date)} — {post.readingTime}
                </p>
                <div class="col-start-2 col-end-5">
                    <span class="text-lg font-semibold group-hover:underline">{post.title}</span>
                    <p class="description pt-[0.37rem] text-surface-700-200-token">{post.description}</p>
                </div>
            </li>

            <hr class="!border-surface-200"/>
        </a>
    {/each}
{/if}
