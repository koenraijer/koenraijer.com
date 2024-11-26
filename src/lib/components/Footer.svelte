<script lang="ts">
    import Socials from "./Socials.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import { History } from 'lucide-svelte'
</script>

<footer class="mb-8 mt-10 section md:max-w-5xl flex flex-row justify-between w-full">
    <Socials />
    <div class="flex flex-row">
        <a href="/changelog" class="social">
            <History class="h-4 w-4"/>
        </a>
        <ThemeToggle />

    </div>
</footer>