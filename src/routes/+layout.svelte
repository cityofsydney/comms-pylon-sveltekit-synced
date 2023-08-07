<script lang="ts">
	export let data;

	// Stores
	import { nowShowingStore, allEventsStore, showFeedback } from '$lib/stores';
	allEventsStore.set(data);
	nowShowingStore.set($allEventsStore.eventsToday);

	// Local
	let showFeedbackDiv = $showFeedback;
	let buttonsDisabled = false;
	let showThanksDiv = false;
	let timer;

	import { fade, fly } from 'svelte/transition';

	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import {modifyURL} from '$lib/modifyURL';

/* 	import happy from '/happy.svg';
	import neutral from '/neutral.svg';
	import sad from '/sad.svg'; */

	//Handlers
	function toggleFeedbackDiv() {
		buttonsDisabled = false;
		showThanksDiv = false;
		clearTimeout(timer); // Clear the existing timer
		showFeedbackDiv = !showFeedbackDiv;
		if (showFeedbackDiv) {
			timer = setTimeout(() => {
				showFeedbackDiv = false;
			}, 20000); // 10 seconds
		}
	}

	function handleButtonClick() {
		showThanksDiv = true;
		buttonsDisabled = true;
		setTimeout(() => {
			showThanksDiv = false;
			showFeedbackDiv = false;
		}, 5000); // 10 seconds
	}
</script>

<!-- App Shell -->
<AppShell
	slotHeader="flex items-center justify-center"
	slotFooter="py-4 lg:py-16 flex items-center justify-center relative"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="pt-8 lg:pt-28 pb-4 lg:pb-16" background="bg-none">
			<svelte:fragment slot="lead">
				<h1 class="h1 text-xl lg:text-7xl">What&#8217;s On <span class="underline underline-offset-[9px]">Nearby</span></h1>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<img src="cos-logo.svg" alt="" class="w-[100px] lg:w-[400px]" />
	</svelte:fragment>
</AppShell>

<svelte:head>
	<!-- Google Tag Manager -->
	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-NHTS8DQ');
	</script>
	<!-- End Google Tag Manager -->

	{#each data.eventsToday as slide}
		<link rel="preload" as="image" href={modifyURL(slide.tileImageCloudinary[0].secure_url)} />
	{/each}
<!-- 	{#each data.eventsWeekend as slide}
		<link rel="preload" as="image" href={modifyURL(slide.tileImageCloudinary[0].secure_url)} />
	{/each}
	{#each data.eventsNextWeek as slide}
		<link rel="preload" as="image" href={modifyURL(slide.tileImageCloudinary[0].secure_url)} />
	{/each}  -->

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<style lang="postcss">
		.splide__track--nav > .splide__list > .splide__slide {
	
			border: 3px solid #202757
		} 

		.splide__track--nav > .splide__list > .splide__slide.is-active {
			@apply border-[#188838];
		}
		.splide__arrow {
			@apply bg-[#188838] h-12 w-12 opacity-100 outline-none;
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
