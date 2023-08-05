
<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import Filters from '$lib/components/Filters.svelte';
    import { onMount } from 'svelte';
    export let data;
    let sort = "Newest";
    let score = "All scores";
    let category = "All categories";  // New state for category
    let books = data.books;

    function formatDate(dateStr) {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

	// handle the 'selected' event dispatched from Filters.svelte
    function onOptionSelected(event) {
        sort = event.detail.selectedOption;
        sortBooks();
    }

    function onScoreSelected(event) {
        score = event.detail.selectedScoreOption
        filterScoreBooks();
    }

    // New function to handle category selection
    function onCategorySelected(event) {
        category = event.detail.selectedCategoryOption;
        filterCategoryBooks();  // You'll need to implement this function
    }

    // Sort the books array based on the selected option for options = ['Best Rating', 'Worst Rating', 'Oldest', 'Newest'], where rating is books[]
    function sortBooks() {
        if (sort === "Newest") {
            books = [...books.sort((a, b) => new Date(b['Date Finished']) - new Date(a['Date Finished']))];
        } else if (sort === "Oldest") {
            books = [...books.sort((a, b) => new Date(a['Date Finished']) - new Date(b['Date Finished']))];
        } else if (sort === "Highest") {
            books = [...books.sort((a, b) => b['Score (0-10)'] - a['Score (0-10)'])];
        } else if (sort === "Lowest") {
            books = [...books.sort((a, b) => a['Score (0-10)'] - b['Score (0-10)'])];
        } else if (sort === "Title A-Z") {
            books = [...books.sort((a, b) => {
                if (typeof a.Title !== 'string' && typeof b.Title !== 'string') return 0;
                if (typeof a.Title !== 'string') return -1;
                if (typeof b.Title !== 'string') return 1;
                return a.Title.replace(/^[^\da-z]+/i, "").localeCompare(b.Title.replace(/^[^\da-z]+/i, ""));
            })];
        } else if (sort === "Title Z-A") {
            books = [...books.sort((a, b) => {
                if (typeof a.Title !== 'string' && typeof b.Title !== 'string') return 0;
                if (typeof a.Title !== 'string') return -1;
                if (typeof b.Title !== 'string') return 1;
                return b.Title.replace(/^[^\da-z]+/i, "").localeCompare(a.Title.replace(/^[^\da-z]+/i, ""));
            })];
        }
    }

    // Create filterScoreBooks for $: scoreOptions = ['All scores', '> 4', '> 5', '> 6', '> 7', '> 8', '> 9'];
    function filterScoreBooks() {
        if (score === "All scores") {
            books = [...data.books];
        } else if (score === "> 4") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 4)];
        } else if (score === "> 5") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 5)];
        } else if (score === "> 6") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 6)];
        } else if (score === "> 7") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 7)];
        } else if (score === "> 8") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 8)];
        } else if (score === "> 9") {
            books = [...data.books.filter(book => book['Score (0-10)'] > 9)];
        }
    }

    // Create filterCategoryBooks for $: categoryOptions = ['Fiction', 'Nonfiction', 'Unknown'];
    function filterCategoryBooks() {
        if (category === "All categories") {
            books = [...data.books];
        } else if (category === "Fiction") {
            books = [...data.books.filter(book => book.Category === "Fiction")];
        } else if (category === "Nonfiction") {
            books = [...data.books.filter(book => book.Category === "Nonfiction")];
        } else if (category === "Unknown") {
            books = [...data.books.filter(book => book.Category === "Unknown")];
        }
    }
    
    onMount(() => {
        sortBooks();
        filterScoreBooks()
        filterCategoryBooks()
    });
</script>

<div class="section">
    <PageTitle title="Books">
        <p class="uppercase mb-2 text-surface-400">Collection</p>
    </PageTitle>
    <div class="section !mt-0">
    <!-- Updated Filters component -->
    <Filters on:optionSelected="{onOptionSelected}" on:scoreSelected="{onScoreSelected}" on:categorySelected="{onCategorySelected}" />
    </div>
    <div class="grid grid-cols-2 gap-6 section">
        {#each books as book}
            <div class="flex flex-col bg-transparent overflow-hidden border justify-between border-surface-900-50-token">
                <div class="flex justify-between p-6 sm:p-8">
                    <span class="">{book['Date Finished'] ? formatDate(book['Date Finished']) : ""}</span>
                    <span class="">{book['Score (0-10)']}/10</span>
                </div>
                <hr class="border border-surface-900-50-token">
                <div class="p-6 sm:p-8">
                    <h2 class="text-lg ">{book.Title ? book.Title : ""}</h2>
                    {#if book.Subtitle}
                        <h3 class="">{book.Subtitle ? book.Subtitle : ""}</h3>
                    {/if}
                    <span class="">{book.Author}</span>
                </div>
                <div class="px-6 py-4 space-y-2">
                    <p>{book.Notes ? book.Notes : ""}</p>
                </div>
                <div class="px-6 py-4 flex items-center justify-between"> 
                    <span class="social">
                        {book.Category}
                    </span>
                    <span class="items-center inline-flex py-[0.05rem] px-2 rounded-full text-xs font-medium bg-surface-600-300-token text-surface-50-900-token">
                        {#if book.ISBN}
                            {book.ISBN}
                        {:else}
                            No ISBN
                        {/if}
                    </span>
                </div>
            </div>
        {/each}
    </div>
</div>