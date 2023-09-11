<script lang="ts">


	// SvelteKit Imports
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// +page.ts
	import type { PageData } from './$types';
	export let data: PageData;



	// When DOM mounted, scroll to bottom
	onMount(() => {
		console.log('Mounted');

	});

</script>

{data.post}

