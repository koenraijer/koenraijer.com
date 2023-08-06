<script>
    import { Ratings } from '@skeletonlabs/skeleton';
    export let book;

    function formatDate(dateStr) {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

</script>
<div class="flex flex-col bg-transparent overflow-hidden border justify-between border-surface-900-50-token">
    <div class="flex justify-between p-6 sm:p-8 border-b border-surface-900-50-token">
        <p class="date text-surface-400">
            {book['Date Finished'] ? formatDate(book['Date Finished']) : "Unknown date"}
        </p>
        <div class="w-fit">
            {#if book['Score (0-10)']}
                <Ratings value={book['Score (0-10)'] / 2} max={5}>
                    <svelte:fragment slot="empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg>
                    </svelte:fragment>
                    <svelte:fragment slot="half">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="w-5 h-5" viewBox="0 0 256 256">
                            <defs>
                                <!-- Define a clipping path that covers the left half of the star -->
                                <clipPath id="left-half">
                                    <rect x="0" y="0" width="128" height="256" />
                                </clipPath>
                            </defs>
                            <!-- Draw the filled star and clip it to the left half -->
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" clip-path="url(#left-half)"/>
                            <!-- Draw the outlined star on top -->
                            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
                        </svg>                
                    </svelte:fragment>
                    <svelte:fragment slot="full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>
                    </svelte:fragment>
                </Ratings>
            {:else}
                <span class="text-surface-400">Unknown score</span>
            {/if}
        </div>
    </div>
    <div class="p-6 sm:p-8">
        <h2 class="text-lg font-semibold">{book.Title ? book.Title : ""}</h2>
        {#if book.Subtitle}
            <h3 class="">{book.Subtitle ? book.Subtitle : ""}</h3>
        {/if}
        <span class="description pt-[0.37rem] text-surface-700-200-token">{book.Author}</span>
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