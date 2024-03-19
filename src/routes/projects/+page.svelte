<script>
    import Project from '$lib/components/Project.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
    import { projects } from '$lib/js/info.js';
</script>

<div class="section">
    <PageTitle title="Projects"></PageTitle>
</div>
<div class="mt-12 mx-auto sm:px-8 lg:px-16 max-w px-0 ">
    {#each Object.entries(projects) as [key, project]}
        <Project {project} />
    {/each}
</div>