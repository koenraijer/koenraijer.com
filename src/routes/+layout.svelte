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
</script>

<AppShell>
	<svelte:fragment slot="header">Header</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-surface-200">
			<svelte:fragment slot="lead">
				Hi
			</svelte:fragment>
				<!--(title)-->
				Koen Raijer
			<svelte:fragment slot="trail">
				<!--(actions)-->
				<ThemeToggle />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>
