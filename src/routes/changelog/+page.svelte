<script lang="ts">
    import type { PageData } from './$types';
    import * as info from '$lib/js/info.js';

    export let data: PageData;

    // SEO
    const title = "Changelog";
    const description = "A reverse chronological list of notable changes to this website, updated automatically whenever a new version is deployed.";
    const url = `${info.website}/changelog`;
    const ogImage = `https://koenraijer-og.vercel.app/api/og?title=${encodeURIComponent(title)}`;

    interface ChangelogEntry {
        year: string;
        month: string;
        date: string;
        message: string;
    }

    // Group entries by year and month
    $: groupedChangelog = data.changelog.changelog.reduce((acc: Record<string, Record<string, ChangelogEntry[]>>, entry) => {
        if (!acc[entry.year]) {
            acc[entry.year] = {};
        }
        if (!acc[entry.year][entry.month]) {
            acc[entry.year][entry.month] = [];
        }
        acc[entry.year][entry.month].push(entry);
        return acc;
    }, {});

    // Track current section for mobile
    let currentSection: string | null = null;
    const updateCurrentSection = (year: string, month: string) => {
        currentSection = `${year}-${month}`;
    };
</script>

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

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight">Changelog</h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {description}
        </p>
    </div>

    <div class="relative lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Left Column (Sticky Navigation) -->
        <div class="hidden lg:block">
            <div class="sticky top-8 space-y-6">
                {#each Object.entries(groupedChangelog) as [year, months]}
                    <div class="space-y-2">
                        <h2 class="text-lg font-semibold">{year}</h2>
                        <ul class="space-y-2">
                            {#each Object.keys(months) as month}
                                <li>
                                    <a 
                                        href="#{`${year}-${month}`}"
                                        class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {month}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Right Column (Content) -->
        <div class="lg:col-span-3">
            {#each Object.entries(groupedChangelog) as [year, months]}
                {#each Object.entries(months) as [month, entries]}
                    <div 
                        id={`${year}-${month}`}
                        class="mb-16 scroll-mt-8"
                        on:inview={() => updateCurrentSection(year, month)}
                    >
                        <h3 class="text-xl font-semibold mb-6">
                            {month} {year}
                        </h3>
                        <ul class="space-y-6">
                            {#each entries as entry}
                                <li class="group relative pl-6">
                                    <div 
                                        class="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                                    ></div>
                                    <div class="prose prose-gray dark:prose-invert max-w-none">
                                        {@html entry.message}
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            {/each}
        </div>
    </div>
</div>

<style>
    :global(.prose a) {
        text-decoration: none;
        color: #3b82f6;
        transition: color 0.2s;
    }

    :global(.prose a:hover) {
        color: #2563eb;
    }

    /* Dark mode link colors */
    :global(.dark .prose a) {
        color: #60a5fa;
    }

    :global(.dark .prose a:hover) {
        color: #93c5fd;
    }
</style>