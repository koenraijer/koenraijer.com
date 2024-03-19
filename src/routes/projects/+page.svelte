<script>
    import Project from '$lib/components/Project.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
    
    let projects = {
        "ReAsset": {
            "title": "ReAsset",
            "time_period" : "2023",
            "description": "A web app to help you rebalance assets your investment portfolio with the minimum amount of transactions, saving you time and money.",
            "image": "project_reasset.png",
            "link": "https://www.reasset.vercel.app/", 
            "code" : "https://github.com/koenraijer/reasset",
            "languages": [ "Javscript", "SvelteKit", "TailwindCSS"],
            "finished" : false
        },
        "project2": {
            "title": "Project 2",
            "time_period" : "2020 - 2021",
            "description": "This is a description of project 2",
            "image": "project2.jpg",
            "link": "https://www.google.com", 
            "code": "google.com",
            "languages": ["Python", "JavaScript", "HTML", "CSS", "Svelte"],
            "finished" : true
        },
        "project3": {
            "title": "Project 3",
            "time_period" : "2019 - 2020",
            "description": "This is a description of project 3",
            "image": "project3.jpg",
            "link": "https://www.google.com", 
            "code" : "google.com",
            "languages": ["Python", "JavaScript", "HTML", "CSS", "Svelte"],
            "finished" : false
        }
    }
</script>

<div class="section">
    <PageTitle title="Projects"></PageTitle>
</div>
<div class="mt-12 mx-auto sm:px-8 lg:px-16 max-w px-0 ">
    {#each Object.entries(projects) as [key, project]}
        <Project {project} />
    {/each}
</div>