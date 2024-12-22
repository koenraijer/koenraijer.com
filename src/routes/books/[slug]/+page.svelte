<script lang="ts">
    export let data;
    import { formatDate } from '$lib/js/utils.js';
    import Image from '$lib/components/Image.svelte';
    import { Star } from 'lucide-svelte';
    const book = data.book;
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
                <table class="text-sm w-full" aria-label="Book metadata">
                    <tbody class="divide-y divide-muted-foreground/10">
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-foreground/50 text-left font-medium">Pages</th>
                            <td class="col-span-2">{book['Number of Pages']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-foreground/50 text-left font-medium">Format</th>
                            <td class="col-span-2">{book['Binding']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-foreground/50 text-left font-medium">Year published</th>
                            <td class="col-span-2">
                                <time datetime={book['Year Published']}>{Math.round(book["Original Publication Year"])}</time>
                                
                            </td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-foreground/50 text-left font-medium">Publisher</th>
                            <td class="col-span-2">
                                {book['Publisher']}
                            </td>
                        </tr>
                        <tr class="grid grid-cols-3 py-2">
                            <th scope="row" class="text-foreground/50 text-left font-medium">ISBN</th>
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
            <!-- Floating Rating Badge -->
            {#if book['My Rating']}
                <div class="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 backdrop-blur-sm rounded-full py-0.5 px-2.5 shadow-sm">
                    <Star class="md:w-4 md:h-4 h-3 w-3" fill="currentColor" />
                    <span class="md:text-sm text-xs font-medium leading-none">{book['My Rating']}</span>
                </div>
            {/if}
        </div>
    </div>
</article>