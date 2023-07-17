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
	slotFooter="py-16 flex items-center justify-center relative"
>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="pt-28 pb-16" background="bg-none">
			<svelte:fragment slot="lead">
				<h1 class="h1 text-7xl">What&#8217;s On <span class="underline underline-offset-8">Nearby</span></h1>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">


		{#if showFeedbackDiv}
			<div
				in:fly={{ y: 100, duration: 300 }}
				out:fade
				class="absolute top-0 left-0 right-0 bottom-0 bg-[#041C2C] z-10 flex items-start"
			>
				<div class="px-12 mx-12 grid grid-cols-2 gap-4 w-full py-12">
					<div class="flex items-center space-x-8">
						<button id="btnHappy" disabled={buttonsDisabled} on:click={handleButtonClick}
							>
							<svg id="imgHappy" class="active:scale-125 text-3xl" width="27" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M16.648 16.973a5.014 5.014 0 0 1-6.293 0 1.335 1.335 0 1 0-1.707 2.053 7.573 7.573 0 0 0 9.707 0 1.335 1.335 0 1 0-1.707-2.053Zm-7.147-4.307a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm8-2.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-4-9.333a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Z" fill="#8CE0AA" /></svg>
							</button
						>
						<button id="btnNeutral" disabled={buttonsDisabled} on:click={handleButtonClick}
							>
							<svg width="27" height="28" class="active:scale-125" id="imgNeutral" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M9.501 12.666a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm8 4h-8a1.334 1.334 0 0 0 0 2.667h8a1.333 1.333 0 0 0 0-2.667Zm0-6.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-4-9.333a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Z" fill="#FEFADD" /></svg>
							</button
						>
						<button id="btnAngry" disabled={buttonsDisabled} on:click={handleButtonClick}
							>
							<svg width="27" height="28" class="active:scale-125" id="imgAngry" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.648 18.44a1.333 1.333 0 0 0-.173 1.866 1.333 1.333 0 0 0 1.88.173 5.013 5.013 0 0 1 6.293 0 1.335 1.335 0 0 0 1.88-.173 1.333 1.333 0 0 0-.173-1.867 7.746 7.746 0 0 0-9.707 0Zm.853-5.774a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm4-12a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Zm4-14.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Z" fill="#EE9AB4" /></svg>
							</button
						>
					</div>
					<div class="col-span-2 order-last">
						{#if showThanksDiv}<p in:fade class="text-white">Thank you for your feedback</p>{/if}
					</div>
					<div class="flex items-center">
						<p class="text-white font-semibold text-xl">
							Let us know what you think. Scan the QR code to take the survey
						</p>
						<div>
							<div class="h-20 w-20 p-1 bg-white">
								<!-- <img src={} alt="" /> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<img src="cos-logo.svg" alt="" class="w-[400px]" />
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
	{#each data.eventsWeekend as slide}
		<link rel="preload" as="image" href={modifyURL(slide.tileImageCloudinary[0].secure_url)} />
	{/each}
	{#each data.eventsNextWeek as slide}
		<link rel="preload" as="image" href={modifyURL(slide.tileImageCloudinary[0].secure_url)} />
	{/each} 

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
