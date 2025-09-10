<script lang="ts">
    import { formatDate } from '$lib/js/utils.js';
    import LazyImg from '$lib/components/LazyImg.svelte';
    import { ClipboardList, BookOpen } from 'lucide-svelte';
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

    // Local formatter: DD-MM-YY
    function formatDDMMYY(input: string | Date | undefined) {
        if (!input) return '';
        const d = new Date(input);
        if (isNaN(d.getTime())) return '';
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yy = String(d.getFullYear()).slice(-2);
        return `${dd}-${mm}-${yy}`;
    }
    
</script>

<!--Body-->
<button class="flex flex-col w-full sm:flex-row group gap-x-4 overflow-hidden" on:click|preventDefault={() => navigateToBookDetails(book)}>
    {#if compact}
        <p class="anchor underline decoration-dotted underline-offset-2 text-sm text-left inline !leading-tight">
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
    
                <!-- Rating caption below cover -->
            </div>
        </div>
        <!-- Book Info -->
        <div class="space-y-0.5">
            <!-- Title and Author in more compact layout -->
            <div class="space-y-0.5">
                <h2 class="text-sm font-medium line-clamp-1 hover:underline text-left">
                    {book.Title || ""}
                </h2>
                <p class="text-xs text-muted-foreground line-clamp-1 text-left">
                    {book.Author}
                </p>
            </div>
    
            <!-- Status with compact, inline flow -->
            <p class="text-xs text-muted-foreground/80 text-left">
                {#if book['Exclusive Shelf'] === "read"}
                    {#if book['Date Read']}
                        <span>{formatDDMMYY(book['Date Read'])}</span>
                    {/if}
                    {#if book['My Rating']}
                        <span class="text-muted-foreground/50"> · </span>
                        <span class="font-mono">[★ {book['My Rating']}/5]</span>
                    {/if}
                {:else if book['Exclusive Shelf'] === "currently-reading"}
                    <BookOpen class="w-3.5 h-3.5 inline-block align-[0.1em]" />
                    <span class="ml-1">Reading</span>
                {:else if book['Exclusive Shelf'] === "to-read"}
                    <ClipboardList class="w-3.5 h-3.5 inline-block align-[0.1em]" />
                    <span class="ml-1">Wishlist</span>
                {/if}
            </p>
        </div>
    </div>
    {/if}
</button>
