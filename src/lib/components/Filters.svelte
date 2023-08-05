<script>
    import { onMount } from 'svelte';
    import { clickOutside } from '$lib/js/click_outside.js';
    import { createEventDispatcher } from 'svelte';

	// <!-- @@@@@@@@@ 1 @@@@@@@@@@@-->


    const dispatch = createEventDispatcher();

    $: options = ['Highest', 'Lowest', 'Oldest', 'Newest', 'Title A-Z', 'Title Z-A'];
    let selectedOption = 'Newest';

    onMount (() => {
        dispatch('optionSelected', { selectedOption });
    });

    function handleSelection(option) {
        selectedOption = option;
        dispatch('optionSelected', { selectedOption });
        isSortOpen = false;
    }

    let isSortOpen = false;
	// <!-- @@@@@@@@@ 1 @@@@@@@@@@@-->

	// <!-- @@@@@@@@@ 2 @@@@@@@@@@@-->
    let isScoreOpen = false;
    $: scoreOptions = ['All scores', '> 4', '> 5', '> 6', '> 7', '> 8', '> 9'];
    let selectedScoreOption = 'All scores';

    onMount (() => {
        dispatch('scoreOptionSelected', { selectedScoreOption });
    });

    function handleScoreSelection(option) {
        selectedScoreOption = option;
        dispatch('scoreSelected', { selectedScoreOption });
        isScoreOpen = false;
    }
	// <!-- @@@@@@@@@ 2 @@@@@@@@@@@-->

    // <!-- @@@@@@@@@ 3 @@@@@@@@@@@-->
    let isCategoryOpen = false;
    $: categoryOptions = ['Fiction', 'Nonfiction', 'Unknown', 'All categories'];
    let selectedCategoryOption = 'All categories';

    onMount (() => {
        dispatch('categoryOptionSelected', { selectedCategoryOption });
    });

    function handleCategorySelection(option) {
        selectedCategoryOption = option;
        dispatch('categorySelected', { selectedCategoryOption });
        isCategoryOpen = false;
    }
    // <!-- @@@@@@@@@ 3 @@@@@@@@@@@-->

</script>

