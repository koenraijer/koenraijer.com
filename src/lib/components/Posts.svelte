<script>
    export let posts; // Make this component receive 'posts' as a prop
    export let limit = Infinity; // Add a 'limit' prop with a default value of Infinity
    import { formatDate } from '$lib/utils'; // import your formatDate helper function

    // When posts or limit change, update the displayedPosts
    let displayedPosts = [];
    $: displayedPosts = posts.slice(0, limit);
</script>

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
