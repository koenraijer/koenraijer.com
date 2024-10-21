<script>
    import * as info from "$lib/js/info.js"
    import ToTop from "$lib/components/ToTopButton.svelte" 
    let menuItems = info.menuItems
</script>

<div class="gap-2 mb-6 mt-12 flex w-full mx-auto justify-between px-6 sm:px-8 items-start">
    <div class="">
        <a href="/" class="hover:underline h-fit text-surface-500 font-semibold">Koen Raijer</a>
        <div class="flex flex-col justify-between text-surface-500 text-sm">
            <div class="flex flex-col sm:flex-row gap-x-4">
                {#each menuItems as item}
                    <a href={item.href} class="hover:underline h-fit">{item.title}</a>
                {/each}
            </div>
            <span class="whitespace-nowrap sm:w-fit w-full text-xs mt-2 text-surface-400">
                © {new Date().getFullYear()} <a href="/" class="hover:underline">{info.title}</a>
            </span>
        </div>
    </div>
    <!-- <div class="text-surface-500 space-y-0">
        <ToTop/>
    </div> -->
</div>