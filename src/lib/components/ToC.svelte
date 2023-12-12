<script>
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import {active_heading} from '$lib/js/stores'
    import {browser} from '$app/environment'
    export let allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    export let activeHeading = null
    export let title;
  
    let scrollY
    let headings = []

    function updateHeadings() {
      const nodes = [
        // Exclude h1 and h3 as those should be reserved for the post title and other purposes
        ...document.querySelectorAll(`article :where(${allowedHeadings.filter(h => h !== 'h1' && h !== 'h3').join(', ')}):not(#__sections)`)
      ]
      const depths = nodes.map((node) => Number(node.nodeName[1]))
      const minDepth = Math.min(...depths)
  
      // Initialize values for "depths" of headings
      let d0 = 1
      let d1 = 1
      let d2 = 1
  
      for (let i = 0; i < nodes.length; i++) {
          let prefix;
          let depth = depths[i] - minDepth;
  
          if(depth === 0) {
            // Reset levels 1 and 2 if previous depth was not 0
            if(depths[i - 1] !== 0) {
              d1 = 1
              d2 = 1
            }
            prefix = d0.toString()
            d0+=1
          } else if(depth === 1) {
            prefix = (d0 - 1).toString() + '.' + d1.toString()
            d1+=1
          } else if(depth === 2) {
            prefix = (d0 - 1).toString() + '.' + (d1 - 1) + '.' + d2
            d2+=1
          }
  
          headings[i] = {
            title: nodes[i].innerText,
            depth,
            node: nodes[i],
            prefix: prefix,
          }
      }
      // set first heading as active if null on page load
      if (activeHeading === null) {
        activeHeading = headings[0]
      }
    }
    onMount(() => {
      updateHeadings()
      setActiveHeading()
    })
    if (typeof window !== 'undefined') {
      page.subscribe(() => {
        updateHeadings()
        setActiveHeading()
      })
    }
    function setActiveHeading() {
      scrollY = window.scrollY
      const visibleIndex =
        headings.findIndex(
          (heading) => heading.node.offsetTop + heading.node.clientHeight > scrollY
        ) - 1
      activeHeading = headings[visibleIndex]
      const pageHeight = document.body.scrollHeight
      const scrollProgress = (scrollY + window.innerHeight) / pageHeight
      if (scrollProgress > 0.95) {
        activeHeading = headings[headings.length - 1]
      }
    }
  
    $: if(browser) {
        if(activeHeading === undefined || activeHeading === null) {
        $active_heading = title ? title : headings[0].title
      } else {
        $active_heading = activeHeading.title
      }
    }
    </script>
  
  <svelte:window on:scroll={setActiveHeading} />
  
    {#if headings.length > 0}
        <nav class="border text-sm hover:border-surface-900-50-token border-surface-200 dark:border-surface-600 rounded-none p-4 hover:text-surface-900 dark:hover:text-surface-50 dark:text-surface-600 text-surface-200 transition-colors duration-100">
            <ul class="">
            {#each headings as heading}
                <li
                class="heading list-none"
                class:active={activeHeading?.node === heading.node}
                style={`--depth: ${heading.depth}`}
                >
                <span class="mr-1 font-semibold">{heading.prefix}</span>
                <a class="hover:underline" href={`#${heading.node.id}`}>{heading.title}</a>
                </li>
            {/each}
            </ul>
        </nav>
    {/if}
  
  <style>
      .heading {
            margin-left: calc(var(--depth, 0) * 0.75rem);
        }
  </style>
  
  <!--
      <nav tabindex="0" class="collapse collapse-arrow bg-gray-100 text-black dark:bg-[#333] dark:text-white rounded mb-8 md:mb-12 not-prose px-4 sm:px-6 py-2 min-w-[50%]">
    <input type="checkbox" class="p-4 min-h-fit"> 
  
    <div id="__sections" class="collapse-title text-base text-base-content font-[500] p-0 m-0 dark:text-white">
        Table of Contents
    </div>
      
    <ul class="!pl-0 translate-y-2 collapse-content">
    {#each headings as heading}
        <li
        class="heading list-none my-1 text-sm font-normal transition-all"
        class:active={activeHeading?.node === heading.node}
        style={`--depth: ${heading.depth}`}
        >{heading.prefix}
        <a class="" href={`#${heading.node.id}`}>{heading.title}</a>
        </li>
    {/each}
    </ul>
  </nav>
  -->