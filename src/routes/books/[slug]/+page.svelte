<script>
    export let data
    import { Ratings } from '@skeletonlabs/skeleton';
	import {formatDate} from '$lib/js/utils.js';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    const book = data.data.book

    function goBack() {
        // Check if there's a previous URL stored in sessionStorage
        const previousUrl = sessionStorage.getItem('previousUrl');
        if (browser && previousUrl && previousUrl.includes("books")) {
            // If so, navigate back to the previous URL
            goto(previousUrl, { replaceState: false });
        } else {
            // Otherwise, navigate back to the books page
            goto("/books", { replaceState: false });
        }
    }

</script>

<div class="section !mt-0 h-full flex place-content-center w-full">
    <div class="grid gap-x-16 gap-y-8 w-full md:grid-cols-3 place-self-center">
        <div class="w-full md:col-span-2">
            <div class="flex items-center group mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline group-hover:-translate-x-1 transition-transform pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <button on:click={goBack} class="group-hover:underline">
                    Books 
                </button>
            </div>

            <h1 class="text-xl font-bold pb-2 title_div w-full" style:--tag="title-{book["Book Id"]}">{book?.Title}</h1>
            <h2 class="text-xl author_div" style:--tag="author-{book["Book Id"]}">{book?.Author}</h2>
            <div class="py-4 rating_div" style:--tag="rating-{book["Book Id"]}">
                {#if book['My Rating']}
                    <Ratings value={book['My Rating']} max={5} justify>
                        <svelte:fragment slot="empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg>
                        </svelte:fragment>
                        <svelte:fragment slot="half">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-5 h-5" viewBox="0 0 256 256">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
                        </svelte:fragment>
                    </Ratings>
                {:else}
                    <Ratings value={0} max={5} justify>
                        <svelte:fragment slot="empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-5 h-5 text-surface-200-700-token" fill="currentColor" viewBox="0 0 256 256"><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg>
                        </svelte:fragment>
                    </Ratings>
                {/if}
            </div>
            <div class="status_div" style:--tag="status-{book["Book Id"]}">
                {#if book['Exclusive Shelf'] === "read"}
                    <div class="group py-1 px-4 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                        Finished {book['Date Read'] ? ("on " + formatDate(book['Date Read'])) : ""}
                    </div>
                {:else if book['Exclusive Shelf'] === "currently-reading"}
                    <div class="group py-1 px-2 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                        Currently reading
                    </div>
                {:else if book['Exclusive Shelf'] === "to-read"}
                    <div class="group py-1 px-2 w-fit relative transition-colors rounded-full border border-surface-200-700-token text-surface-700-200-token">
                        On the wishlist
                    </div>
                {/if}
            </div>
            
            <table class="border-collapse my-4">
                <h2 class="font-semibold">Metadata</h2>
                <tbody>
                    <tr>
                        <td class="text-surface-600-300-token">Format</td>
                        <td>{book['Number of Pages']} pages, {book['Binding']}</td>
                    </tr>
                    <tr>
                        <td class="text-surface-600-300-token">Published</td>
                        <td>{formatDate(book['Year Published'])} by {book['Publisher']}</td>
                    </tr>
                    <tr>
                        <td class="text-surface-600-300-token">ISBN</td>
                        <td>
                            {#if book['ISBN'] && book['ISBN']}
                                {book['ISBN13']} (ISBN10: {book['ISBN']})
                            {:else if book['ISBN13'] && !book['ISBN']}
                                {book['ISBN13']}
                            {:else if !book['ISBN13'] && book['ISBN']}
                                {book['ISBN']}
                            {:else if !book['ISBN13'] && !book['ISBN']}
                                Unknown
                            {/if}
                        </td>
                    </tr>
                </tbody>
            </table>    
        </div>
        <div class="mb-2 ml-0 w-full aspect-square place-self-center flex items-center justify-center dark:bg-surface-900 bg-surface-100 rounded-container !z-20 p-4 relative">
            <img class="w-auto scale-100 group-hover:scale-105 transition-transform duration-75 ease-out !z-0 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={"/book_covers/" + (book["Book Id"] ? book["Book Id"] : "") + ".webp"} alt={book.Title ? book.Title : ""} style:--tag="book-{book["Book Id"]}" />
        </div>
    </div>
</div>

<style>
    img, .author_div, .title_div, .rating_div, .status_div {
        view-transition-name: var(--tag);
    }

    table {
        border-spacing: 0;
    }
    td {
        @apply py-1;
    }
    td:first-child {
        @apply pr-4;
    }
</style>