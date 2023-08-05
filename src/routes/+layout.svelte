<script>
	// Custom Skeleton theme
	import '../theme.postcss';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// All other imports
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte'
	import Menu from '$lib/components/Menu.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import HomeButton from '../lib/components/HomeButton.svelte';
	import PageTransition from '../lib/components/Transition.svelte';
	export let data;
	import { onMount } from 'svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import * as info from '$lib/js/info.js'
	import BooksButton from '../lib/components/BooksButton.svelte';

	let link;

	// Apply correct PrismJS theme based on theme
	onMount(() => {
		link = document.createElement('link');
		link.rel = 'stylesheet';

		// We'll apply the correct theme immediately on mount
		link.href = $modeCurrent ? '/css/prism.css' : '/css/prismDark.css';
		document.head.appendChild(link);
	});

	$: {
		if (link) { // Make sure that the link element has been created
		if ($modeCurrent) {
			link.href = '/css/prism.css';
		} else {
			link.href = '/css/prismDark.css';
		}
		}
	}
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
	<link rel="manifest" href="/favicon/site.webmanifest">
</svelte:head>

	<AppShell>

		<svelte:fragment slot="header">

		</svelte:fragment>
	
		<svelte:fragment slot="pageHeader">
			<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-surface-50-900-token max-w-6xl mx-auto" padding="pt-4 px-6 screen-5xl:px-0">
				<svelte:fragment slot="lead">
					<a href="/" class="text-2xl font-semibold whitespace-nowrap hover:underline" title="Visit homepage">{info.title}</a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<Menu>
						<HomeButton />
						<ThemeToggle />
						<BooksButton />
					</Menu>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
	
		<!-- Router Slot -->
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	
		<!-- (footer) -->
		<svelte:fragment slot="pageFooter">
			<Footer />
		</svelte:fragment>

	</AppShell>

