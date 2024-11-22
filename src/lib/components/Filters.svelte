<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as DropdownMenu from "$lib/shadcn/ui/dropdown-menu";
    import { MoreVertical, ArrowUpDown, Star, BookOpen, Check } from 'lucide-svelte';
    import { Motion } from "svelte-motion";
    
    export let score, status, sort;
    const dispatch = createEventDispatcher();

    let isOpen = false;

    // Sort options
    const sortOptions = [
        { group: 'By score', items: ['Highest', 'Lowest'] },
        { group: 'By date', items: ['Newest', 'Oldest'] },
        { group: 'By title', items: ['Title A-Z', 'Title Z-A'] }
    ];
    $: selectedSort = sort || 'Newest';

    // Score options
    const scoreOptions = ['All scores', '> 1', '> 2', '> 3', '> 4'];
    $: selectedScore = score || 'All scores';

    // Status options
    const statusOptions = ['All', 'Finished', 'Reading now', 'On wishlist'];
    $: selectedStatus = status === 'read' ? 'Finished' 
        : status === 'currently-reading' ? 'Reading now' 
        : status === 'to-read' ? 'On wishlist' 
        : 'All';

    // Handler functions
    function handleSortSelect(option) {
        selectedSort = option;
        dispatch('optionSelected', { selectedOption: option });
    }

    function handleScoreSelect(option) {
        selectedScore = option;
        dispatch('scoreSelected', { selectedScoreOption: option });
    }

    function handleStatusSelect(option) {
        selectedStatus = option;
        dispatch('categorySelected', { selectedCategoryOption: option });
    }

	const rotateVariants = {
        open: { rotate: 720 }, // Two full rotations
        closed: { rotate: 0 }
    };

    function handleOpenChange(event) {
        isOpen = event.detail;
    }

    onMount(() => {
        dispatch('optionSelected', { selectedOption: selectedSort });
        dispatch('scoreSelected', { selectedScoreOption: selectedScore });
        dispatch('categorySelected', { selectedCategoryOption: selectedStatus });
    });
</script>

<!-- Floating Menu Button -->
<DropdownMenu.Root 
	bind:open={isOpen}
	on:openChange={handleOpenChange}
>
	<DropdownMenu.Trigger class="rounded-full p-2 bg-background/80 backdrop-blur-sm border border-muted-foreground/10 hover:border-muted-foreground/20 transition-colors">
		<Motion 
			animate={isOpen ? 'open' : 'closed'} 
			variants={rotateVariants}
			transition={{ duration: 0.6, ease: "easeOut" }}
			let:motion
		>
			<div use:motion>
				<MoreVertical class="w-5 h-5" />
			</div>
		</Motion>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Filters</DropdownMenu.Label>
		<DropdownMenu.Separator />

		<!-- Sort Sub-Menu -->
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger class="flex items-center gap-2">
				<ArrowUpDown class="w-4 h-4" />
				<span>Sort: {selectedSort}</span>
			</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				{#each sortOptions as group}
					<DropdownMenu.Group>
						<DropdownMenu.Label>{group.group}</DropdownMenu.Label>
						{#each group.items as option}
							<DropdownMenu.Item 
								on:click={() => handleSortSelect(option)}
								class="flex items-center justify-between"
							>
								{option}
								{#if selectedSort === option}
									<Check class="w-4 h-4" />
								{/if}
							</DropdownMenu.Item>
						{/each}
						<DropdownMenu.Separator />
					</DropdownMenu.Group>
				{/each}
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>

		<!-- Rating Sub-Menu -->
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger class="flex items-center gap-2">
				<Star class="w-4 h-4" />
				<span>Rating: {selectedScore}</span>
			</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				{#each scoreOptions as option}
					<DropdownMenu.Item 
						on:click={() => handleScoreSelect(option)}
						class="flex items-center justify-between"
					>
						{option}
						{#if selectedScore === option}
							<Check class="w-4 h-4" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>

		<!-- Status Sub-Menu -->
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger class="flex items-center gap-2">
				<BookOpen class="w-4 h-4" />
				<span>Status: {selectedStatus}</span>
			</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				{#each statusOptions as option}
					<DropdownMenu.Item 
						on:click={() => handleStatusSelect(option)}
						class="flex items-center justify-between"
					>
						{option}
						{#if selectedStatus === option}
							<Check class="w-4 h-4" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
	</DropdownMenu.Content>
</DropdownMenu.Root>