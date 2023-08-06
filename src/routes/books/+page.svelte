
<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import Filters from '$lib/components/Filters.svelte';
    import Book from '$lib/components/Book.svelte';
    import { onMount } from 'svelte';
    export let data;
    let sort = "Newest";
    let score = "All scores";
    let category = "All categories";  // New state for category
    let books = data.books;

    $: console.log(books)
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
</script>

<div class="section">
    <PageTitle title="Books">
        <p class="uppercase mb-2 text-surface-400">Collection</p>
    </PageTitle>
    <p class="pb-4">Most of the books I've read since 2013.</p>
    <div class="!mt-0">
    <!-- Updated Filters component -->
    <Filters on:optionSelected="{onOptionSelected}" on:scoreSelected="{onScoreSelected}" on:categorySelected="{onCategorySelected}" />
    </div>
    <div class="grid sm:grid-cols-2 gap-6 mt-6">
        {#each books as book}
            <Book {book} />
        {/each}
    </div>
</div>