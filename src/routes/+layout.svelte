<script lang="ts">
	export let data;
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
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
	slotFooter="py-16 flex items-center justify-center"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="pt-28 pb-16" background="bg-none">
			<svelte:fragment slot="lead">
				<h1 class="h1 text-7xl">Whats&#8217; On <span class="underline">Nearby</span></h1>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<img src="cos-logo.svg" alt="" class="w-[400px]" />
	</svelte:fragment>
</AppShell>

<svelte:head>
	<style>
		.splide__track--nav > .splide__list > .splide__slide.is-active {
			@apply border-[#188838];
		}
		.splide__arrow {
			@apply bg-[#188838] h-12 w-12 opacity-100;
		}
		.splide__arrow--next {
			@apply -right-[4rem] animate-pulse;
		}
		.splide__arrow--prev {
			@apply -left-[4rem] animate-pulse;
		}
		.splide__arrow svg {
			@apply text-white fill-white;
		}
	</style>
</svelte:head>
