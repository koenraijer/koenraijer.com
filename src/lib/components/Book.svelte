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
        <div>
            <p class="anchor text-sm">
                <span class="truncate" style:--tag="title-{book["Book Id"]}" >{book.Title ? book.Title : ""}</span>
                (<span class="" style:--tag="author-{book["Book Id"]}">{book.Author})</span>
            </p>
        </div>
    {:else}
        <div class="space-y-3">
            <!-- Book Cover -->
            <div class="aspect-[2/3] w-full xs:w-36 sm:w-48 bg-muted/30 rounded-lg overflow-hidden">
                {#if book.cover_downloaded}
                    <LazyImg 
                        src={"/book_covers/" + book["Book Id"] + ".webp"} 
                        styleTag="book-{book["Book Id"]}" 
                        alt={book.Title} 
                        imgClasses="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        placeholderClasses="object-cover" 
                        parentClasses="w-full h-full"
                    />
                {:else}
                    <div class="w-full h-full bg-muted/50" />
                {/if}
            </div>
        
            <!-- Book Info -->
            <div class="space-y-1.5">
                <!-- Title -->
                <h2 
                    class="text-sm font-medium truncate hover:underline title_div" 
                    style:--tag="title-{book["Book Id"]}"
                >
                    {book.Title || ""}
                </h2>
        
                <!-- Author -->
                <p 
                    class="text-sm text-muted-foreground truncate author_div" 
                    style:--tag="author-{book["Book Id"]}"
                >
                    {book.Author}
                </p>
        
                <!-- Rating -->
                {#if book['My Rating']}
                    <div 
                        class="text-sm text-muted-foreground/80 rating_div" 
                        style:--tag="rating-{book["Book Id"]}"
                    >
                        {book['My Rating']} / 5
                    </div>
                {/if}
        
                <!-- Status -->
                <div class="status_div" style:--tag="status-{book["Book Id"]}">
                    {#if book['Exclusive Shelf'] === "read"}
                        <div class="text-xs py-1 px-3 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80">
                            Finished {book['Date Read'] ? ("on " + formatDate(book['Date Read'])) : ""}
                        </div>
                    {:else if book['Exclusive Shelf'] === "currently-reading"}
                        <div class="text-xs py-1 px-3 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80">
                            Currently reading
                        </div>
                    {:else if book['Exclusive Shelf'] === "to-read"}
                        <div class="text-xs py-1 px-3 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80">
                            On the wishlist
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</button>

<style>
    .title_div, .author_div, .rating_div, .status_div {
        view-transition-name: var(--tag);
    }
</style>

