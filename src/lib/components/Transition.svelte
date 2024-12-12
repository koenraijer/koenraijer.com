<script lang="ts">
	import { Motion } from 'svelte-motion';
	
	export let url: string;
  
	const pageTransitionVariants = {
	  initial: {
		opacity: 0,
		y: 100,
		scale: 0.95,
	  },
	  enter: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
		  duration: 0.3,
		  ease: [0.4, 0, 0.2, 1],
		  opacity: { duration: 0.4 },
		  y: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
		  scale: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
		}
	  },
	  exit: {
		opacity: 0,
		y: -100,
		scale: 0.95,
		transition: {
		  duration: 0.3,
		  ease: [0.4, 0, 0.3, 1],
		  opacity: { duration: 0.3 },
		  y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
		  scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
		}
	  }
	};
  </script>
  
  {#key url}
	<Motion
	  initial="initial"
	  animate="enter"
	  exit="exit"
	  let:motion
	>
	  <div 
		use:motion 
		class="min-h-full w-full rounded-lg overflow-hidden bg-background shadow-none transition-shadow duration-300 ease-out data-[state=enter]:shadow-lg"
	  >
		<Motion
		  initial="initial"
		  animate="enter"
		  exit="exit"
		  variants={pageTransitionVariants}
		  let:motion
		>
		  <div 
			use:motion 
			class="h-full w-full"
		  >
			<slot />
		  </div>
		</Motion>
	  </div>
	</Motion>
  {/key}
  
  <style>
	:global(body) {
	  overflow-x: hidden;
	}
  </style>