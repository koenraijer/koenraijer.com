<script>
    export let data
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

<div class="section sm:!mt-0 h-full flex place-content-center w-full">
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
                    {book['My Rating']} / 5
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