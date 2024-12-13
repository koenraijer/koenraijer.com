<script lang="ts">
    import { page } from '$app/stores';
    $: errorMessage = $page.error?.message?.split(',')[0] || 'Something went wrong';
</script>

<section 
    class="section flex min-h-[calc(60vh)] items-center justify-center"
    role="alert"
    aria-labelledby="error-title"
>
    <div class="flex max-w-md flex-col items-center space-y-4 text-center">
        <h1 
            id="error-title" 
            class="text-xl font-[500]"
        >
            <span aria-label="Error code">{$page.status}</span>: {errorMessage}
        </h1>
        
        <p 
            class="text-muted-foreground text-sm"
            aria-live="polite"
        >
            {#if $page.status === 404}
                The page you're looking for doesn't exist or has been moved.
            {:else}
                We encountered an unexpected error. Please try again later.
            {/if}
        </p>
        
        <a 
            href="/"
            class="inline-flex h-10 items-center justify-center rounded-full border bg-muted px-8 text-sm font-medium transition-colors hover:bg-transparent"
            aria-label="Return to homepage"
        >
            Return home
        </a>
    </div>
</section>