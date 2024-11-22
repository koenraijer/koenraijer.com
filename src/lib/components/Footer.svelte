<script lang="ts">
    import Socials from "./Socials.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import { History } from 'lucide-svelte'
</script>

<footer class="mb-6 section flex flex-row justify-between w-full">
    <Socials />
    <div class="flex flex-row">
        <a href="/changelog" class="transition-colors decoration-none flex justify-center items-center rounded-full h-7 w-7 group relative hover:bg-muted hover:text-foreground text-muted-foreground">
            <History class="h-4 w-4"/>
        </a>
        <ThemeToggle />

    </div>
</footer>