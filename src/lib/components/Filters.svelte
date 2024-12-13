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

    // Add labels for screen readers
    const labels = {
        sort: {
            button: `Sort by ${selectedSort}`,
            menu: "Sort options menu"
        },
        rating: {
            button: `Filter by rating: ${selectedScore}`,
            menu: "Rating filter options"
        },
        status: {
            button: `Filter by status: ${selectedStatus}`,
            menu: "Status filter options"
        }
    };
</script>
{#if isMobile}
    <Drawer.Root bind:open={isMobileDrawerOpen}>
        <Drawer.Trigger 
            class="rounded-full p-2 bg-background/80 backdrop-blur-sm border border-muted-foreground/10 hover:border-muted-foreground/20 transition-colors"
            aria-label="Open book filters menu"
        >
            <MoreVertical class="w-5 h-5" aria-hidden="true" />
        </Drawer.Trigger>
        <Drawer.Content class="max-h-[85vh]" role="dialog" aria-label="Book filters">
            <Drawer.Header>
                <Drawer.Title>Filter Books</Drawer.Title>
                <Drawer.Description>Select your preferences below</Drawer.Description>
            </Drawer.Header>
            
            <ScrollArea class="flex-1 h-[50vh]">
                <div class="space-y-6 px-4 pb-6">
                    <!-- Sort Options -->
                    <div class="space-y-3" role="group" aria-labelledby="sort-heading">
                        <h3 id="sort-heading" class="font-medium text-sm flex items-center gap-2">
                            <ArrowUpDown class="w-4 h-4" aria-hidden="true" />
                            Sort by
                        </h3>
                        <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Sort options">
                            {#each sortOptions as group}
                                {#each group.items as option}
                                    <Button 
                                        variant={selectedSort === option ? "default" : "outline"}
                                        class="justify-start"
                                        on:click={() => handleSortSelect(option)}
                                        role="radio"
                                        aria-checked={selectedSort === option}
                                        aria-label={`Sort by ${option.toLowerCase()}`}
                                    >
                                        {option}
                                    </Button>
                                {/each}
                            {/each}
                        </div>
                    </div>

                    <!-- Rating Options -->
                    <div class="space-y-3" role="group" aria-labelledby="rating-heading">
                        <h3 id="rating-heading" class="font-medium text-sm flex items-center gap-2">
                            <Star class="w-4 h-4" aria-hidden="true" />
                            Rating
                        </h3>
                        <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Rating filter options">
                            {#each scoreOptions as option}
                                <Button 
                                    variant={selectedScore === option ? "default" : "outline"}
                                    class="justify-start"
                                    on:click={() => handleScoreSelect(option)}
                                    role="radio"
                                    aria-checked={selectedScore === option}
                                    aria-label={`Filter by rating ${option}`}
                                >
                                    {option}
                                </Button>
                            {/each}
                        </div>
                    </div>

                    <!-- Status Options -->
                    <div class="space-y-3" role="group" aria-labelledby="status-heading">
                        <h3 id="status-heading" class="font-medium text-sm flex items-center gap-2">
                            <BookOpen class="w-4 h-4" aria-hidden="true" />
                            Status
                        </h3>
                        <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Reading status options">
                            {#each statusOptions as option}
                                <Button 
                                    variant={selectedStatus === option ? "default" : "outline"}
                                    class="justify-start"
                                    on:click={() => handleStatusSelect(option)}
                                    role="radio"
                                    aria-checked={selectedStatus === option}
                                    aria-label={`Filter by status ${option}`}
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
        <DropdownMenu.Trigger 
            class="rounded-full p-2 bg-background/80 backdrop-blur-sm border border-muted-foreground/10 hover:border-muted-foreground/20 transition-colors"
            aria-label="Open filters menu"
            aria-expanded={isOpen}
        >
            <Motion 
                animate={isOpen ? 'open' : 'closed'} 
                variants={rotateVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                let:motion
            >
                <div use:motion aria-hidden="true">
                    <MoreVertical class="w-5 h-5" />
                </div>
            </Motion>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content class="w-56" align="start" role="menu" aria-label="Book filters">
            <DropdownMenu.Label>Filters</DropdownMenu.Label>
            <DropdownMenu.Separator />

            <!-- Sort Sub-Menu -->
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger class="flex items-center gap-2" aria-label={labels.sort.button}>
                    <ArrowUpDown class="w-4 h-4" aria-hidden="true" />
                    <span>Sort: {selectedSort}</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent aria-label={labels.sort.menu}>
                    {#each sortOptions as group}
                        <DropdownMenu.Group>
                            <DropdownMenu.Label>{group.group}</DropdownMenu.Label>
                            {#each group.items as option}
                                <DropdownMenu.Item 
                                    on:click={() => handleSortSelect(option)}
                                    class="flex items-center justify-between"
                                    role="menuitemradio"
                                    aria-checked={selectedSort === option}
                                >
                                    {option}
                                    {#if selectedSort === option}
                                        <Check class="w-4 h-4" aria-hidden="true" />
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
                <DropdownMenu.SubTrigger class="flex items-center gap-2" aria-label={labels.rating.button}>
                    <Star class="w-4 h-4" aria-hidden="true" />
                    <span>Rating: {selectedScore}</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent aria-label={labels.rating.menu}>
                    {#each scoreOptions as option}
                        <DropdownMenu.Item 
                            on:click={() => handleScoreSelect(option)}
                            class="flex items-center justify-between"
                            role="menuitemradio"
                            aria-checked={selectedScore === option}
                        >
                            {option}
                            {#if selectedScore === option}
                                <Check class="w-4 h-4" aria-hidden="true" />
                            {/if}
                        </DropdownMenu.Item>
                    {/each}
                </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <!-- Status Sub-Menu -->
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger class="flex items-center gap-2" aria-label={labels.status.button}>
                    <BookOpen class="w-4 h-4" aria-hidden="true" />
                    <span>Status: {selectedStatus}</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent aria-label={labels.status.menu}>
                    {#each statusOptions as option}
                        <DropdownMenu.Item 
                            on:click={() => handleStatusSelect(option)}
                            class="flex items-center justify-between"
                            role="menuitemradio"
                            aria-checked={selectedStatus === option}
                        >
                            {option}
                            {#if selectedStatus === option}
                                <Check class="w-4 h-4" aria-hidden="true" />
                            {/if}
                        </DropdownMenu.Item>
                    {/each}
                </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
{/if}