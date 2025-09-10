<script lang="ts">
    export let data;
    import { formatDate } from '$lib/js/utils.js';
    import Image from '$lib/components/Image.svelte';
    import { Star, Info } from 'lucide-svelte';
    import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/shadcn/ui/tooltip/index.js';
    import { browser } from '$app/environment';

    const book = data.book;

    function normalizeReview(input: string): string[] {
        if (!input) return [];
        // Convert <br> tags to newlines, strip any other HTML tags
        const noTags = input
            .replace(/<br\s*\/?>(\r?\n)?/gi, '\n')
            .replace(/<[^>]+>/g, '');
        // Normalize line endings and trim
        const cleaned = noTags.replace(/\r\n?/g, '\n').trim();
        // Split into paragraphs on blank lines; fallback to single paragraph
        const parts = cleaned.split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
        return parts.length ? parts : [cleaned];
    }

    const reviewParagraphs: string[] = book['My Review'] ? normalizeReview(String(book['My Review'])) : [];

    // Minimal Markdown → HTML converter for trusted content (Obsidian notes)
    function mdToHtml(md: string): string {
        if (!md) return '';
        let s = md.replace(/\r\n?/g, '\n');
        // Escape basic HTML first
        s = s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        // Headings ###### to #
        s = s.replace(/^######\s+(.*)$/gm, '<h6>$1<\/h6>')
             .replace(/^#####\s+(.*)$/gm, '<h5>$1<\/h5>')
             .replace(/^####\s+(.*)$/gm, '<h4>$1<\/h4>')
             .replace(/^###\s+(.*)$/gm, '<h3>$1<\/h3>')
             .replace(/^##\s+(.*)$/gm, '<h2>$1<\/h2>')
             .replace(/^#\s+(.*)$/gm, '<h1>$1<\/h1>');
        // Blockquotes: after escaping, ">" becomes &gt; so match that
        // Mark quote lines
        s = s.replace(/^&gt;\s?(.*)$/gm, '<blockquote>$1<\/blockquote>');
        // Merge consecutive blockquotes into single block with paragraphs
        s = s.replace(/(?:<blockquote>[^<]*<\/blockquote>\n?)+/g, (m) => {
            const inner = m
              .replace(/<blockquote>/g, '')
              .replace(/<\/blockquote>\n?/g, '\n')
              .split(/\n+/)
              .map((x) => x.trim())
              .filter(Boolean)
              .map((x) => `<p>${x}<\/p>`) 
              .join('');
            return `<blockquote>${inner}<\/blockquote>`;
        });
        // Lists (unordered)
        s = s.replace(/^(?:- |\* )(.*)$/gm, '<li>$1<\/li>');
        s = s.replace(/(?:<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}<\/ul>`);
        // Inline code
        s = s.replace(/`([^`]+)`/g, '<code>$1<\/code>');
        // Bold and italics
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1<\/strong>');
        s = s.replace(/\*([^*]+)\*/g, '<em>$1<\/em>');
        // Links [text](url)
        s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" class="anchor" target="_blank" rel="noopener noreferrer">$1<\/a>');
        // Paragraphs: wrap bare lines separated by blank lines
        const blocks = s.split(/\n\s*\n+/).map((b) => b.trim()).filter(Boolean);
        s = blocks
            .map((b) => (b.match(/^<h[1-6]>|^<ul>|^<ol>|^<pre>|^<blockquote>|^<table>/) ? b : `<p>${b}<\/p>`))
            .join('\n');
        return s;
    }

</script>

<svelte:head>
    <title>{book.Title} by {book.Author}</title>
    <meta name="description" content="Book details for {book.Title} by {book.Author}" />
    <meta property="og:title" content={book.Title} />
    <meta property="og:description" content="Book details for {book.Title} by {book.Author}" />
</svelte:head>

<article class="section md:pl-0" aria-label="Book details">
    <div class="grid gap-4 md:gap-8 md:grid-cols-3">
        <!-- Left: Book details: Image -->
        <section class="order-1 md:order-1 md:col-span-1" aria-label="Book cover">
            <div class="w-full flex md:block justify-center">
                <div class="relative bg-muted/30 rounded-lg overflow-hidden w-1/3 mx-auto aspect-[2/3] md:w-full md:aspect-[2/3]">
                    <Image 
                        class="w-full h-full object-contain md:object-cover transition-transform duration-300" 
                        src={"book_covers/" + (book["Book Id"] ? book["Book Id"] : "") + ".webp"} 
                        alt={`Book cover for ${book.Title} by ${book.Author}`}
                    />
                    {#if book['My Rating']}
                        <div class="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 backdrop-blur-sm rounded-full py-0.5 px-2.5 shadow-sm">
                            <Star class="md:w-4 md:h-4 h-3 w-3" fill="currentColor" />
                            <span class="md:text-sm text-xs font-medium leading-none">{book['My Rating']}</span>
                        </div>
                    {/if}
                </div>
            </div>
        </section>
        
        <!-- Right: unified column with all content stacked top-to-bottom -->
        <section class="order-2 md:order-1 md:col-start-2 md:col-span-2 space-y-3">
            <!-- Title & Author -->
            <header aria-labelledby="book-title">
                <h1 class="text-xl font-medium mb-1" id="book-title">{book?.Title}</h1>
                <p class="text-lg text-muted-foreground" id="book-author">{book?.Author}</p>
            </header>
            <!-- Reading Status -->
            <div role="status" aria-label="Reading status">
                <div class="text-xs px-2 w-fit rounded-full border border-muted-foreground/20 text-muted-foreground/80 inline-flex items-center gap-x-1 h-6">
                    {#if book['Exclusive Shelf'] === "read"}
                        Finished <time datetime={book['Date Read']}>{book['Date Read'] ? formatDate(book['Date Read']) : ""}</time>
                    {:else if book['Exclusive Shelf'] === "currently-reading"}
                        Currently reading
                    {:else if book['Exclusive Shelf'] === "to-read"}
                        On wishlist
                    {/if}
                </div>
            </div>
            <!-- Metadata table directly under status -->
            <section aria-labelledby="metadata-heading">
                <table class="text-xxs w-full" aria-label="Book metadata">
                    <tbody class="divide-y divide-muted-foreground/10">
                        <tr class="grid grid-cols-3 py-1">
                            <th scope="row" class="text-foreground/50 text-left font-normal">Pages</th>
                            <td class="col-span-2">{book['Number of Pages']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-1">
                            <th scope="row" class="text-foreground/50 text-left font-normal">Format</th>
                            <td class="col-span-2">{book['Binding']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-1">
                            <th scope="row" class="text-foreground/50 text-left font-normal">Year published</th>
                            <td class="col-span-2">
                                <time datetime={book['Year Published']}>{Math.round(book["Original Publication Year"])}</time>
                            </td>
                        </tr>
                        <tr class="grid grid-cols-3 py-1">
                            <th scope="row" class="text-foreground/50 text-left font-normal">Publisher</th>
                            <td class="col-span-2">{book['Publisher']}</td>
                        </tr>
                        <tr class="grid grid-cols-3 py-1">
                            <th scope="row" class="text-foreground/50 text-left font-normal">ISBN</th>
                            <td class="col-span-2">
                                {#if book['ISBN'] && book['ISBN13']}
                                    <span aria-label="ISBN-13">{book['ISBN13']}</span> 
                                    (<span aria-label="ISBN-10">ISBN10: {book['ISBN']}</span>)
                                {:else if book['ISBN13']}
                                    <span aria-label="ISBN-13">{book['ISBN13']}</span>
                                {:else if book['ISBN']}
                                    <span aria-label="ISBN-10">{book['ISBN']}</span>
                                {:else}
                                    Unknown
                                {/if}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </section>

        <!-- Review: span all columns -->
        {#if book['My Review']}
            <section aria-labelledby="review-heading" class="order-3 md:order-2 col-span-full md:col-span-3 pt-4">
                <h2 id="review-heading" class="text-base font-medium mb-2">Review</h2>
                <div class="prose text-sm">
                    {#each reviewParagraphs as para}
                        <p>{para}</p>
                    {/each}
                </div>
            </section>
        {/if}

        <!-- Notes: span all columns -->
        <section aria-labelledby="notes-heading" class="order-4 md:order-3 col-span-full md:col-span-3">
            <!-- <h2 id="notes-heading" class="text-base font-medium mb-2">Notes</h2> -->
            {#if data?.note && data?.note?.content}
                <div class="bg-muted/10 border border-muted-foreground/10 rounded-md px-4 pt-2 pb-4">
                    <div class="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1">
                        <span>Field notes</span>
                        {#if browser}
                          <Tooltip>
                            <TooltipTrigger class="align-middle inline-flex">
                              <Info class="h-3.5 w-3.5 text-muted-foreground/80" aria-label="Auto‑imported from Obsidian" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={6} class="h-fit">
                              <span class="text-[11px] py-0 my-0">Auto‑imported from Obsidian</span>
                            </TooltipContent>
                          </Tooltip>
                        {:else}
                          <Info class="h-3.5 w-3.5 text-muted-foreground/80" aria-label="Auto‑imported from Obsidian" title="Auto‑imported from Obsidian" />
                        {/if}
                    </div>
                    <div class="prose prose-sm prose-headings:font-medium prose-p:leading-relaxed prose-blockquote:italic prose-blockquote:text-muted-foreground">
                        {@html mdToHtml(String(data.note.content))}
                    </div>
                </div>
            {:else}
                <p class="text-sm text-muted-foreground">No notes matched for this book.</p>
            {/if}
        </section>
    </div>
</article>
