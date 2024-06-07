<script>
    import { Ratings } from '@skeletonlabs/skeleton';
    import { formatDate } from '$lib/js/utils.js';
    import LazyImg from '$lib/components/LazyImg.svelte';
    import { goto } from '$app/navigation';
    import { popup } from '@skeletonlabs/skeleton';
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
        <div use:popup={{ event: 'hover', target: 'titleAuthorPopup-' + book["Book Id"], placement: 'bottom'}} class="[&>*]:pointer-events-none mb-2 ml-0 w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 flex items-center justify-center dark:bg-surface-900 bg-surface-100 rounded-container !z-20 p-4 relative">
            {#if book.cover_downloaded}
                <LazyImg src={"/book_covers/" + book["Book Id"] + ".webp"} styleTag="book-{book["Book Id"]}" alt={book.Title ? book.Title : ""} imgClasses="w-auto transform scale-100 group-hover:scale-105 transition-transform duration-75 ease-out !z-0 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" placeholderClasses="object-fill z-0" parentClasses=""/>
            {:else}
                <div class="placeholder w-full h-full bg-secondary-300-600-token"></div>
            {/if}
        </div>
        <div class="bg-surface-100 dark:bg-surface-900 rounded-container p-2 z-20 text-xs relative text-surface-800-100-token"  data-popup="titleAuthorPopup-{book["Book Id"]}">
            <p class="font-sans flex flex-col">
                <span class="font-semibold truncate" style:--tag="title-{book["Book Id"]}" >{book.Title ? book.Title : ""}</span>
                <span class="" style:--tag="author-{book["Book Id"]}">{book.Author}</span>
            </p>
        </div>
    {:else}
    <div class="mb-2 transform transition-transform mx-auto sm:ml-0 xs:w-36 xs:h-36 sm:w-48 sm:h-48 flex items-center justify-center dark:bg-surface-900 bg-surface-100 rounded-container shrink-0">
        {#if book.cover_downloaded}
            <LazyImg src={"/book_covers/" + book["Book Id"] + ".webp"} styleTag="book-{book["Book Id"]}" alt={book.Title ? book.Title : ""} imgClasses="w-auto transform scale-100 group-hover:scale-105 transition-transform duration-75 ease-out !z-0 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" placeholderClasses="object-fill z-0" parentClasses=""/>
        {:else}
            <div class="placeholder w-full h-full bg-secondary-300-600-token"></div>
        {/if}
    </div>
    <div class="flex flex-col flex-grow-0 w-full">
        <h2 class="font-semibold mb-0 pb-0 group-hover:underline title_div text-center sm:text-left truncate" style:--tag="title-{book["Book Id"]}" >{book.Title ? book.Title : ""}</h2>
        <span class="text-surface-700-200-token author_div text-center sm:text-left truncate w-full" style:--tag="author-{book["Book Id"]}">{book.Author}</span>
        {#if book['My Rating']}
            <div class="py-2 rating_div mx-auto sm:ml-0" style:--tag="rating-{book["Book Id"]}">
                    <Ratings value={book['My Rating']} max={5} justify>
                        <svelte:fragment slot="empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg>
                        </svelte:fragment>
                        <svelte:fragment slot="half">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 256 256">
                                <defs>
                                    <!-- Define a clipping path that covers the left half of the star -->
                                    <clipPath id="left-half">
                                        <rect x="0" y="0" width="128" height="256" />
                                    </clipPath>
                                </defs>
                                <!-- Draw the filled star and clip it to the left half -->
                                <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" clip-path="url(#left-half)"/>
                                <!-- Draw the outlined star on top -->
                                <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
                            </svg>                
                        </svelte:fragment>
                        <svelte:fragment slot="full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
                        </svelte:fragment>
                    </Ratings>
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

