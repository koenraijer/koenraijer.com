<script>
    import * as info from "$lib/js/info.js"
    import ToTop from "$lib/components/ToTopButton.svelte" 
</script>

<div class="space-y-4 gap-2 mb-6 mt-12 flex w-full mx-auto justify-between max-w px-6 sm:px-8 md:px-16">
    <div class="">
        <a href="/" class="hover:underline h-fit font-semibold">Koen Raijer</a>
        <div class="flex flex-col justify-between text-surface-500 text-base">
            <div class="flex gap-x-4">
                <a href="/library" class="hover:underline h-fit">Library</a>
                <a href="/changelog" class="hover:underline h-fit">Changelog</a>
                <a href="https://github.com/koenraijer/koenraijer.2.0" class="hover:underline" target="_self" rel="nofollow noopener noreferrer">Source code</a>
            </div>
            <span class="whitespace-nowrap sm:w-fit w-full text-xs mt-2 text-surface-400">
                © {new Date().getFullYear()} <a href="/" class="hover:underline">{info.title}</a>
            </span>
        </div>
    </div>
    <div class="text-surface-500">
        <ToTop/>
    </div>
</div>