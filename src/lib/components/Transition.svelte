<script lang="ts">
    import { Motion } from 'svelte-motion';
    import { preferredReduceMotion } from "svelte-legos";
    import { browser } from '$app/environment';
    
    export let url: string;
    const motion = preferredReduceMotion();
    
    $: pageTransitionVariants = $motion === "reduce" ? {
        initial: { opacity: 1 },
        enter: { opacity: 1 },
        exit: { opacity: 1 }
    } : {
        initial: {
            opacity: 0,
            y: 100,
            scale: 0.95,
        },
        enter: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.4 },
                y: { duration: 0.2 },
                scale: { duration: 0.2 }
            }
        },
        exit: {
            opacity: 0,
            y: -100,
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.3, 1]
            }
        }
    };

    let isLoaded = false;
    
    $: if (browser) {
        setTimeout(() => {
            isLoaded = true;
        }, 100);
    }
</script>

    {#if !isLoaded}
    <div class="relative w-full min-h-full">
        <div class="fixed inset-0 flex items-center justify-center bg-background">
            <div class="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" 
                 role="status" 
                 aria-label="Loading">
            </div>
        </div>
    </div>
    {/if}
    
    {#key url}
        <Motion
            initial="initial"
            animate="enter"
            exit="exit"
            let:motion
        >
            <div 
                use:motion 
                class="min-h-full w-full rounded-lg overflow-hidden bg-background"
                class:opacity-0={!isLoaded}
                aria-live="polite"
                role="region"
            >
                <Motion
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={pageTransitionVariants}
                    let:motion
                >
                    <div use:motion class="h-full w-full">
                        <slot />
                    </div>
                </Motion>
            </div>
        </Motion>
    {/key}