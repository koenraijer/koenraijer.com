<script>
    export let data;
    import Posts from '$lib/components/Posts.svelte';
    import HomeButton from '$lib/components/HomeButton.svelte';
</script>

<div class="mt-8 max-w-5xl mx-auto px-6 sm:px-8 screen-5xl:px-0">
    <!-- Title -->
    <hgroup class="text-surface-900-50-token mx-auto mb-4 flex items-center">
        <div>
            <p class="uppercase mb-2 text-surface-400">Category</p>
            <div class="relative inline-flex gap-x-4">
                <div class="screen-5xl:absolute screen-5xl:left-0 screen-5xl:top-0 transform screen-5xl:-translate-x-[137.5%]">
                    <HomeButton />
                </div>
                <h1 class="text-3xl font-semibold mb-4">{data.category}</h1>
            </div>
        </div>
    </hgroup>
    <Posts posts={data.posts} />
</div>
