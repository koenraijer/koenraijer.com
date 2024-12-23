<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import * as Drawer from "$lib/shadcn/ui/drawer";
    import * as Menubar from "$lib/shadcn/ui/menubar";
    import { Button } from "$lib/shadcn/ui/button";
    import { MoreVertical, ArrowUpDown, Star, BookOpen, Check, X } from 'lucide-svelte';
    import { ScrollArea } from "$lib/shadcn/ui/scroll-area/";

    // Define types for props and events
    export let score: string;
    export let status: 'read' | 'currently-reading' | 'to-read' | 'All';
    export let sort: string;

    type SortOption = 'Highest' | 'Lowest' | 'Newest' | 'Oldest' | 'Title A-Z' | 'Title Z-A';
    type ScoreOption = 'All scores' | '> 1' | '> 2' | '> 3' | '> 4';
    type StatusOption = 'All' | 'Finished' | 'Reading now' | 'On wishlist';

    interface SortGroup {
        group: string;
        items: SortOption[];
    }

    type DispatchEvents = {
        optionSelected: { selectedOption: SortOption };
        scoreSelected: { selectedScoreOption: ScoreOption };
        categorySelected: { selectedCategoryOption: StatusOption };
    };

    const dispatch = createEventDispatcher<DispatchEvents>();

    // State management
    let isOpen = false;
    let isMobileDrawerOpen = false;
    let isMobile = false;

    // Memoized options
    const sortOptions: SortGroup[] = [
        { group: 'By score', items: ['Highest', 'Lowest'] },
        { group: 'By date', items: ['Newest', 'Oldest'] },
        { group: 'By title', items: ['Title A-Z', 'Title Z-A'] }
    ];

    const scoreOptions: ScoreOption[] = ['All scores', '> 1', '> 2', '> 3', '> 4'];
    const statusOptions: StatusOption[] = ['All', 'Finished', 'Reading now', 'On wishlist'];

    // Reactive declarations with type safety
    $: selectedSort = sort as SortOption || 'Newest';
    $: selectedScore = score as ScoreOption || 'All scores';
    $: selectedStatus = status === 'read' ? 'Finished' 
        : status === 'currently-reading' ? 'Reading now' 
        : status === 'to-read' ? 'On wishlist' 
        : 'All';

    // Optimize mobile check with ResizeObserver
    const checkMobile = (): void => {
        isMobile = window.innerWidth < 768;
    };

    onMount(() => {
        // Use ResizeObserver instead of window resize event
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(checkMobile);
        });
        
        resizeObserver.observe(document.documentElement);
        checkMobile();

        return () => {
            resizeObserver.disconnect();
        };
    });

    // Handlers with type safety
    function handleSortSelect(option: SortOption): void {
        selectedSort = option;
        dispatch('optionSelected', { selectedOption: option });
        if (isMobile) isMobileDrawerOpen = false;
    }

    function handleScoreSelect(option: ScoreOption): void {
        selectedScore = option;
        dispatch('scoreSelected', { selectedScoreOption: option });
        if (isMobile) isMobileDrawerOpen = false;
    }

    function handleStatusSelect(option: StatusOption): void {
        selectedStatus = option;
        dispatch('categorySelected', { selectedCategoryOption: option });
        if (isMobile) isMobileDrawerOpen = false;
    }

    function getReadableStatus(status: 'read' | 'currently-reading' | 'to-read' | 'All'): string {
        const map = {
            'read': 'Finished',
            'currently-reading': 'Currently reading',
            'to-read': 'On wishlist',
            'All': 'All'
        };
        return map[status] || status;
    }

    function clearFilter(type: 'sort' | 'score' | 'status'): void {
        switch(type) {
            case 'sort':
                handleSortSelect('Newest');
                break;
            case 'score':
                handleScoreSelect('All scores');
                break;
            case 'status':
                handleStatusSelect('All');
                break;
        }
    }
    // Initial dispatch
    onMount(() => {
        // Use Promise.resolve to defer initial dispatches
        Promise.resolve().then(() => {
            dispatch('optionSelected', { selectedOption: selectedSort });
            dispatch('scoreSelected', { selectedScoreOption: selectedScore });
            dispatch('categorySelected', { selectedCategoryOption: selectedStatus as StatusOption });
        });
    });
