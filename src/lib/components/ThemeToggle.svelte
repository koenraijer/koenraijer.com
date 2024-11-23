<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';
	import { toggleMode, mode } from 'mode-watcher';
	
	const sunVariants = {
	  light: { 
		rotate: -360,
		scale: 0,
		opacity: 0,
		transition: { duration: 0.5, ease: "easeInOut" }
	  },
	  dark: { 
		rotate: 0,
		scale: 1,
		opacity: 1,
		transition: { duration: 0.5, ease: "easeInOut" }
	  }
	};
	
	const moonVariants = {
	  light: { 
		rotate: 0,
		scale: 1,
		opacity: 1,
		transition: { duration: 0.5, ease: "easeInOut" }
	  },
	  dark: { 
		rotate: 360,
		scale: 0,
		opacity: 0,
		transition: { duration: 0.5, ease: "easeInOut" }
	  }
	};
	
	const rayVariants = {
	  light: { 
		opacity: 0,
		scale: 0,
		transition: { duration: 0.3 }
	  },
	  dark: { 
		opacity: 1,
		scale: 1,
		transition: { duration: 0.3 }
	  }
	};
  
	const sunHoverVariants = {
	  scale: 0.9,
	  transition: {
		type: "spring",
		stiffness: 400,
		damping: 10
	  }
	};
  
	const rayHoverVariants = {
	  scale: 1.2,
	  transition: {
		type: "spring",
		stiffness: 400,
		damping: 17
	  }
	};
  
	const moonHoverVariants = {
	  rotate: 45,
	  transition: {
		type: "spring",
		stiffness: 300,
		damping: 10,
		mass: 1.2
	  }
	};
	
	let isAnimating = false;
	
	function handleToggle() {
	  if (!isAnimating) {
		isAnimating = true;
		toggleMode();
		setTimeout(() => isAnimating = false, 500);
	  }
	}
	
	const handleHover = () => {
	  // Return empty object if animating to prevent hover during transition
	  if (isAnimating) return {};
	  
	  if ($mode === 'dark') {
		return sunHoverVariants;
	  }
	  return moonHoverVariants;
	};
  
	const handleRayHover = () => {
	  if (isAnimating || $mode === 'light') return {};
	  return rayHoverVariants;
	};
  </script>
  
  <button
	on:click={handleToggle}
	class="transition-colors decoration-none inline-flex justify-center items-center rounded-full h-7 w-7 group relative hover:bg-muted hover:text-foreground text-muted-foreground"
	role="switch"
	aria-checked={$mode === 'dark'}
	aria-label="Theme Toggle"
	title="Toggle theme"
  >
	<div class="relative w-4 h-4">
	  <!-- Sun with Rays -->
	  <Motion
		animate={$mode === 'dark' ? 'dark' : 'light'}
		variants={sunVariants}
		whileHover={handleHover}
		let:motion
	  >
		<div use:motion class="absolute inset-0">
		  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4" fill="currentColor">
			<rect width="256" height="256" fill="none" />
			<circle
			  cx="128"
			  cy="128"
			  r="60"
			  fill="none"
			  stroke="currentColor"
			  stroke-linecap="round"
			  stroke-linejoin="round"
			  stroke-width="24"
			/>
			{#each Array(8) as _, i}
			  <Motion
				animate={$mode === 'dark' ? 'dark' : 'light'}
				variants={rayVariants}
				whileHover={handleRayHover}
				custom={i} 
				let:motion
			  >
				<g use:motion>
				  <line
					transform={`rotate(${i * 45} 128 128)`}
					x1="128"
					y1="28"
					x2="128"
					y2="20"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="24"
				  />
				</g>
			  </Motion>
			{/each}
		  </svg>
		</div>
	  </Motion>
  
	  <!-- Moon -->
	  <Motion
		animate={$mode === 'dark' ? 'dark' : 'light'}
		variants={moonVariants}
		whileHover={handleHover}
		let:motion
	  >
		<div use:motion class="absolute inset-0">
		  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4" fill="currentColor">
			<rect width="256" height="256" fill="none" />
			<path
			  d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
			  fill="none"
			  stroke="currentColor"
			  stroke-linecap="round"
			  stroke-linejoin="round"
			  stroke-width="24"
			/>
		  </svg>
		</div>
	  </Motion>
	</div>
  </button>