<script lang="ts">
    export let data;
    import { formatDate } from '$lib/js/utils.js';
    import Image from '$lib/components/Image.svelte';

    const book = data?.data?.book ?? {};
</script>

<svelte:head>
    <title>{book.Title} by {book.Author}</title>
    <meta name="description" content="Book details for {book.Title} by {book.Author}" />
    <meta property="og:title" content={book.Title} />
    <meta property="og:description" content="Book details for {book.Title} by {book.Author}" />
</svelte:head>

<article class="section" aria-label="Book details">
    <div class="grid gap-8 md:grid-cols-3">
        <!-- Book Details -->
        <div class="md:col-span-2 space-y-4">
            <header>
                <h1 class="text-xl font-medium mb-2" id="book-title">{book?.Title}</h1>
                <p class="text-lg text-muted-foreground" id="book-author">{book?.Author}</p>
            </header>

            <!-- Rating -->
            {#if book['My Rating']}
                <div class="text-sm text-muted-foreground/80" aria-label="Book rating">
                    <span aria-label="Rating: {book['My Rating']} out of 5 stars">
                        {book['My Rating']} / 5
                    </span>
                </div>
            {/if}

            <!-- Reading Status -->
            <div role="status" aria-label="Reading status">
                <div class="text-xs px-2 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80 inline-flex items-center gap-x-1 h-6">
                    {#if book['Exclusive Shelf'] === "read"}
                        Finished <time datetime={book['Date Read']}>{book['Date Read'] ? formatDate(book['Date Read']) : ""}</time>
                    {:else if book['Exclusive Shelf'] === "currently-reading"}
                        Currently reading
                    {:else if book['Exclusive Shelf'] === "to-read"}
                        On wishlist
                    {/if}
                </div>
            </div>

            <!-- Metadata -->
            <section aria-labelledby="metadata-heading">
                <h2 id="metadata-heading" class="text-sm font-normal text-muted-foreground/80">Metadata</h2>
                <table class="text-sm w-full" aria-label="Book metadata">
                    <tbody class="divide-y divide-muted-foreground/10">
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-muted-foreground/60 text-left">Format</th>
                            <td class="col-span-2">{book['Number of Pages']} pages, {book['Binding']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-muted-foreground/60 text-left">Published</th>
                            <td class="col-span-2">
                                <time datetime={book['Year Published']}>{formatDate(book['Year Published'])}</time> 
                                by {book['Publisher']}
                            </td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-muted-foreground/60 text-left">ISBN</th>
                            <td class="col-span-2">
                                {#if book['ISBN'] && book['ISBN13']}
                                    <span aria-label="ISBN-13">{book['ISBN13']}</span> 
                                    (<span aria-label="ISBN-10">ISBN10: {book['ISBN']}</span>)
                                {:else if book['ISBN13']}
                                    <span aria-label="ISBN-13">{book['ISBN13']}</span>
                                {:else if book['ISBN']}
                                    <span aria-label="ISBN-10">{book['ISBN']}</span>
                                {:else}
                                    Unknown
                                {/if}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!-- Book Cover -->
        <div class="aspect-[2/3] w-full relative bg-muted/30 rounded-lg overflow-hidden">
            <Image 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                src={"book_covers/" + (book["Book Id"] ? book["Book Id"] : "") + ".webp"} 
                alt={`Book cover for ${book.Title} by ${book.Author}`}
            />
        </div>
    </div>
</article>