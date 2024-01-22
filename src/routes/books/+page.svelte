
<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import Filters from '$lib/components/Filters.svelte';
    import Book from '$lib/components/Book.svelte';
    import * as info from '$lib/js/info.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    export let data;
    let sort, score, status;

    if (browser) {
        sort = $page.url.searchParams.get('sort') || "Newest";
        score = $page.url.searchParams.get('score') || "All scores";
        status = $page.url.searchParams.get('status') || "All";
    } else {
        sort = "Newest";
        score = "All scores";
        status = "All";
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
        status = event.detail.selectedCategoryOption;
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
        goto(`?sort=${encodeURIComponent(sort)}&score=${encodeURIComponent(score)}&status=${encodeURIComponent(status)}`, { replaceState: false, noScroll: true });
    }
    
    onMount(() => {
        filterBooks();
    });

	// SEO
    const title = "Books"
    const description = "Displayed below are (almost!) all books I've read since 2013. The page is populated from a JSON file that is sourced from an Excel spreadsheet. Each time I update the website, a Python script takes the spreadsheet and updates the JSON file with the latest additions."
	const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(title)}`

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

<div class="section">
    <PageTitle title="Books">
    </PageTitle>
    <p class="pb-4">{description}</p>
    <p class="pb-4">
        So far, I've read a total of <b>{copiedBooks.filter(book => book['Exclusive Shelf'] === "read").length}</b> books.
    </p>
    <p>Some facts about these books:</p>
    <ul class="list-disc pl-6">
        <!-- Percentage of books that are fiction -->
        <li>There are <b>{copiedBooks.filter(book => book["Exclusive Shelf"] === "to-read").length}</b> books on <a href="/books?sort=Newest&score=All%20scores&status=to-read" class="anchor" target="_self">my wishlist</a>, which is <b>{Math.round(copiedBooks.filter(book => book["Exclusive Shelf"] === "to-read").length / copiedBooks.length * 100)}%</b> of the total.</li>
        <!-- The book with the earliest data published -->
        <li>The oldest book is <b>{copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0].Title}</b>, published in <b>{copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year'] < 0 ? Math.abs(copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year']) + " BC" : copiedBooks.sort((a, b) => a['Original Publication Year'] - b['Original Publication Year'])[0]['Original Publication Year']}</b>.</li>
        <!-- The most frequently occurring rating -->
        <li>The most frequently occurring rating is <b>{copiedBooks.map(book => book['My Rating']).reduce((a, b) => a > b ? a : b)}</b>, which occurs <b>{copiedBooks.filter(book => book['My Rating'] === copiedBooks.map(book => book['My Rating']).reduce((a, b) => a > b ? a : b)).length}</b> times.</li>
    </ul>
</div>
<div class="mt-12 mx-auto px-0 sm:px-6 lg:px-16 ">
    <!-- Updated Filters component -->
    <Filters {score} {sort} {status} on:optionSelected="{onOptionSelected}" on:scoreSelected="{onScoreSelected}" on:categorySelected="{onCategorySelected}" />
</div>

<div class="section">
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {#each books as book}
            <Book {book} />
        {/each}
    </div>
</div>