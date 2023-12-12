<script>
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/js/click_outside.js';
	import { createEventDispatcher } from 'svelte';

	// <!-- @@@@@@@@@ 1 @@@@@@@@@@@-->

	const dispatch = createEventDispatcher();

	$: options = ['Highest', 'Lowest', 'Oldest', 'Newest', 'Title A-Z', 'Title Z-A'];
	let selectedOption = 'Newest';

	onMount(() => {
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

	onMount(() => {
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

	onMount(() => {
		dispatch('categoryOptionSelected', { selectedCategoryOption });
	});

	function handleCategorySelection(option) {
		selectedCategoryOption = option;
		dispatch('categorySelected', { selectedCategoryOption });
		isCategoryOpen = false;
	}
	// <!-- @@@@@@@@@ 3 @@@@@@@@@@@-->
</script>

<!-- Filters -->
<section aria-labelledby="filter-heading">
	<h2 id="filter-heading" class="sr-only">Filters</h2>
        <!-- Rectangular box div -->
		<div
			class="relative p-4 grid grid-cols-1 sm:grid-cols-2 justify-between items-center border border-surface-300-600-token rounded-container bg-surface-100-800-token"
			use:clickOutside
			on:outclick={() => {
				isSortOpen = false;
                isCategoryOpen = false;
                isScoreOpen = false;
			}}
		>
            <!-- Active filters -->
            <div class="w-full order-2 md:order-1">
                <div class="flex flex-wrap items-center justify-start sm:justify-end gap-y-2 w-full pt-4 sm:pt-0">
                        <!-- Sort option-->
                        <div class="">
                            <div class="flex flex-wrap items-center w-fit">
                                <span
                                    class="inline-flex px-3 py-2 items-center transition-colors text-token border border-surface-200-700-token bg-surface-100-800-token"
                                >
                                    <span>{selectedOption}</span>
                                </span>
                            </div>
                        </div>
                        <!-- END of sort option -->
                    {#if selectedScoreOption !== 'All scores'}
                        <div class="ml-2">
                            <div class="flex flex-wrap items-center">
                                <span
                                    class="inline-flex px-3 py-2 items-center transition-colors text-token border border-surface-200-700-token bg-surface-100-800-token"
                                >
                                    <span>{selectedScoreOption}</span>
                                    <button
                                        type="button"
                                        class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                        on:click={() => handleScoreSelection('All scores')}
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
                    {#if selectedCategoryOption !== 'All categories'}
                        <div class="ml-2">
                            <div class="flex flex-wrap items-center">
                                <span
                                    class="inline-flex px-3 py-2 items-center transition-colors text-token border border-surface-200-700-token bg-surface-100-800-token"
                                >
                                    <span>{selectedCategoryOption}</span>
                                    <button
                                        type="button"
                                        class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                        on:click={() => handleCategorySelection('All categories')}
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
            
            <!-- Div with all 3 filters -->
			<div class="w-full flex items-center sm:justify-start gap-x-4 justify-start flex-wrap gap-y-2 rounded-container">
                <!-- @@@@@@@@@ 1 @@@@@@@@@@@-->
				<div class="relative text-left">
					<div class="">
						<button
							type="button"
							class="button z-30"
							id="menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={() => (isSortOpen = !isSortOpen)}
						>
							Sort
							<svg
								class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isSortOpen
									? 'rotate-180'
									: 'rotate-0'} transition-transform duration-200 translate-y-1"
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
							class="absolute left-0 mt-2 w-fit h-auto focus:outline-none bg-surface-50-900-token border border-surface-900-50-token z-40 rounded-container"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<div class="w-full h-full flex flex-col gap-2 p-2" role="none">
								{#each options as option, i}
									<button
										class="{selectedOption === option
											? 'text-surface-50-900-token bg-surface-700-200-token'
											: 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-container bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
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
				<div
					class="relative bg-transparent"
					use:clickOutside
					on:outclick={() => {
						isScoreOpen = false;
					}}
				>
					<button
						type="button"
						class="button z-30"
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
							class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isScoreOpen
								? 'rotate-180'
								: 'rotate-0'} transition-transform duration-200 translate-y-1"
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

					{#if isScoreOpen}
						<div
							class="absolute left-0 mt-2 w-fit h-auto focus:outline-none bg-surface-50-900-token border border-surface-900-50-token z-40"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<form class="w-full h-full flex flex-col gap-2 p-2">
								{#each scoreOptions as option, i}
									<button
										class="{selectedScoreOption === option
											? 'text-surface-50-900-token bg-surface-700-200-token'
											: 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-none bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
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
				<div
					class="relative bg-transparent"
					use:clickOutside
					on:outclick={() => {
						isCategoryOpen = false;
					}}
				>
					<button
						type="button"
						class="button z-30"
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
							class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-surface-700-200-token {isCategoryOpen
								? 'rotate-180'
								: 'rotate-0'} transition-transform duration-200 translate-y-1"
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
							class="absolute left-0 sm:right-0 mt-2 w-[200%] h-auto focus:outline-none bg-surface-50-900-token border border-surface-900-50-token z-40"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<form class="w-full h-fit flex flex-col gap-2 p-2">
								{#each categoryOptions as option, i}
									<button
										class="{selectedCategoryOption === option
											? 'text-surface-50-900-token bg-surface-700-200-token'
											: 'text-surface-900-50 border-surface-900-50-token bg-surface-50-900-token'} cursor-pointer duration-[200ms] border border-surface-900-50-token rounded-none bg-surface-50-900-token transition-colors hover:bg-surface-900-50-token hover:text-surface-50-900-token whitespace-nowrap p-2 w-full"
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
			</div>
		</div>
</section>