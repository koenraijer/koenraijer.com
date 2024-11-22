<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { elasticOut, cubicInOut } from 'svelte/easing';
	import { toggleMode, mode } from 'mode-watcher';
  
	let isAnimating = false;
	const rayOpacities = writable(Array(8).fill(1));
  
	const rotation = tweened(0, {
	  duration: 200,
	  easing: elasticOut
	});
  
	const sunScale = tweened(1, {
	  duration: 150,
	  easing: elasticOut
	});
  
	const moonOpacity = tweened(0, {
	  duration: 300,
	  easing: cubicInOut
	});
  
	const rayScale = tweened(1, {
	  duration: 150,
	  easing: elasticOut
	});
  
	const hoverRotation = tweened(0, {
	  duration: 100,
	  easing: elasticOut
	});
  
	let sunHoverTimeout: NodeJS.Timeout;
	let moonBounceInterval: NodeJS.Timeout;
  
	function animateRays(show: boolean) {
	  const currentOpacities = Array(8).fill(show ? 0 : 1);
	  for(let i = 0; i < 8; i++) {
		setTimeout(() => {
		  currentOpacities[i] = show ? 1 : 0;
		  rayOpacities.set(currentOpacities);
		}, i * 50 + (show ? 200 : 0));
	  }
	}
  
	function handleMouseEnter() {
	  if ($mode === 'light') {
		clearInterval(moonBounceInterval);
		let bounceCount = 0;
		let direction = 1;
  
		const bounce = () => {
		  if (bounceCount >= 4) {
			clearInterval(moonBounceInterval);
			hoverRotation.set(0);
			return;
		  }
		  hoverRotation.set(45 * direction);
		  direction *= -1;
		  bounceCount++;
		};
  
		bounce();
		moonBounceInterval = setInterval(bounce, 150);
	  } else {
		rayScale.set(1.2).then(() => {
		  rayScale.set(1, { duration: 300, easing: elasticOut });
		});
		sunScale.set(0.85).then(() => {
		  sunScale.set(1, { duration: 300, easing: elasticOut });
		});
	  }
	}
  
	function onToggleHandler() {
		if (!isAnimating) {
			isAnimating = true;
			toggleMode();
			
			if ($mode === 'light') {
			const sunOpacity = tweened(1, { duration: 200, easing: cubicInOut });
			sunOpacity.set(0);
			moonOpacity.set(0);
			animateRays(false);
			rotation.set(-440)
				.then(() => {
				moonOpacity.set(1);
				rotation.set(0);
				});
			} else {
			moonOpacity.set(0);
			rotation.set(0);
			animateRays(true);
			}

			setTimeout(() => isAnimating = false, 500);
		}
		}
  
	function handleMouseLeave() {
	  if ($mode === 'dark') {
		clearInterval(moonBounceInterval);
		hoverRotation.set(0);
	  } else {
		rayScale.set(1, { duration: 300, easing: elasticOut });
		sunScale.set(1, { duration: 300, easing: elasticOut });
	  }
	}
  
	onMount(() => {
	  rotation.set($mode === 'dark' ? 0 : 0, { duration: 0 });
	  moonOpacity.set($mode === 'dark' ? 0 : 1, { duration: 0 });
	  rayOpacities.set(Array(8).fill($mode === 'dark' ? 1 : 0));
	});
  
	onDestroy(() => {
	  clearInterval(moonBounceInterval);
	  clearTimeout(sunHoverTimeout);
	});

  </script>
  
  <button
	on:click={onToggleHandler}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class="transition-colors decoration-none flex justify-center items-center rounded-full h-7 w-7 group relative hover:bg-muted hover:text-foreground text-muted-foreground"
	role="switch"
	aria-checked={$mode === 'dark'}
	aria-label="Theme Toggle"
	title="Toggle theme"
  >
	<div class="relative w-4 h-4 flex justify-center items-center">
	  <div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
		style="transform: translate(-50%, -50%) rotate({$rotation}deg)"
	  >
		<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
		  <rect width="256" height="256" fill="none"></rect>
		  <g
			class="origin-center transition-all duration-150 ease-out"
			style="transform: scale({$sunScale}); opacity: {$moonOpacity === 1 ? 0 : 1}"
		  >
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
		  </g>
		  {#each Array(8) as _, i (i)}
			<line
			  style="opacity: {$rayOpacities[i]}; transform: rotate({i * 45}deg) scale({$rayScale}); transform-origin: 128px 128px; transition: transform 150ms ease-out"
			  x1="128"
			  y1="28"
			  x2="128"
			  y2="20"
			  fill="none"
			  stroke="currentColor"
			  stroke-linecap="round"
			  stroke-linejoin="round"
			  stroke-width="24"
			></line>
		  {/each}
		</svg>
	  </div>
		<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 bg-background"
		style="transform: translate(-50%, -50%) rotate({$rotation + $hoverRotation}deg); opacity: {$moonOpacity}"
		>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<path d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path>
		</svg>
		</div>
	</div>
  </button>