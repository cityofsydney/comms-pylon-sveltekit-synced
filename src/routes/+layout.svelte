<script lang="ts">
	export let data;

	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';


	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import { nowShowingStore, allEventsStore } from '$lib/stores';


	allEventsStore.set(data);

	nowShowingStore.set($allEventsStore.eventsToday);


</script>

<!-- App Shell -->
<AppShell
	slotHeader="flex items-center justify-center"
	slotPageFooter="py-4"
	slotFooter="py-16 flex items-center justify-center"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="py-16" background="bg-none">
			<svelte:fragment slot="lead">
				<strong class="text-7xl font-heading"
					>Whats' On <span class="underline">nearby</span></strong
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		

		
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<img src="cos-logo.svg" alt="" class="w-[400px]" />
	</svelte:fragment>
</AppShell>
