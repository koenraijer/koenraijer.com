<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as DropdownMenu from "$lib/shadcn/ui/dropdown-menu";
    import * as Drawer from "$lib/shadcn/ui/drawer";
    import { Button } from "$lib/shadcn/ui/button";
    import { MoreVertical, ArrowUpDown, Star, BookOpen, Check } from 'lucide-svelte';
    import { Motion } from "svelte-motion";
	import { ScrollArea } from "$lib/shadcn/ui/scroll-area/";

    export let score, status, sort;
    const dispatch = createEventDispatcher();

    let isOpen = false;
    let isMobileDrawerOpen = false;
    let isMobile = false;

    // Check for mobile screen on mount and window resize
    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    });

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
        if (isMobile) isMobileDrawerOpen = false;
    }

    function handleScoreSelect(option) {
        selectedScore = option;
        dispatch('scoreSelected', { selectedScoreOption: option });
        if (isMobile) isMobileDrawerOpen = false;
    }

    function handleStatusSelect(option) {
        selectedStatus = option;
        dispatch('categorySelected', { selectedCategoryOption: option });
        if (isMobile) isMobileDrawerOpen = false;
    }

    const rotateVariants = {
        open: { rotate: 720 },
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

{#if isMobile}
	<Drawer.Root bind:open={isMobileDrawerOpen}>
		<Drawer.Trigger class="rounded-full p-2 bg-background/80 backdrop-blur-sm border border-muted-foreground/10 hover:border-muted-foreground/20 transition-colors">
			<MoreVertical class="w-5 h-5" />
		</Drawer.Trigger>
		<Drawer.Content class="max-h-[85vh]">
			<Drawer.Header>
				<Drawer.Title>Filter Books</Drawer.Title>
				<Drawer.Description>Select your preferences below</Drawer.Description>
			</Drawer.Header>
			
			<ScrollArea class="flex-1 h-[50vh]">
				<div class="space-y-6 px-4 pb-6">
					<!-- Sort Options -->
					<div class="space-y-3">
						<h3 class="font-medium text-sm flex items-center gap-2">
							<ArrowUpDown class="w-4 h-4" />
							Sort by
						</h3>
						<div class="grid grid-cols-2 gap-2">
							{#each sortOptions as group}
								{#each group.items as option}
									<Button 
										variant={selectedSort === option ? "default" : "outline"}
										class="justify-start"
										on:click={() => handleSortSelect(option)}
									>
										{option}
									</Button>
								{/each}
							{/each}
						</div>
					</div>

					<!-- Rating Options -->
					<div class="space-y-3">
						<h3 class="font-medium text-sm flex items-center gap-2">
							<Star class="w-4 h-4" />
							Rating
						</h3>
						<div class="grid grid-cols-2 gap-2">
							{#each scoreOptions as option}
								<Button 
									variant={selectedScore === option ? "default" : "outline"}
									class="justify-start"
									on:click={() => handleScoreSelect(option)}
								>
									{option}
								</Button>
							{/each}
						</div>
					</div>

					<!-- Status Options -->
					<div class="space-y-3">
						<h3 class="font-medium text-sm flex items-center gap-2">
							<BookOpen class="w-4 h-4" />
							Status
						</h3>
						<div class="grid grid-cols-2 gap-2">
							{#each statusOptions as option}
								<Button 
									variant={selectedStatus === option ? "default" : "outline"}
									class="justify-start"
									on:click={() => handleStatusSelect(option)}
								>
									{option}
								</Button>
							{/each}
						</div>
					</div>
				</div>
			</ScrollArea>
		</Drawer.Content>
	</Drawer.Root>
{:else}
    <DropdownMenu.Root bind:open={isOpen} on:openChange={handleOpenChange}>
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

        <DropdownMenu.Content class="w-56" align="start">
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
{/if}