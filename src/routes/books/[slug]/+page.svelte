<script lang="ts">
    export let data;
    import { formatDate } from '$lib/js/utils.js';
    import { Undo2 } from 'lucide-svelte';

    const book = data?.data?.book ?? {};
</script>

<svelte:head>
    <title>{book.Title} by {book.Author}</title>
    <meta name="description" content="Book details for {book.Title} by {book.Author}" />
    <meta property="og:title" content={book.Title} />
    <meta property="og:description" content="Book details for {book.Title} by {book.Author}" />
</svelte:head>

<section class="section">
    <div class="grid gap-8 md:grid-cols-3">
        <!-- Book Details -->
        <div class="md:col-span-2 space-y-4">
            <div>
                <h1 class="text-xl font-medium mb-2 title_div" style:--tag="title-{book["Book Id"]}">{book?.Title}</h1>
                <h2 class="text-lg text-muted-foreground author_div" style:--tag="author-{book["Book Id"]}">{book?.Author}</h2>
            </div>

            <!-- Rating -->
            {#if book['My Rating']}
                <div class="text-sm text-muted-foreground/80 rating_div" style:--tag="rating-{book["Book Id"]}">
                    {book['My Rating']} / 5
                </div>
            {/if}

            <!-- Reading Status -->
            <div class="" style:--tag="status-{book["Book Id"]}">
                <div class="text-xs !py-0 px-2 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80 inline-flex items-center gap-x-1 leading-0 !my-0 h-6 text-muted-foreground cursor-default
">
                    {#if book['Exclusive Shelf'] === "read"}
                        Finished {book['Date Read'] ? ("on " + formatDate(book['Date Read'])) : ""}
                    {:else if book['Exclusive Shelf'] === "currently-reading"}
                        Currently reading
                    {:else if book['Exclusive Shelf'] === "to-read"}
                        On wishlist
                    {/if}
                </div>
            </div>

            <!-- Metadata -->
            <div class="space-y-2">
                <h2 class="text-sm font-normal text-muted-foreground/80">Metadata</h2>
                <table class="text-sm w-full">
                    <tbody class="divide-y divide-muted-foreground/10">
                        <tr class="grid grid-cols-3 py-2">
                            <td class="text-muted-foreground/60">Format</td>
                            <td class="col-span-2">{book['Number of Pages']} pages, {book['Binding']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <td class="text-muted-foreground/60">Published</td>
                            <td class="col-span-2">{formatDate(book['Year Published'])} by {book['Publisher']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <td class="text-muted-foreground/60">ISBN</td>
                            <td class="col-span-2">
                                {#if book['ISBN'] && book['ISBN13']}
                                    {book['ISBN13']} (ISBN10: {book['ISBN']})
                                {:else if book['ISBN13']}
                                    {book['ISBN13']}
                                {:else if book['ISBN']}
                                    {book['ISBN']}
                                {:else}
                                    Unknown
                                {/if}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Book Cover -->
        <div class="aspect-[2/3] w-full relative bg-muted/30 rounded-lg overflow-hidden">
            <img 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                src={"../src/images/book_covers/" + (book["Book Id"] ? book["Book Id"] : "") + ".webp"} 
                alt={book.Title ? book.Title : ""} 
                style:--tag="book-{book["Book Id"]}"
            />
        </div>
    </div>
</section>