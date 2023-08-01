<script>
    export let data
    import Posts from '$lib/components/Posts.svelte';
    import HomeButton from '$lib/components/HomeButton.svelte';
</script>

<section class="section">
    <!-- Title -->
    <hgroup class="text-surface-900-50-token mx-auto mb-4 flex items-center">
        <div>
            <div class="relative inline-flex gap-x-4">
                <div class="screen-5xl:absolute screen-5xl:left-0 screen-5xl:top-0 transform screen-5xl:-translate-x-[137.5%]">
                    <HomeButton />
                </div>
                <h1 class="text-3xl font-semibold mb-4">All posts</h1>
            </div>
        </div>
    </hgroup>
    <Posts posts={data.posts} />
</section>
