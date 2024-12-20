
<script>
    import Filters from '$lib/components/Filters.svelte';
    import Book from '$lib/components/Book.svelte';
    import * as info from '$lib/js/info.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { beforeNavigate } from '$app/navigation';
    
    // Add this near your other state variables
    let scrollPosition = 0;

    // Store scroll position before navigation
    beforeNavigate(({ to }) => {
        if (to?.url.pathname.startsWith('/books/')) {
            scrollPosition = window.scrollY;
            sessionStorage.setItem('booksScrollPosition', scrollPosition.toString());
        }
    });

    export let data;
    let sort, score, status;
    let showStats = false;

    if (browser) {
        sort = $page.url.searchParams.get('sort') || "Newest";
        score = $page.url.searchParams.get('score') || "All scores";
        status = $page.url.searchParams.get('status') || "All";
    } else {
        sort = "Newest";
        score = "All scores";
        status = "All";
    }

    function toggleStats() {
        showStats = !showStats;
    }

    let books = data.books;

    // copy "books" object to a new variable
    let copiedBooks = JSON.parse(JSON.stringify(books));
    
	// handle the 'selected' event dispatched from Filters.svelte
    function onOptionSelected(event) {
        sort = event.detail.selectedOption;
        filterBooks()
    }

    function onScoreSelected(event) {
        score = event.detail.selectedScoreOption
        // If a score is selected, set the category filter to read
        if (score !== "All scores" && status === "to-read" || status === "currently-reading") {
            status = "read";
        }
        status = status
        filterBooks()
    }

    // New function to handle category selection
    function onCategorySelected(event) {
        let displayValue = event.detail.selectedCategoryOption;
        // Map the display value to the internal status value
        if (displayValue === 'Finished') {
            status = 'read';
        } else if (displayValue === 'Reading now') {
            status = 'currently-reading';
        } else if (displayValue === 'On wishlist') {
            status = 'to-read';
        } else {
            status = 'All';
        }
        // If the category "On wishlist" is selected, reset the score filter
        if (score !== "All scores" && status === "currently-reading" || status === "to-read") {
            score = "All scores";
        }
        score = score
        filterBooks()
    }


    function filterBooks() {
        // Start with the original dataset
        let filteredBooks = [...data.books];

        // Filter by score
        if (score !== "All scores") {
            const scoreValue = parseInt(score.split(' ')[1], 10);
            filteredBooks = filteredBooks.filter(book => book['My Rating'] > scoreValue);
        }

        // Filter by category
        if (status !== "All") {
            filteredBooks = filteredBooks.filter(book => book["Exclusive Shelf"] === status);
        }

        // Sort the filtered books
        if (sort === "Newest") {
            filteredBooks.sort((a, b) => new Date(b['Date Read']) - new Date(a['Date Read']));
        } else if (sort === "Oldest") {
            filteredBooks.sort((a, b) => new Date(a['Date Read']) - new Date(b['Date Read']));
        } else if (sort === "Highest") {
            filteredBooks.sort((a, b) => b['My Rating'] - a['My Rating']);
        } else if (sort === "Lowest") {
            filteredBooks.sort((a, b) => a['My Rating'] - b['My Rating']);
        } else if (sort === "Title A-Z") {
            filteredBooks.sort((a, b) => {
                if (typeof a.Title !== 'string' && typeof b.Title !== 'string') return 0;
                if (typeof a.Title !== 'string') return 1;
                if (typeof b.Title !== 'string') return -1;
                return a.Title.replace(/^[^\da-z]+/i, "").localeCompare(b.Title.replace(/^[^\da-z]+/i, ""));
            });
        } else if (sort === "Title Z-A") {
            filteredBooks.sort((a, b) => {
                if (typeof a.Title !== 'string' && typeof b.Title !== 'string') return 0;
                if (typeof a.Title !== 'string') return -1;
                if (typeof b.Title !== 'string') return 1;
                return b.Title.replace(/^[^\da-z]+/i, "").localeCompare(a.Title.replace(/^[^\da-z]+/i, ""));
            });
        } else {
            filteredBooks.sort((a, b) => new Date(b['Date Read']) - new Date(a['Date Read']));
        }

        // Assign the sorted and filtered array to books variable
        books = filteredBooks;

        // history.pushState(null, '', `?sort=${encodeURIComponent(sort)}&score=${encodeURIComponent(score)}&status=${encodeURIComponent(status)}`);
        goto(`?sort=${encodeURIComponent(sort)}&score=${encodeURIComponent(score)}&status=${encodeURIComponent(status)}`, { replaceState: true, noScroll: true });
    }
    
    onMount(() => {
        filterBooks();
        
        // Restore scroll position if coming back from a book detail page
        const stored = sessionStorage.getItem('booksScrollPosition');
        if (stored) {
            window.scrollTo(0, parseInt(stored));
            sessionStorage.removeItem('booksScrollPosition');
        }
    });

	// SEO
    const title = "Books"
    const description = "Explore (almost!) every book I've read since 2013. Currently sourced from a GoodReads export and updated whenever I update the website using a Python script."
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&slug=${encodeURIComponent($page.route.id)}`

	const url = `${info.website}/books`

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
    <h1 class="text-xl">Books</h1>
    <p class="text-muted-foreground/80 max-w-2xl">{description}</p>
    <button 
        on:click={toggleStats}
        class="text-sm text-muted-foreground/60 hover:text-foreground transition-colors"
        aria-expanded={showStats}
        aria-controls="reading-stats"
    >
        {showStats ? 'Hide' : 'Show'} reading statistics →
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
        <div class="bg-background/80 backdrop-blur-sm rounded-full border border-muted-foreground/10 py-1.5 px-4 w-fit">
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
        {#each books as book (book["Book Id"])}
            <div class="h-full" role="listitem">
                <Book {book} />
            </div>
        {/each}
    </div>
</section>
