<script>
	import { ScrollArea } from "$lib/shadcn/ui/scroll-area";
</script>

<div class="relative">
	<!-- Top fade gradient -->
	<div class="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
	
	<!-- ScrollArea with content -->
	<div class="relative">
		<ScrollArea {...$$restProps}>
			<slot />
		</ScrollArea>
	</div>
	
	<!-- Bottom fade gradient -->
	<div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
</div>

<style>
	/* Optional: Adjust the transition of the gradients */
	div :global(.from-background) {
		--tw-gradient-from: hsl(var(--background));
		--tw-gradient-to: hsl(var(--background) / 0);
	}
</style>