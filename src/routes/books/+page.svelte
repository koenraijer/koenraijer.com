<script lang="ts">
    import Filters from '$lib/components/Filters.svelte';
    import Book from '$lib/components/Book.svelte';
    import * as info from '$lib/js/info.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { beforeNavigate } from '$app/navigation';
    import { ArrowRight } from 'lucide-svelte';

    // Define book interface
    interface Book {
        "Book Id": number;
        Title: string;
        Author: string;
        "Author l-f": string;
        "Additional Authors": string | null;
        ISBN: number;
        ISBN13: number;
        "My Rating": number;
        "Average Rating": number;
        Publisher: string;
        Binding: string;
        "Number of Pages": number;
        "Year Published": number;
        "Original Publication Year": number;
        "Date Read": string;
        "Date Added": string;
        Bookshelves: string | null;
        "Bookshelves with positions": string | null;
        "Exclusive Shelf": "read" | "currently-reading" | "to-read";
        "My Review": string | null;
        Spoiler: string | null;
        "Private Notes": string | null;
        "Read Count": number;
        "Owned Copies": number;
        book_url: string;
        cover_downloaded: number;
        slug: string;
    }

    // Define props and state
    export let data: { books: Book[] };
    let scrollPosition: number;
    let books: Book[] = [];
    let sort: string;
    let score: string;
    let status: string;
    let showStats = false;
    
    // Create memoized indices for faster filtering
    let bookIndices = {
        read: new Set<number>(),
        rating: new Map<number, Set<number>>(),
        dates: new Map<string, number>()
    };

    // Initialize filters from URL or defaults
    if (browser) {
        sort = $page.url.searchParams.get('sort') || "Newest";
        score = $page.url.searchParams.get('score') || "All scores";
        status = $page.url.searchParams.get('status') || "All";
    } else {
        sort = "Newest";
        score = "All scores";
        status = "All";
    }

    // Create indices for faster filtering
    function createIndices(books: Book[]): void {
        books.forEach((book, index) => {
            // Index for read status
            bookIndices.read.add(index);
            
            // Index for ratings
            if (!bookIndices.rating.has(book['My Rating'])) {
                bookIndices.rating.set(book['My Rating'], new Set());
            }
            bookIndices.rating.get(book['My Rating'])?.add(index);

            // Index for dates
            bookIndices.dates.set(book['Date Read'], index);
        });
    }

    // Modified filterBooks to prevent scroll interference
    function filterBooks(shouldUpdateUrl = true): void {
        let filteredIndices = new Set<number>([...bookIndices.read]);

        // Apply score filter
        if (score !== "All scores") {
            const scoreValue = parseInt(score.split(' ')[1], 10);
            const scoreFilteredIndices = new Set<number>();
            for (let i = scoreValue + 1; i <= 5; i++) {
                const indices = bookIndices.rating.get(i);
                if (indices) {
                    indices.forEach(index => scoreFilteredIndices.add(index));
                }
            }
            filteredIndices = new Set([...filteredIndices].filter(x => scoreFilteredIndices.has(x)));
        }

        // Apply status filter
        if (status !== "All") {
            filteredIndices = new Set([...filteredIndices].filter(
                index => data.books[index]["Exclusive Shelf"] === status
            ));
        }

        // Convert filtered indices to books
        let filteredBooks = [...filteredIndices].map(index => data.books[index]);

        // Apply sorting
        const sortFunctions = {
            "Newest": (a: Book, b: Book) => new Date(b['Date Read']).getTime() - new Date(a['Date Read']).getTime(),
            "Oldest": (a: Book, b: Book) => new Date(a['Date Read']).getTime() - new Date(b['Date Read']).getTime(),
            "Highest": (a: Book, b: Book) => b['My Rating'] - a['My Rating'],
            "Lowest": (a: Book, b: Book) => a['My Rating'] - b['My Rating'],
            "Title A-Z": (a: Book, b: Book) => a.Title.replace(/^[^\da-z]+/i, "").localeCompare(b.Title.replace(/^[^\da-z]+/i, "")),
            "Title Z-A": (a: Book, b: Book) => b.Title.replace(/^[^\da-z]+/i, "").localeCompare(a.Title.replace(/^[^\da-z]+/i, ""))
        };

        filteredBooks.sort(sortFunctions[sort as keyof typeof sortFunctions] || sortFunctions["Newest"]);
        books = filteredBooks;

        if (shouldUpdateUrl) {
            goto(
                `?sort=${encodeURIComponent(sort)}&score=${encodeURIComponent(score)}&status=${encodeURIComponent(status)}`, 
                { replaceState: true, noScroll: true }
            );
        }
    }

    // Event handlers
    function toggleStats(): void {
        showStats = !showStats;
    }

    function onOptionSelected(event: CustomEvent<{selectedOption: string}>): void {
        sort = event.detail.selectedOption;
        filterBooks();
    }

    function onScoreSelected(event: CustomEvent<{selectedScoreOption: string}>): void {
        score = event.detail.selectedScoreOption;
        if (score !== "All scores" && (status === "to-read" || status === "currently-reading")) {
            status = "read";
        }
        filterBooks();
    }

    function onCategorySelected(event: CustomEvent<{selectedCategoryOption: string}>): void {
        const displayValue = event.detail.selectedCategoryOption;
        status = displayValue === 'Finished' ? 'read' :
                displayValue === 'Reading now' ? 'currently-reading' :
                displayValue === 'On wishlist' ? 'to-read' : 'All';

        if (score !== "All scores" && (status === "currently-reading" || status === "to-read")) {
            score = "All scores";
        }
        filterBooks();
    }

    beforeNavigate(({ to }) => {
        if (to?.url.pathname.startsWith('/books/')) {
            scrollPosition = window.scrollY;
            sessionStorage.setItem('booksScrollPosition', scrollPosition.toString());
        }
    });

    onMount(() => {
        createIndices(data.books);
        
        // First restore scroll position
        const stored = sessionStorage.getItem('booksScrollPosition');
        
        // Then apply initial filtering without updating URL
        filterBooks(false);
        
        // Finally, if there was a stored position, restore it
        if (stored) {
            const position = parseInt(stored);
            // Use setTimeout to ensure the scroll happens after the DOM is updated
            setTimeout(() => {
                window.scrollTo(0, position);
                sessionStorage.removeItem('booksScrollPosition');
            }, 0);
        }
    });

    // SEO variables
    const title = "Books";
    const description = "A digital archive of my reading habits. Sourced from Goodreads, made web-ready with Python.";
    const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&slug=${encodeURIComponent($page.route.id ?? '')}`;
    const url = `${info.website}/books`;

    // Create a shallow copy for stats
    const copiedBooks = [...data.books];
</script>


<!-- SEO -->
<svelte:head>
  <title>{title} - {info.name}</title>
  <meta name="description" content={description} />
  <meta name="author" content={info.name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={info.website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<!-- Header Section -->
<header class="section space-y-4 mb-12">
    <h1 class="text-xl font-medium">Books</h1>
    <p class="text-muted-foreground/80 max-w-2xl text-sm">{description}</p>
    <button 
        on:click={toggleStats}
        class="text-sm text-muted-foreground/80 hover:text-foreground transition-colors inline-flex items-center"
        aria-expanded={showStats}
        aria-controls="reading-stats"
    >
        {showStats ? 'Hide' : 'Show'} stats <ArrowRight class="h-4 w-4 inline ml-1"/>
    </button>

    {#if showStats}
        <div 
            id="reading-stats"
            class="space-y-2 text-sm text-muted-foreground/80"
            transition:fade={{ duration: 200 }}
            role="region"
            aria-label="Reading statistics"
        >
            <p>Read: <span class="text-foreground" aria-label="Number of books read">{copiedBooks.filter(book => book['Exclusive Shelf'] === "read").length}</span> books</p>
            <p>Wishlist: <span class="text-foreground" aria-label="Number of books on wishlist">{copiedBooks.filter(book => book["Exclusive Shelf"] === "to-read").length}</span> books 
                <span aria-label="Percentage of total books">({Math.round(copiedBooks.filter(book => book["Exclusive Shelf"] === "to-read").length / copiedBooks.length * 100)}%)</span>
            </p>
            <p>Oldest: <span class="text-foreground">{copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0].Title}</span> 
                <span aria-label="Publication year">({copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year'] < 0 ? Math.abs(copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year']) + " BC" : copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year']})</span>
            </p>
            <p>Most common rating: <span class="text-foreground" aria-label="Rating">{copiedBooks.map(book => book['My Rating']).reduce((a, b) => a > b ? a : b)}</span> 
                <span aria-label="Number of books with this rating">({copiedBooks.filter(book => book['My Rating'] === copiedBooks.map(book => book['My Rating']).reduce((a, b) => a > b ? a : b)).length} books)</span>
            </p>
        </div>
    {/if}
</header>

<!-- Filters Container -->
<div 
    class="sticky top-0 left-0 right-0 z-50 px-4 pt-8 md:pt-12"
    role="region"
    aria-label="Book filters"
>
    <!-- Active Filters -->
    <div class="w-full flex justify-between">
        <div class="bg-background/80 rounded-full border border-muted-foreground/10 py-1 px-4 w-fit">
            <div class="text-sm text-muted-foreground/80" role="status" aria-live="polite">
                Showing:
                <div class="inline-flex gap-2 ml-2">
                    {#if sort !== 'Newest' || score !== 'All scores' || status !== 'All'}
                        {#if sort !== 'Newest'}
                            <span class="text-foreground">{sort}</span>
                        {/if}
                        {#if score !== 'All scores'}
                            <span class="text-foreground">{score}</span>
                        {/if}
                        {#if status !== 'All'}
                            <span class="text-foreground">{status}</span>
                        {/if}
                    {:else}
                        <span class="text-foreground">All</span>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Filters Dropdown -->
        <Filters 
            {score} 
            {sort} 
            {status} 
            on:optionSelected={onOptionSelected} 
            on:scoreSelected={onScoreSelected} 
            on:categorySelected={onCategorySelected} 
        />
    </div>
</div>

<!-- Books Grid -->
<section 
    class="px-4 md:px-8 py-8"
    aria-label="Books collection"
>
    <div 
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-8 auto-rows-max"
        transition:fade={{ duration: 200 }}
        role="list"
    >
    {#each books as book, index (book["Book Id"])}
        <div class="h-full" role="listitem">
            <Book {book} {index} />
        </div>
    {/each}
    </div>
</section>
