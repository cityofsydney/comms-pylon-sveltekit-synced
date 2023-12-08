<script lang="ts">
	// SvelteKit Imports
	import { onMount } from 'svelte';
	// Stores
	//import { emergencyData, emergencyStatus } from '$lib/stores';

	// +page.ts
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ items } = data);

	$: console.log(items)
	onMount(() => {
		console.log('Mounted');
	});
</script>

<div
	class="flex flex-col bg-origin-border bg-left-top bg-[url('/img/sydnye-bg.png')] bg-no-repeat bg-cover h-full pl-48 pr-44 pt-52 pb-72"
>
	<div class="flex flex-col max-h-full h-full">
		<h1 class="text-8xl leading-tight">Vantage point live updates</h1>

		<div class="grid grid-cols-2 w-full mt-24 text-4xl items-start">
			{#each items as item}
				<div class="py-4">{item.title.replace("Royal Botanic Garden Sydney:", "")}</div>
				<div class="py-4 text-right flex items-center justify-end">

					{item.statusAlert === 'Almost full'
						? 'Almost full'
						: item.statusAlert === 'Full'
						? 'Full'
						: 'Open'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						class="text-green-500 ml-8 w-10 h-10 {item.statusAlert === 'Almost full'
							? 'text-orange-500'
							: item.statusAlert === 'Full'
							? 'text-red-700'
							: 'text-green-500'}"
						><path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
						/></svg
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="sr-only">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		class=" text-green-500 ml-8 w-10 h-10"
		><path
			fill="currentColor"
			d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
		/></svg
	>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		class=" text-orange-500 ml-8 w-10 h-10"
		><path
			fill="currentColor"
			d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
		/></svg
	>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		class=" text-red-800 ml-8 w-10 h-10"
		><path
			fill="currentColor"
			d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
		/></svg
	>
</div>
