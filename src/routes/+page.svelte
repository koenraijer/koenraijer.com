<script>
	import Hero from '../lib/components/Hero.svelte';
	import { formatDate } from '$lib/utils'
	export let data
</script>

<Hero />

<section class="mt-8 mb-32">
	<div>

	</div>
	<ul class="">
		<div class="flex items-center">
			<hr class="!border-surface-900-50-token border-2 flex-grow "/>
			<h2 class="text-lg font-semibold flex-shrink-0 md:pl-8 pl-4">Recent posts</h2>
		</div>
		
		{#each data.posts as post}
			<a class="group" href={post.slug}>
				<li class="grid grid-cols-4 py-4 pb-6">
					<p class="date col-start-1 col-end-2 text-surface-400">{formatDate(post.date)}</p>
					<div class="col-start-2 col-end-5">
						<span class="text-lg font-semibold group-hover:underline">{post.title}</span>
						<p class="description pt-[0.37rem] text-surface-700-200-token">{post.description}</p>
					</div>
				</li>

				<hr class="!border-surface-200"/>
			</a>
		{/each}
	</ul>
</section>

