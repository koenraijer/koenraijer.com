
<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import Filters from '$lib/components/Filters.svelte';
    import Book from '$lib/components/Book.svelte';
    import * as info from '$lib/js/info.js';
    import { onMount } from 'svelte';
    export let data;
    let sort = "Newest";
    let score = "All scores";
    let category = "All categories";  // New state for category
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
        filterBooks()
    }

    // New function to handle category selection
    function onCategorySelected(event) {
        category = event.detail.selectedCategoryOption;
        filterBooks()
    }


    function filterBooks() {
        // Start with the original dataset
        let filteredBooks = [...data.books];

        // Filter by score
        if (score !== "All scores") {
            const scoreValue = parseInt(score.split(' ')[1], 10);
            filteredBooks = filteredBooks.filter(book => book['Score (0-10)'] > scoreValue);
        }

        // Filter by category
        if (category !== "All categories") {
            filteredBooks = filteredBooks.filter(book => book.Category === category);
        }

        // Sort the filtered books
        if (sort === "Newest") {
            filteredBooks.sort((a, b) => new Date(b['Date Finished']) - new Date(a['Date Finished']));
        } else if (sort === "Oldest") {
            filteredBooks.sort((a, b) => new Date(a['Date Finished']) - new Date(b['Date Finished']));
        } else if (sort === "Highest") {
            filteredBooks.sort((a, b) => b['Score (0-10)'] - a['Score (0-10)']);
        } else if (sort === "Lowest") {
            filteredBooks.sort((a, b) => a['Score (0-10)'] - b['Score (0-10)']);
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
        }

        // Assign the sorted and filtered array to books variable
        books = filteredBooks;
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
    <PageTitle title="Library">
    </PageTitle>
    <p class="pb-4">{description}</p>
    <p class="pb-4">
        So far, I've read a total of <b>{copiedBooks.length}</b> books.
    </p>
    <p>Some facts about these books:</p>
    <ul class="list-disc pl-6">
        <!-- Percentage of books that are fiction -->
        <li>There are <b>{copiedBooks.filter(book => book.Category === "Fiction").length}</b> works of fiction, which is <b>{Math.round(copiedBooks.filter(book => book.Category === "Fiction").length / copiedBooks.length * 100)}%</b> of the total.</li>
        <!-- The book with the earliest data published -->
        <li>The oldest book is <b>{copiedBooks.sort((a, b) => a['Date Published'] - b['Date Published'])[0].Title}</b>, published in <b>{copiedBooks.sort((a, b) => a['Date Published'] - b['Date Published'])[0]['Date Published'] < 0 ? Math.abs(copiedBooks.sort((a, b) => a['Date Published'] - b['Date Published'])[0]['Date Published']) + " BC" : copiedBooks.sort((a, b) => a['Date Published'] - b['Date Published'])[0]['Date Published']}</b>.</li>
        <!-- The most frequently occurring rating -->
        <li>The most frequently occurring rating is <b>{copiedBooks.map(book => book['Score (0-10)']).reduce((a, b) => a > b ? a : b)}</b>, which occurs <b>{copiedBooks.filter(book => book['Score (0-10)'] === copiedBooks.map(book => book['Score (0-10)']).reduce((a, b) => a > b ? a : b)).length}</b> times.</li>
    </ul>
    
    <div class="mt-8 sm:mt-12">
        <!-- Updated Filters component -->
        <Filters on:optionSelected="{onOptionSelected}" on:scoreSelected="{onScoreSelected}" on:categorySelected="{onCategorySelected}" />
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {#each books as book}
            <Book {book} />
        {/each}
    </div>
</div>