<script>
    // Purpose: show a book inside a blog post.
    import { formatDate } from '$lib/js/utils.js';
    import LazyImg from '$lib/components/LazyImg.svelte';
    import { BookmarkCheck, ClipboardList, BookOpen, Star } from 'lucide-svelte';

    export let slug;
    let book;

    async function loadBook() {
        const response = await fetch("/book_data.json");
        const data = await response.json();
        book = data.find(b => b.slug === slug);
    }

    loadBook();
</script>

{#if book}
<a href={`/books/${book.slug}`} class="block w-full max-w-xs mx-auto bg-background shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative pb-[150%]">
        {#if book.cover_downloaded}
            <LazyImg 
                src={`/images/book_covers/${book["Book Id"]}.webp`}
                styleTag={`book-${book["Book Id"]}`}
                alt={book.Title}
                imgClasses="absolute inset-0 w-full h-full object-cover"
                placeholderClasses="absolute inset-0 w-full h-full object-cover bg-muted"
                parentClasses="absolute inset-0"
            />
        {:else}
            <div class="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                No Cover
            </div>
        {/if}
        
        {#if book['My Rating']}
            <div class="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 backdrop-blur-sm rounded-full py-0.5 px-2 shadow-sm">
                <Star class="w-3 h-3" fill="currentColor" />
                <span class="text-xs font-medium leading-none">{book['My Rating']}</span>
            </div>
        {/if}
    </div>
    
    <div class="p-4 space-y-2">
        <h2 class="text-lg font-semibold line-clamp-2">{book.Title || ""}</h2>
        <p class="text-sm text-muted-foreground">{book.Author}</p>
        
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
            {#if book['Exclusive Shelf'] === "read"}
                <BookmarkCheck class="w-4 h-4" />
                <span>{book['Date Read'] ? formatDate(book['Date Read']) : "Finished"}</span>
            {:else if book['Exclusive Shelf'] === "currently-reading"}
                <BookOpen class="w-4 h-4" />
                <span>Reading</span>
            {:else if book['Exclusive Shelf'] === "to-read"}
                <ClipboardList class="w-4 h-4" />
                <span>Wishlist</span>
            {/if}
        </div>
    </div>
</a>
{/if}