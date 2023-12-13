<script>
    import * as info from "$lib/js/info.js"
    import ToTop from "$lib/components/ToTopButton.svelte" 
</script>

<div class="section space-y-4 pt-16 text-surface-500 gap-2 mb-6">
    <a href="/changelog" class="hover:underline h-fit">Koen Raijer</a>

    <div class="flex justify-between">
        <div class="flex gap-x-4">
            <a href="/changelog" class="hover:underline h-fit">Changelog</a>
            <a href="https://github.com/koenraijer/koenraijer.2.0" class="hover:underline" target="_self" rel="nofollow noopener noreferrer">Source code</a>
        </div>
    </div>
    <div class="flex justify-between place-items-end">
        <span class="whitespace-nowrap sm:w-fit w-full text-xs">
            © {new Date().getFullYear()} <a href="/" class="hover:underline">{info.title}</a>
        </span>
        <ToTop/>
    </div>
</div>