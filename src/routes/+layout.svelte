<script>
	// CSS imports
		// Custom Skeleton theme
		import '../theme.postcss';
		// This contains the bulk of Skeletons required styles:
		import '@skeletonlabs/skeleton/styles/skeleton.css';
		// Most of your app wide CSS should be put in this file
		import '../app.postcss';
	
	// All other imports
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import PageTransition from '../lib/components/Transition.svelte';
	export let data;
</script>

	<AppShell>

		<svelte:fragment slot="header">

		</svelte:fragment>
	
		<svelte:fragment slot="pageHeader">
			<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-surface-50-900-token max-w-5xl mx-auto" padding="p-4 px-6 sm:px-8 screen-5xl:px-0">
				<svelte:fragment slot="lead">
					<a href="/" class="text-2xl font-semibold">Koen Raijer</a>
				</svelte:fragment>
					<!--(title)-->
				<svelte:fragment slot="trail">
					<!--(actions)-->
					<ThemeToggle />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
	
		<!-- Router Slot -->
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	
		<!-- (footer) -->
		<svelte:fragment slot="pageFooter">
			<div class="mx-auto w-full py-8 max-w-xs flex justify-between text-surface-500">
				<span>
					© {new Date().getFullYear()} <a href="/" class="hover:underline">Koen Raijer</a>
				</span>
				<a href="/rss.xml" class="hover:underline">RSS</a>
				<a href="https://github.com/koenraijer/koenraijer.2.0" class="hover:underline">Source</a>
			</div>
		</svelte:fragment>

	</AppShell>

