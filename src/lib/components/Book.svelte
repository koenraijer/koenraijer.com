<script>
    import { formatDate } from '$lib/js/utils.js';
    import LazyImg from '$lib/components/LazyImg.svelte';
    import { goto } from '$app/navigation';
    export let compact = false
    export let book;
    
    function navigateToBookDetails(book) {
        // Store the current URL in sessionStorage
        sessionStorage.setItem('previousUrl', window.location.href);
        // Navigate to the book details page
        goto(`/books/${book.slug}`, { replaceState: false });
    }
</script>

<!--Body-->
<button class="flex flex-col sm:flex-row {compact ? "w-fit" : "w-full"} group gap-x-4 overflow-hidden" on:click|preventDefault={() => navigateToBookDetails(book)}>
    {#if compact}
        <!-- <div use:popup={{ event: 'hover', target: 'titleAuthorPopup-' + book["Book Id"], placement: 'bottom'}} class="[&>*]:pointer-events-none mb-2 ml-0 w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 flex items-center justify-center dark:bg-surface-900 bg-surface-100 rounded-container !z-20 p-4 relative">
            {#if book.cover_downloaded}
                <LazyImg src={"/book_covers/" + book["Book Id"] + ".webp"} styleTag="book-{book["Book Id"]}" alt={book.Title ? book.Title : ""} imgClasses="w-auto transform scale-100 group-hover:scale-105 transition-transform duration-75 ease-out !z-0 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" placeholderClasses="object-fill z-0" parentClasses="w-full h-full relative"/>
            {:else}
                <div class="placeholder w-full h-full bg-secondary-300-600-token"></div>
            {/if}
        </div> -->
        <div class="bg-surface-100 dark:bg-surface-900 rounded-container p-2 z-20 text-xs relative text-surface-800-100-token"  data-popup="titleAuthorPopup-{book["Book Id"]}">
            <p class="font-sans flex flex-col">
                <span class="font-semibold truncate" style:--tag="title-{book["Book Id"]}" >{book.Title ? book.Title : ""}</span>
                <span class="" style:--tag="author-{book["Book Id"]}">{book.Author}</span>
            </p>
        </div>
    {:else}
    <div class="mb-2 transform transition-transform mx-auto sm:ml-0 xs:w-36 xs:h-36 sm:w-48 sm:h-48 flex items-center justify-center dark:bg-surface-900 bg-surface-100 rounded-container shrink-0 p-4">
        {#if book.cover_downloaded}
            <LazyImg src={"/book_covers/" + book["Book Id"] + ".webp"} styleTag="book-{book["Book Id"]}" alt={book.Title ? book.Title : ""} imgClasses="w-auto transform scale-100 group-hover:scale-105 transition-transform duration-75 ease-out !z-0 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" placeholderClasses="object-fill z-0" parentClasses="w-full h-full relative"/>
        {:else}
            <div class="placeholder w-full h-full bg-secondary-300-600-token"></div>
        {/if}
    </div>
    <div class="flex flex-col flex-grow-0 w-full">
        <h2 class="font-semibold mb-0 pb-0 group-hover:underline title_div text-center sm:text-left truncate" style:--tag="title-{book["Book Id"]}" >{book.Title ? book.Title : ""}</h2>
        <span class="text-surface-700-200-token author_div text-center sm:text-left truncate w-full" style:--tag="author-{book["Book Id"]}">{book.Author}</span>
        {#if book['My Rating']}
            <div class="py-2 rating_div mx-auto sm:ml-0" style:--tag="rating-{book["Book Id"]}">
                    {book['My Rating']} / 5
                </div>
            {/if}
        <div class="status_div mx-auto sm:ml-0" style:--tag="status-{book["Book Id"]}">
            {#if book['Exclusive Shelf'] === "read"}
                <div class="group text-xs py-1 px-3 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                    Finished {book['Date Read'] ? ("on " + formatDate(book['Date Read'])) : ""}
                </div>
            {:else if book['Exclusive Shelf'] === "currently-reading"}
                <div class="group text-xs py-1 px-3 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                    Currently reading
                </div>
            {:else if book['Exclusive Shelf'] === "to-read"}
                <div class="group text-xs py-1 px-3 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                    On the wishlist
                </div>
            {/if}
        </div>
    </div>
    {/if}
</button>

<style>
    .title_div, .author_div, .rating_div, .status_div {
        view-transition-name: var(--tag);
    }
</style>

