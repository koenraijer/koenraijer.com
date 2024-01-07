<script>
    export let data;
    import Posts from '$lib/components/Posts.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
</script>

<div class="section">
    <PageTitle title={"Category: " + data.category}>
            
    </PageTitle>
    <Posts posts={data.posts} />
</div>
