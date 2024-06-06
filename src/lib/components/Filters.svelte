<script>
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/js/click_outside.js';
	import { createEventDispatcher } from 'svelte';
	export let score, status, sort

	// <!-- @@@@@@@@@ 1 @@@@@@@@@@@-->

	const dispatch = createEventDispatcher();

	$: options = ['Highest', 'Lowest', 'Oldest', 'Newest', 'Title A-Z', 'Title Z-A'];
	$: selectedOption = sort ? sort : 'Newest';

	onMount(() => {
		dispatch('optionSelected', { selectedOption });
	});

	function handleSelection(option) {
		selectedOption = option;
		dispatch('optionSelected', { selectedOption });
		isSortOpen = false;
	}

	let isSortOpen = false;

	// <!-- @@@@@@@@@ 2 @@@@@@@@@@@-->
	let isScoreOpen = false;
	$: scoreOptions = ['All scores', '> 1', '> 2', '> 3', '> 4'];
	$: selectedScoreOption = score ? score : 'All scores';

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
	$: categoryOptions = ['Finished', 'Reading now', 'On wishlist', 'All'];
	$: selectedCategoryOption = status ? status === 'read' ? 'Finished' : status === 'currently-reading' ? 'Reading now' : status === 'to-read' ? 'On wishlist' : 'All' : 'All';

	onMount(() => {
		dispatch('categoryOptionSelected', { selectedCategoryOption });
	});

	function handleCategorySelection(option) {
		if (option === 'Finished' || option === 'read')
			selectedCategoryOption = 'Finished'
		else if (option === 'Reading now' || option === 'currently-reading')
			selectedCategoryOption = 'Reading now'
		else if (option === 'On wishlist' || option === 'to-read')
			selectedCategoryOption = 'On wishlist'
		else 
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
			class="card-shimmer relative px-6 sm:px-4 p-4 grid grid-cols-1 sm:grid-cols-2 justify-between items-center border-b border-t sm:border border-surface-200-700-token shadow-sm rounded-none sm:rounded-container bg-surface-100-800-token"
			use:clickOutside
			on:outclick={() => {
				isSortOpen = false;
                isCategoryOpen = false;
                isScoreOpen = false;
			}}
		>
            <!-- Active filters -->
            <div class="w-full order-2 md:order-1 text-sm flex content-center h-full">
                <div class="flex flex-wrap items-center justify-start sm:justify-end gap-y-2 w-full pt-4 sm:pt-0">
                        <!-- Sort option-->
                        <div class="">
                            <div class="flex flex-wrap items-center w-fit">
                                <span
                                    class="inline-flex px-3 py-1 items-center transition-colors text-token border border-surface-200-700-token rounded-full"
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
                                    class="rounded-full inline-flex px-3 py-1 items-center transition-colors text-token border border-surface-200-700-token"
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
                    {#if selectedCategoryOption !== 'All'}
                        <div class="ml-2">
                            <div class="flex flex-wrap items-center">
                                <span
                                    class="rounded-full inline-flex px-3 py-1 items-center transition-colors text-token border border-surface-200-700-token"
                                >
									<span>{selectedCategoryOption}</span>
                                    <button
                                        type="button"
                                        class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                        on:click={() => handleCategorySelection('All')}
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
			<div class="w-full flex items-center sm:justify-start justify-start gap-y-2 flex-nowrap">
                <!-- @@@@@@@@@ Sort @@@@@@@@@@@-->
				<div class="relative text-left">
					<div class="">
						<button
							type="button"
							class="cursor-pointer duration-[200ms] border-l border-t border-b border-surface-300-600-token rounded-l-container bg-surface-100-800-token transition-colors flex justify-start bg-surface-hover-token h-fit p-2 z-30"
							id="menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={() => (isSortOpen = !isSortOpen)}
						>
							Sort
							<svg
								class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 {isSortOpen
									? 'rotate-180'
									: 'rotate-0'} transition-transform duration-200 translate-y-2"
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
							class="absolute left-0 mt-3 w-fit h-auto focus:outline-none bg-surface-100-800-token border border-surface-200-700-token z-40 rounded-container py-2"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<div class="w-full h-full flex flex-col" role="none">
								{#each options as option, i}
									<button
										class="{selectedOption === option
											? 'bg-secondary-500-400-token'
											: 'text-surface-900-50'} text-sm cursor-pointer duration-[200ms] border-t {i === options.length - 1 ? "border-b" : ""} border-surface-200-700-token transition-colors hover:bg-surface-200-700-token whitespace-nowrap p-2 px-4 w-full"
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

				<!-- @@@@@@@@@ Rating @@@@@@@@@@@-->
				<div
					class="relative bg-transparent"
					use:clickOutside
					on:outclick={() => {
						isScoreOpen = false;
					}}
				>
					<button
						type="button"
						class="cursor-pointer duration-[200ms] border-t border-b border-l border-surface-300-600-token bg-surface-100-800-token transition-colors flex justify-start bg-surface-hover-token h-fit p-2 z-30"
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
							class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 {isScoreOpen
								? 'rotate-180'
								: 'rotate-0'} transition-transform duration-200 translate-y-2"
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
							class="absolute left-0 mt-3 w-fit h-auto focus:outline-none bg-surface-100-800-token border border-surface-200-700-token z-40 rounded-container py-2"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<form class="w-full h-full flex flex-col">
								{#each scoreOptions as option, i}
									<button
										class="{selectedScoreOption === option
											? 'bg-secondary-500-400-token'
											: 'text-surface-900-50'} text-sm cursor-pointer duration-[200ms] border-t {i === options.length - 1 ? "border-b" : ""} border-surface-200-700-token transition-colors hover:bg-surface-200-700-token whitespace-nowrap p-2 px-4 w-full"
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

				<!-- @@@@@@@@@ Status @@@@@@@@@@@-->
				<div
					class="relative bg-transparent"
					use:clickOutside
					on:outclick={() => {
						isCategoryOpen = false;
					}}
				>
					<button
						type="button"
						class="cursor-pointer relative duration-[200ms] border border-surface-300-600-token rounded-r-container bg-surface-100-800-token transition-colors flex justify-start bg-surface-hover-token h-fit p-2 z-30"
						aria-expanded="false"
						on:click={() => {
							isCategoryOpen = !isCategoryOpen;
							if (isCategoryOpen) {
								isSortOpen = false;
								isScoreOpen = false;
							}
						}}
					>
						<span>Status</span>
						<!-- Heroicon name: solid/chevron-down -->
						<svg
							class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 {isCategoryOpen
								? 'rotate-180'
								: 'rotate-0'} transition-transform duration-200 translate-y-2"
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
							class="absolute sm:left-0 right-0 mt-3 w-[200%] h-auto focus:outline-none bg-surface-100-800-token border border-surface-200-700-token z-40 rounded-container py-2"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<form class="w-full h-fit flex flex-col">
								{#each categoryOptions as option, i}
									<button
									class="{selectedCategoryOption === option
										? 'bg-secondary-500-400-token'
										: 'text-surface-900-50'} text-sm cursor-pointer duration-[200ms] border-t {i === options.length - 1 ? "border-b" : ""} border-surface-200-700-token transition-colors hover:bg-surface-200-700-token whitespace-nowrap p-2 px-4 w-full"
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
			</div>
		</div>
</section>