<script>
	
    import { onMount } from 'svelte';
    import { modeCurrent, setModeUserPrefers, setModeCurrent, setInitialClassState, getModeOsPrefers } from '@skeletonlabs/skeleton';

    // Props
    /** Provide classes to set the light background color. */
    export let bgLight = 'bg-surface-50';
    /** Provide classes to set the dark background color. */
    export let bgDark = 'bg-surface-900';
    /** Provide classes to set the light SVG fill color. */
    export let fillLight = 'fill-surface-50';
    /** Provide classes to set the dark SVG fill color. */
    export let fillDark = 'fill-surface-900';
    /** Provide classes to set width styles. */
    export let width = 'w-8';
    /** Provide classes to set height styles. Should be half of width. */
    export let height = 'h-8';
    /** Provide classes to set ring styles. */
    export let ring = 'ring-[1px] ring-surface-500/30';
    /** Provide classes to set border radius styles. */
    export let rounded = 'rounded-md';

    // Classes
    const cTransition = `transition-all duration-[200ms]`;
    const cTrack = 'cursor-pointer';
    const cThumb = 'aspect-square scale-[0.8] flex justify-center items-center';
    const cIcon = 'w-5 h-5';

	function onToggleHandler() {
		$modeCurrent = !$modeCurrent;
		setModeUserPrefers($modeCurrent);
		setModeCurrent($modeCurrent);
	}

	// A11y Input Handlers
	function onKeyDown(event) {
		// Enter/Space triggers selection event
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault();
			event.currentTarget.click();
		}
	}

	// Lifecycle
	onMount(() => {
		// Sync lightswitch with the theme
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});

	// State
	$: trackBg = $modeCurrent === true ? bgLight : bgDark;
	$: iconFill = $modeCurrent === true ? fillLight : fillDark;
	// Reactive
	$: classesTrack = `${cTrack} ${cTransition} ${width} ${height} ${ring} ${rounded} ${trackBg} ${$$props.class ?? ''}`;
	$: classesIcon = `${cIcon} ${iconFill}`;
</script>

<svelte:head>
	<!-- Workaround for a svelte parsing error: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<button 
    on:click={onToggleHandler} 
    on:keydown={onKeyDown} 
    class="{classesTrack} transition-colors decoration-none flex justify-center items-center hover:bg-surface-hover-token"
    role="switch"
    aria-label="Light Switch"
    aria-checked={$modeCurrent}
    title="Toggle {$modeCurrent === true ? 'Dark' : 'Light'} Mode"
    tabindex="0"
>
    {#if $modeCurrent}
    <!--Show moon-->
    <svg xmlns="http://www.w3.org/2000/svg" class="{classesIcon}" fill="currentColor" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"></rect>
        <path d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path>
    </svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="{classesIcon}" fill="currentColor" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"></rect>
        <circle cx="128" cy="128" r="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle>
        <line x1="128" y1="28" x2="128" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="198.7" y1="57.3" x2="204.4" y2="51.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="228" y1="128" x2="236" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="198.7" y1="198.7" x2="204.4" y2="204.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="128" y1="228" x2="128" y2="236" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="57.3" y1="198.7" x2="51.6" y2="204.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="28" y1="128" x2="20" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="57.3" y1="57.3" x2="51.6" y2="51.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
    </svg>
    {/if}
</button>
