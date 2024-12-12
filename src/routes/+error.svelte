<script lang="ts">
    import { page } from '$app/stores';
    $: errorMessage = $page.error?.message?.split(',')[0] || 'Something went wrong';

</script>

<section class="section flex min-h-[calc(60vh)] items-center justify-center">
    <div class="flex max-w-md flex-col items-center space-y-4 text-center">
        <h1 class="text-xl font-[500]">
          	{$page.status}: {errorMessage}
        </h1>
        
        <p class="text-muted-foreground text-sm">
            {#if $page.status === 404}
                The page you're looking for doesn't exist or has been moved.
            {:else}
                We encountered an unexpected error. Please try again later.
            {/if}
        </p>
        
        <a 
            href="/"
            class="inline-flex h-10 items-center justify-center rounded-full border bg-muted px-8 text-sm font-medium transition-colors hover:bg-transparent"
        >
            Return home
        </a>
    </div>
</section>