</script>

{#if isMobile}
    <!-- Active Filters -->
    <div class="flex items-center">
        {#if sort === 'Newest' && score === 'All scores' && status === 'All'}
            <span class="text-foreground text-xs !pill hover:bg-none">Showing all</span>
        {:else}
            <div class="inline-flex gap-1.5">
                {#if sort !== 'Newest'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('sort')}
                    >
                        {sort}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
                {#if score !== 'All scores'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('score')}
                    >
                        {score}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
                {#if status !== 'All'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('status')}
                    >
                        {getReadableStatus(status)}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    <Drawer.Root bind:open={isMobileDrawerOpen}>
        <Drawer.Trigger 
            class="social border"
            aria-label="Open book filters menu"
        >
            <MoreVertical class="w-4 h-4" aria-hidden="true" />
        </Drawer.Trigger>
        <Drawer.Content class="max-h-[95vh]" role="dialog" aria-label="Book filters">
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
    <!-- Active Filters -->
    <div class="flex items-center">
        {#if sort === 'Newest' && score === 'All scores' && status === 'All'}
            <span class="text-foreground text-xs !pill hover:bg-none">Showing all</span>
        {:else}
            <div class="inline-flex gap-1.5">
                {#if sort !== 'Newest'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('sort')}
                    >
                        {sort}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
                {#if score !== 'All scores'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('score')}
                    >
                        {score}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
                {#if status !== 'All'}
                    <button 
                        class="pill pr-1.5"
                        on:click={() => clearFilter('status')}
                    >
                        {getReadableStatus(status)}
                        <span class="social hover:bg-foreground/5 p-1 h-5 w-5 flex items-center justify-center ml-1"><X class="w-3.5 h-3.5 inline"/></span>
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    <Menubar.Root class="border-none">
        <!-- Sort Menu -->
        <Menubar.Menu>
            <Menubar.Trigger class="p-0 w-7 h-7 inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground aspect-square rounded-full">
                <ArrowUpDown class="w-3.5 h-3.5" />
            </Menubar.Trigger>
            <Menubar.Content class="shadow-none">
                {#each sortOptions as group}
                    <Menubar.Group>
                        <Menubar.Label class="font-[500] text-muted-foreground !text-xs">{group.group}</Menubar.Label>
                        {#each group.items as option}
                            <Menubar.Item 
                                on:click={() => handleSortSelect(option)}
                                class="flex items-center justify-between !text-xs"
                            >
                                {option}
                                {#if selectedSort === option}
                                    <Check class="w-4 h-4" />
                                {/if}
                            </Menubar.Item>
                        {/each}
                    </Menubar.Group>
                {/each}
            </Menubar.Content>
        </Menubar.Menu>

        <!-- Rating Menu -->
        <Menubar.Menu>
            <Menubar.Trigger class="p-0 w-7 h-7 inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground aspect-square rounded-full">
                <Star class="w-3.5 h-3.5" />
            </Menubar.Trigger>
            <Menubar.Content class="shadow-none">
                {#each scoreOptions as option}
                    <Menubar.Item 
                        on:click={() => handleScoreSelect(option)}
                        class="flex items-center justify-between !text-xs"
                    >
                        {option}
                        {#if selectedScore === option}
                            <Check class="w-4 h-4" />
                        {/if}
                    </Menubar.Item>
                {/each}
            </Menubar.Content>
        </Menubar.Menu>

        <!-- Status Menu -->
        <Menubar.Menu>
            <Menubar.Trigger class="p-0 w-7 h-7 inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground aspect-square rounded-full">
                <BookOpen class="w-3.5 h-3.5" />
            </Menubar.Trigger>
            <Menubar.Content class="shadow-none">
                {#each statusOptions as option}
                    <Menubar.Item 
                        on:click={() => handleStatusSelect(option)}
                        class="flex items-center justify-between !text-xs"
                    >
                        {option}
                        {#if selectedStatus === option}
                            <Check class="w-4 h-4" />
                        {/if}
                    </Menubar.Item>
                {/each}
            </Menubar.Content>
        </Menubar.Menu>
    </Menubar.Root>
{/if}