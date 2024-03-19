<script>
    export let project
    import Pill from './Pill.svelte'
</script>

<!--
            "project3": {
            "title": "Project 3",
            "time_period" : "2019 - 2020",
            "description": "This is a description of project 3",
            "image": "project3.jpg",
            "link": "https://www.google.com", 
            "languages": "Python, JavaScript, HTML, CSS, Svelte"
        }
-->

<div class="card-shimmer grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-8 mt-8 p-6 lg:p-8 bg-surface-100-800-token shadow-sm rounded-none sm:rounded-container border-t border-b sm:border border-surface-200-700-token relative">
    <div id="left-col" class="flex flex-col justify-between">
        {#if !project.finished}
            <div class="lg:-translate-y-8 -translate-y-6 w-fit p-2 px-3 font-semibold rounded-container rounded-t-none text-sm border border-t-0 border-surface-200-700-token bg-surface-100-800-token">
                Work in progress
            </div>
        {/if}
        <div class="flex items-center gap-x-2 pb-6">
            {#each project.languages as language}
                <Pill title={language} size="small"/>
            {/each}
        </div>
        <div class="pb-6">
            <h2 class="text-2xl font-semibold pb-3">
                {project.title}
            </h2>
            <p class="text-sm">{project.time_period}</p>
        </div>
        <div class="pb-8">
            <p class="text-base">{project.description}</p>
        </div>
        <div class="flex items-center gap-x-4">
            <a  href={project.link} 
                class="button-secondary" target="_blank">
                Open App
            </a>
            <a href={project.code} class="button" target="_blank">
                View Code
            </a>
        </div>
    </div>
    <div id="right-col" class="flex flex-col place-content-center">
        <img src="/projects/{project.image}" alt={project.title} class="w-full h-auto rounded-container"/>
    </div>
</div>
