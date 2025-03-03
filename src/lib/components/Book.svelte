<script lang="ts">
    import { formatDate } from '$lib/js/utils.js';
    import LazyImg from '$lib/components/LazyImg.svelte';
    import { BookmarkCheck, ClipboardList, BookOpen, Star } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    export let compact = false
    export let book;
    export let index = 0;
    
    // Calculate columns based on viewport for first row only
    const columnsMap = {
        'default': 2,  // grid-cols-2
        'sm': 3,       // sm:grid-cols-3
        'md': 4,       // md:grid-cols-4
        'lg': 5,       // lg:grid-cols-5
        'xl': 6,       // xl:grid-cols-6
        '2xl': 7       // 2xl:grid-cols-7
    };
    
    // Only first row should be eagerly loaded
    const isAboveFold = (idx: number) => {
        const viewport = window?.innerWidth || 0;
        let columns = columnsMap.default;
        
        if (viewport >= 1536) columns = columnsMap['2xl'];
        else if (viewport >= 1280) columns = columnsMap.xl;
        else if (viewport >= 1024) columns = columnsMap.lg;
        else if (viewport >= 768) columns = columnsMap.md;
        else if (viewport >= 640) columns = columnsMap.sm;
        
        return idx < columns; // Just 1 row
    };

    function navigateToBookDetails(book: { slug: any; }) {
        // Store the current URL in sessionStorage
        sessionStorage.setItem('previousUrl', window.location.href);
        // Navigate to the book details page
        goto(`/books/${book.slug}`, { replaceState: false });
    }
    
</script>

<!--Body-->
<button class="flex flex-col w-full sm:flex-row group gap-x-4 overflow-hidden" on:click|preventDefault={() => navigateToBookDetails(book)}>
    {#if compact}
        <p class="anchor text-sm text-left inline !leading-tight">
            <span>{book.Title ? book.Title : ""}</span>
            <span class="text-muted-foreground text-sm">&nbsp;~ {book.Author}</span>

        </p>
    {:else}
    <div class="group w-full">
        <!-- Book Cover Container -->
        <div class="relative w-full mb-2">
            <!-- Fixed aspect ratio container -->
            <div class="relative w-full pb-[150%]">
                <!-- Content container with rounded corners -->
                <div class="absolute inset-0 rounded-lg overflow-hidden bg-muted/30">
                    {#if book.cover_downloaded}
                        <!-- src={"/book_covers/" + book["Book Id"] + ".webp"}  -->
                        <LazyImg 
                            src={"/images/book_covers/" + book["Book Id"] + ".webp"} 
                            styleTag="book-{book["Book Id"]}" 
                            alt={book.Title} 
                            imgClasses="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                            placeholderClasses="object-contain" 
                            parentClasses="w-full h-full"
                            loading={isAboveFold(index) ? 'eager' : 'lazy'}
                        />
                    {:else}
                        <div class="w-full h-full bg-muted/50" />
                    {/if}
                </div>
    
                <!-- Floating Rating Badge -->
                {#if book['My Rating']}
                    <div class="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 backdrop-blur-sm rounded-full py-0.5 px-2 shadow-sm">
                        <Star class="w-3 h-3" fill="currentColor" />
                        <span class="text-xs font-medium leading-none">{book['My Rating']}</span>
                    </div>
                {/if}
            </div>
        </div>
    
        <!-- Book Info -->
        <div class="space-y-1.5">
            <!-- Title and Author in more compact layout -->
            <div class="space-y-0.5">
                <h2 class="text-sm font-medium line-clamp-1 hover:underline text-left">
                    {book.Title || ""}
                </h2>
                <p class="text-xs text-muted-foreground line-clamp-1 text-left">
                    {book.Author}
                </p>
            </div>
    
            <!-- Status with more compact design -->
            <div class="flex items-center gap-1 text-xs text-muted-foreground/80">
                {#if book['Exclusive Shelf'] === "read"}
                        <BookmarkCheck class="w-3.5 h-3.5" />
                        <span>{book['Date Read'] ? (formatDate(book['Date Read'])) : "Finished"}</span>
                {:else if book['Exclusive Shelf'] === "currently-reading"}
                        <BookOpen class="w-3.5 h-3.5" />
                        <span>Reading</span>
                {:else if book['Exclusive Shelf'] === "to-read"}
                        <ClipboardList class="w-3.5 h-3.5" />
                        <span>Wishlist</span>
                {/if}
            </div>
        </div>
    </div>
    {/if}
</button>
