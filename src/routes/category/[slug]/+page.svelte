<script>
    export let data;
    import Posts from '$lib/components/Posts.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
</script>

<div class="section">
    <PageTitle title={data.category}>
            <p class="uppercase mb-2 text-surface-400">Category</p>
    </PageTitle>
    <Posts posts={data.posts} />
</div>
