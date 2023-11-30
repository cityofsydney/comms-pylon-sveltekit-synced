<script lang="ts">
	// SvelteKit Imports
	import { onMount } from 'svelte';

	import { PUBLIC_EMERGENCY_SCREENS_DATOCMS_API_TOKEN } from '$env/static/public';
	import { subscribeToQuery } from 'datocms-listen';

	// Stores
	import { emergencyData, emergencyStatus } from '$lib/stores';

	// +page.ts
	import type { PageData } from './$types';
	export let data: PageData;



	let promise = getRealTimeData();

	async function getRealTimeData() {
		const unsubscribe = await subscribeToQuery({
			query: `query MyQuery {
				message {
						title
						content
						id
				}
			}`,
			variables: { first: 1 },
			token: PUBLIC_EMERGENCY_SCREENS_DATOCMS_API_TOKEN,
			preview: true,
			
			onUpdate: (update) => {
				// response is the GraphQL response
				//console.log(update.response.data);
				const data = update.response.data;
				console.log(data)
				emergencyData.set(data.message);
				///return data.message
			},
			onStatusChange: (status) => {
				// status can be "connected", "connecting" or "closed"
				console.log(status);
				emergencyStatus.set(status);
			},
			onChannelError: (error) => {
				console.error(error);
			},
			onError: (error) => {
				console.log(error.message);
			},
			onEvent: (event) => {
				console.log('event: ',event)
			}
		});

		return unsubscribe.Response;
	}

	onMount(() => {
		console.log('Mounted');
	});
</script>

<div class="flex flex-col">

		{#await promise}
		<p>{$emergencyStatus}</p>
		{:then success}
		<h1 class="text-8xl leading-none mb-16 h2 !font-normal">{$emergencyData.title}</h1>
		<p class="text-7xl leading-tight mb-8">{$emergencyData.content}</p>
		{:catch error}
		<p style="color: red">{error.message}</p>
		{/await}

</div>


