<script>
    export let posts; // Make this component receive 'posts' as a prop
    export let limit = Infinity; // Add a 'limit' prop with a default value of Infinity

    // When posts or limit change, update the displayedPosts
    let displayedPosts = [];

    // @ts-ignore
    $: displayedPosts = posts.slice(0, limit);

    // Group posts by year
    /**
	 * @param {any[]} posts
	 */
    function groupPostsByYear(posts) {
    let groupedPosts = {};

    posts.forEach((/** @type {{ date: string | number | Date; }} */ post) => {
        const year = new Date(post.date).getFullYear();

        // @ts-ignore
        if (!groupedPosts[year]) {
            // @ts-ignore
            groupedPosts[year] = [];
        }

        // @ts-ignore
        groupedPosts[year].push(post);
    });

    return groupedPosts;
}

    let groupedPosts = groupPostsByYear(posts);
</script>

{#each Object.entries(groupedPosts).sort((a, b) => Number(b[0]) - Number(a[0])) as [year, posts], i}
    <div class="grid grid-cols-6 py-3 gap-x-2">
        <p class="date col-start-1 text-sm">
            {year}
        </p>
        <div class="col-start-2 col-end-7 flex flex-col">
            {#each posts as post}
                <a href={"/" + post.slug} class="hover:underline text-base">
                    {post.title}
                </a>
            {/each}
        </div>
    </div>
{/each}