<div class="bg-white">
	<!--
      Mobile filter dialog
  
      Off-canvas filters for mobile, show/hide based on off-canvas filters state.
    -->
	<div class="fixed inset-0 flex z-40 sm:hidden" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
		<div
			class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
		>
			<div class="px-4 flex items-center justify-between">
				<h2 class="text-lg font-medium text-gray-900">Filters</h2>
				<button
					type="button"
					class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
				>
					<span class="sr-only">Close menu</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Filters -->
			<form class="mt-4">
				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<!-- Expand/collapse section button -->
						<button
							type="button"
							class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
							aria-controls="filter-section-0"
							aria-expanded="false"
						>
							<span class="font-medium text-gray-900"> Category </span>
							<span class="ml-6 flex items-center">
								<svg
									class="rotate-0 h-5 w-5 transform"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</button>
					</h3>
					<!-- Filter section, show/hide based on section state. -->
					<div class="pt-6" id="filter-section-0">
						<div class="space-y-6">
							<div class="flex items-center">
								<input
									id="filter-mobile-category-0"
									name="category[]"
									value="new-arrivals"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-category-0" class="ml-3 text-sm text-gray-500">
									All New Arrivals
								</label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-category-1"
									name="category[]"
									value="tees"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-category-1" class="ml-3 text-sm text-gray-500">
									Tees
								</label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-category-2"
									name="category[]"
									value="objects"
									type="checkbox"
									checked
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-category-2" class="ml-3 text-sm text-gray-500">
									Objects
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<!-- Expand/collapse section button -->
						<button
							type="button"
							class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
							aria-controls="filter-section-1"
							aria-expanded="false"
						>
							<span class="font-medium text-gray-900"> Color </span>
							<span class="ml-6 flex items-center">
								<!--
                    Expand/collapse icon, toggle classes based on section open state.
  
                    Heroicon name: solid/chevron-down
  
                    Open: "-rotate-180", Closed: "rotate-0"
                  -->
								<svg
									class="rotate-0 h-5 w-5 transform"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</button>
					</h3>
					<!-- Filter section, show/hide based on section state. -->
					<div class="pt-6" id="filter-section-1">
						<div class="space-y-6">
							<div class="flex items-center">
								<input
									id="filter-mobile-color-0"
									name="color[]"
									value="white"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-color-0" class="ml-3 text-sm text-gray-500">
									White
								</label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-color-1"
									name="color[]"
									value="beige"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-color-1" class="ml-3 text-sm text-gray-500">
									Beige
								</label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-color-2"
									name="color[]"
									value="blue"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-color-2" class="ml-3 text-sm text-gray-500"> Blue </label>
							</div>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-200 px-4 py-6">
					<h3 class="-mx-2 -my-3 flow-root">
						<!-- Expand/collapse section button -->
						<button
							type="button"
							class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400"
							aria-controls="filter-section-2"
							aria-expanded="false"
						>
							<span class="font-medium text-gray-900"> Sizes </span>
							<span class="ml-6 flex items-center">
								<!--
                    Expand/collapse icon, toggle classes based on section open state.
  
                    Heroicon name: solid/chevron-down
  
                    Open: "-rotate-180", Closed: "rotate-0"
                  -->
								<svg
									class="rotate-0 h-5 w-5 transform"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</button>
					</h3>
					<!-- Filter section, show/hide based on section state. -->
					<div class="pt-6" id="filter-section-2">
						<div class="space-y-6">
							<div class="flex items-center">
								<input
									id="filter-mobile-sizes-0"
									name="sizes[]"
									value="s"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-sizes-0" class="ml-3 text-sm text-gray-500"> S </label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-sizes-1"
									name="sizes[]"
									value="m"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-sizes-1" class="ml-3 text-sm text-gray-500"> M </label>
							</div>

							<div class="flex items-center">
								<input
									id="filter-mobile-sizes-2"
									name="sizes[]"
									value="l"
									type="checkbox"
									class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
								/>
								<label for="filter-mobile-sizes-2" class="ml-3 text-sm text-gray-500"> L </label>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

	<!-- Filters -->
	<section aria-labelledby="filter-heading justify-between">
		<h2 id="filter-heading" class="sr-only">Filters</h2>

		<!-- @@@@@@@@@ 1 @@@@@@@@@@@-->
		<div class="relative z-10 bg-transparent border border-surface-900-50-token p-4 flex flex-row justify-between items-center"
        use:clickOutside on:outclick={() => { isSortOpen = false; }}

            use:clickOutside on:outclick={() => { isSortOpen = false; }}
        >
            <div>

            </div>
			<div class="mx-auto flex items-center justify-start gap-x-4">
				<div class="relative text-left">
					<div class="button">
						<button
							type="button"
							class="group inline-flex justify-center items-center text-md  text-surface-900-50-token"
							id="menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={() => (isSortOpen = !isSortOpen)}
						>
							Sort
							<svg
								class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isSortOpen ? "rotate-180" : "rotate-0" } transition-transform duration-200"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
					{#if isSortOpen}
                        <div
                            class="absolute left-0 mt-2 w-[200%] h-fit focus:outline-none bg-surface-50-900-token border border-surface-900-50-token"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabindex="-1"
                        >
                            <div class="w-full h-full flex flex-col gap-2 p-2" role="none">
                                {#each options as option, i}
                                    <button
                                        class="{selectedOption === option ? 'text-surface-50-900-token bg-surface-700-200-token' : 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-none bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
                                        role="menuitem"
                                        tabindex="-1"
                                        id={`menu-item-${i}`}
                                        on:click={() => handleSelection(option)}
                                    >
                                        <div class="">{option}</div>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
				<!-- @@@@@@@@@ 1 @@@@@@@@@@@-->

                <!-- @@@@@@@@@@@@@@@@@@@ 2 -->
                <div class="relative z-10 bg-transparent"
                use:clickOutside on:outclick={() => { isScoreOpen = false; }}
            >								
            <button
                    type="button"
                    class="button"									
                    aria-expanded="false"
                    on:click={() => {
                        isScoreOpen = !isScoreOpen;
                        if (isScoreOpen) {
                            isSortOpen = false;
                            isCategoryOpen = false;
                        }
                    }}
                    
                >
                    <span>Rating</span>
                    <!-- Heroicon name: solid/chevron-down -->
                    <svg
                        class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isScoreOpen ? "rotate-180" : "rotate-0" } transition-transform duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>

                        <!--
                        'Sizes' dropdown, show/hide based on dropdown state.
    
                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    -->
                    {#if isScoreOpen}
                        <div
                            class="absolute left-0 mt-2 w-[200%] h-fit focus:outline-none bg-surface-50-900-token border border-surface-900-50-token"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabindex="-1"
                        >
                    <form class="w-full h-full flex flex-col gap-2 p-2">
                        {#each scoreOptions as option, i}
                            <button
                                class="{selectedScoreOption === option ? 'text-surface-50-900-token bg-surface-700-200-token' : 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-none bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
                                role="menuitem"
                                tabindex="-1"
                                id={`menu-item-${i}`}
                                on:click={() => handleScoreSelection(option)}
                            >
                                <div class="">{option}</div>
                            </button>
                        {/each}
                    </form>
                </div>
                {/if}
            </div>
            <!-- @@@@@@@@@@@@@@@@@@@ 2 -->
            
            <!-- @@@@@@@@@@@@@@@@@@@ 3 -->
            <div class="relative z-10 bg-transparent"
                use:clickOutside on:outclick={() => { isCategoryOpen = false; }}
            >								
            <button
                type="button"
                class="button"									
                aria-expanded="false"
                on:click={() => {
                    isCategoryOpen = !isCategoryOpen;
                    if (isCategoryOpen) {
                        isSortOpen = false;
                        isScoreOpen = false;
                    }
                }}
            >
                <span>Category</span>
                <!-- Heroicon name: solid/chevron-down -->
                <svg
                    class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isCategoryOpen ? 'rotate-180' : 'rotate-0' } transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>

            {#if isCategoryOpen}
                <div
                    class="absolute left-0 mt-2 w-[200%] h-fit focus:outline-none bg-surface-50-900-token border border-surface-900-50-token"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                >
                    <form class="w-full h-full flex flex-col gap-2 p-2">
                        {#each categoryOptions as option, i}
                            <button
                                class="{selectedCategoryOption === option ? 'text-surface-50-900-token bg-surface-700-200-token' : 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-none bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
                                role="menuitem"
                                tabindex="-1"
                                id={`menu-item-${i}`}
                                on:click={() => handleCategorySelection(option)}
                            >
                                <div class="">{option}</div>
                            </button>
                        {/each}
                    </form>
                </div>
            {/if}
            </div>
            <!-- @@@@@@@@@@@@@@@@@@@ 3 -->

				<!-- Mobile filter dialog toggle, controls the 'mobileFiltersOpen' state. -->
				<button
					type="button"
					class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
					>Filters</button
				>

			</div>
                        

        <!-- Active filters -->
        <div class="self-center flex w-full justify-end">
            <div class="max-w-7xl sm:flex sm:items-center sm:px-6 lg:px-8">
                {#if selectedOption !== "Newest"}
                    <div class="mt-2 sm:mt-0 sm:ml-4">
                        <div class="-m-1 flex flex-wrap items-center">
                            <span class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                                <span>{selectedOption}</span>
                                <button type="button" class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                    on:click={() => handleSelection("Newest")}
                                >
                                    <span class="sr-only">Remove filter for Sort</span>
                                    <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                {/if}
                {#if selectedScoreOption !== "All scores"}
                    <div class="mt-2 sm:mt-0 sm:ml-4">
                        <div class="-m-1 flex flex-wrap items-center">
                        <span class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                            <span>{selectedScoreOption}</span>
                            <button type="button" class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                            on:click={() => handleScoreSelection("All scores")}
                            >
                            <span class="sr-only">Remove filter for Objects</span>
                                <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>
                        </div>
                    </div>
                {/if}
                {#if selectedCategoryOption !== "All categories"}
                <div class="mt-2 sm:mt-0 sm:ml-4">
                    <div class="-m-1 flex flex-wrap items-center">
                        <span class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                            <span>{selectedCategoryOption}</span>
                            <button type="button" class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                on:click={() => handleCategorySelection("All categories")}
                            >
                                <span class="sr-only">Remove filter for Category</span>
                                <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
                {/if}
            </div>
        </div>      
	</section>
</div>
