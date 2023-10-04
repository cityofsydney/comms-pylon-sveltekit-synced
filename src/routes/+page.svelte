<script lang="ts">
	import '@splidejs/svelte-splide/css';

	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	//import { quintOut } from 'svelte/easing';

	import { onMount } from 'svelte';
	import { nowShowingStore, allEventsStore, showFeedback } from '$lib/stores';

	// Retrieve store
	$nowShowingStore; // read value with automatic subscription

	// Local
	let disabledIsRunning = false;
	let showText = true;
	let feedbackButtonText: string = 'Give feedback';
	let feedbackButtonTextAlt: string = 'Thank you!';
	let feedbackButton = feedbackButtonText;
	let buttonsDisabled: boolean = false;

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	//Skeleton Popup
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { popup, storePopup } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	import { formatDate } from '$lib/formatDate';
	import { modifyURL } from '$lib/modifyURL';

	let main: Splide;
	let thumbs: SplideSlide;

	const goptions = {
		lazyLoad: false,
		preloadPages: 20,
		pagination: false,
		gap: '1rem',
		width: 920,
		pauseOnHover: false
	};

	const options = {
		...goptions,
		type: 'fade',
		speed: 600,
		perPage: 1,
		perMove: 1,
		arrows: false,
		height: 920
	};

	const thumbsOptions = {
		...goptions,
		type: 'loop',
		autoplay: true,
		interval: 8000,
		rewind: false,
		cover: true,
		perPage: 4,
		perMove: 1,
		fixedHeight: 218,
		fixedWidth: 218,
		trimSpace: 'move',
		isNavigation: true,
		updateOnMove: true
	};

	storePopup.set({
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow
	});

	let comboboxValue: string;
	let display_unit_id = 'This is screen details testing';
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
		//state: (e: Record<string, boolean>) => console.log(e)
	};

	const popupFeedBack: PopupSettings = {
		event: 'click',
		target: 'popupFeedBack',
		placement: 'top'
		//closeQuery: 'button',
	};

	function handleDropdownChange(e) {
		showText = false;
		setTimeout(() => {
			//console.log('Delayed for 1 second.');
			showText = true;
		}, 500);

		const value = e.target.__value;

		switch (value) {
			case 'Today':
				nowShowingStore.set($allEventsStore.eventsToday);
				break;
			case 'This weekend':
				nowShowingStore.set($allEventsStore.eventsWeekend);
				break;
			case 'Next week':
				nowShowingStore.set($allEventsStore.eventsNextWeek);
				break;
		}
		//console.log(e)
	}

	function handlefeedbackBtnHandler() {
		//Data pUsh
		setTimeout(() => {
			console.log('clicking button');
			document.body.click();
		}, 10000);
	}
	function handleButtonClick(event) {
		display_unit_id = document.getElementById('screendetails').value;
		let buttonType = event.target.id;
		window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			event: buttonType
		});
		feedbackButton = feedbackButtonTextAlt;
		disabledIsRunning = true;
		buttonsDisabled = true;

		setTimeout(() => {
			feedbackButton = feedbackButtonText;
			buttonsDisabled = false;
			disabledIsRunning = false;
		}, 10000); // 10 seconds
	}

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
			console.log(main.splide);
		}
	});
</script>

<div class="container h-full mx-auto flex justify-center items-start">
	<div class="flex flex-col items-center min-h-[920px]">
		<div id="myDiv">testing</div>
		<input type="hidden" id="screendetails" value="" />
		<Splide bind:this={main} {options}>
			{#each $nowShowingStore as slide}
				<SplideSlide class="relative">
					<div
						class="w-full h-[70%] block absolute left-0 bottom-0 bg-gradient-to-b from-transparent to-black"
					/>
					<div class="absolute bottom-8 left-8 right-[12rem] flex flex-col">
						<h2 class="text-white text-6xl leading-none mb-5 h2 !font-normal">{slide.name}</h2>
						<p class="text-white text-4xl mb-5">{slide.strapline}</p>
						<p class="text-white text-2xl flex items-center">
							{formatDate(slide.upcomingDate)}
							{slide.eventUpcomingTime}<span class="px-2" />
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"
								><path
									fill="#fff"
									d="M26.614 12.916a11.334 11.334 0 0 0-17.547-8.36 11.413 11.413 0 0 0-5.013 8.36 11.28 11.28 0 0 0 3.28 9.107l7.066 7.08a1.332 1.332 0 0 0 1.894 0l7.04-7.08a11.28 11.28 0 0 0 3.28-9.107Zm-5.147 7.227-6.133 6.133L9.2 20.143a8.653 8.653 0 0 1-2.493-6.96 8.76 8.76 0 0 1 3.853-6.44 8.627 8.627 0 0 1 9.547 0 8.762 8.762 0 0 1 3.854 6.413 8.655 8.655 0 0 1-2.494 6.987ZM15.334 8.076a6 6 0 1 0 6 6 6.013 6.013 0 0 0-6-6Zm0 9.333a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666Z"
								/></svg
							>
							{slide.suburbName}
						</p>
					</div>
					<div class="absolute bottom-8 right-8">
						<div class="w-[100px] leading-none mb-2 text-sm">Scan QR code for more info</div>
						<img src={slide.qrcode} class="w-[100px]" alt="" />
					</div>
					<img
						src={modifyURL(slide.tileImageCloudinary[0].secure_url)}
						alt={slide.name}
						class="object-cover"
					/>
				</SplideSlide>
			{/each}
		</Splide>

		<div class="flex items-center justify-center w-full my-10">
			<!-- <div class="flex items-center">
				<h2 class="h1 text-white text-4xl mr-10">What&#8217;s On</h2>
				<button
					class="btn btn-lg bg-green-700 w-48 justify-between text-white outline-none"
					use:popup={popupCombobox}
				>
					<span class="h6">{comboboxValue ?? 'Today'}</span>
					<span
						><svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none"
							><path
								fill="#fff"
								d="m6.291 7.715-5.995-6a1 1 0 0 1 0-1.42 1 1 0 0 1 1.419 0C3.413 2.097 5.157 3.855 7.005 5.5L12.287.296a1.003 1.003 0 1 1 1.42 1.42L7.71 7.715a1 1 0 0 1-.33.21c-.243.1-.516.1-.759 0a1 1 0 0 1-.33-.21Z"
							/></svg
						>
					</span>
				</button>

				<div
					class="card w-48 shadow-xl rounded-xl py-2 z-10 !bg-green-700"
					data-popup="popupCombobox"
				>
					<ListBox class="text-white ">
						<ListBoxItem
							class="rounded-none"
							active="bg-green-700"
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="Today">Today</ListBoxItem
						>
						<ListBoxItem
							class="rounded-none"
							active="bg-green-700"
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="This weekend">This weekend</ListBoxItem
						>
						<ListBoxItem
							active="bg-green-700"
							class="rounded-none"
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="Next week">Next week</ListBoxItem
						>
					</ListBox>
					<div class="arrow bg-green" />
				</div>
			</div> -->
			<div class="flex items-center">
				<div class="shrink pr-5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						fill="none"
						class="animate-pulse"
						><g fill="#fff" clip-path="url(#a)"
							><path
								d="m37.965 19.563-3.297-5.104c-1.108-1.717-3.253-2.308-4.783-1.322a2.996 2.996 0 0 0-1.099 1.314 3.853 3.853 0 0 0-1.689-1.053c-.926-.274-1.854-.156-2.613.335a2.996 2.996 0 0 0-1.1 1.311c-1.174-1.234-2.972-1.575-4.302-.715-.469.302-.82.731-1.062 1.233l-3.514-5.441c-1.108-1.716-3.253-2.31-4.783-1.323-1.53.988-1.87 3.187-.761 4.903l8.85 13.701c-2.942-1.591-6.213-2.425-7.786-.857-.534.534-.828 1.232-.807 1.917.019.598.277 1.146.774 1.58l4.188 3.215a12.42 12.42 0 0 1 2.057 2.019c2.338 2.867 5.699 4.474 9.215 4.697 2.816.18 5.73-.529 8.298-2.187 3.009-1.942 5.105-4.905 5.904-8.34.8-3.447.2-6.957-1.69-9.883Zm-.005 9.489c-.695 2.994-2.526 5.577-5.152 7.274-5.031 3.247-11.573 2.324-15.222-2.149a14.133 14.133 0 0 0-2.346-2.3L11.096 28.7a.385.385 0 0 1-.14-.292c-.006-.203.105-.44.297-.631 1.152-1.15 5.9.66 9.072 3.459l.015-.018a.859.859 0 0 0 .505.234.87.87 0 0 0 .785-1.34L10.423 12.758c-.578-.896-.466-2.04.245-2.499.71-.459 1.799-.091 2.378.805l5.274 8.166v.001l2.418 3.743a.853.853 0 0 0 .276.262c.033.02.07.03.105.045a.845.845 0 0 0 .243.073c.018.003.034.015.052.016.043.003.087-.009.13-.012a.833.833 0 0 0 .102-.01.85.85 0 0 0 .673-.663.869.869 0 0 0-.12-.655l-2.419-3.744c-.296-.46-.422-.985-.354-1.48.06-.445.273-.807.6-1.017.712-.46 1.8-.09 2.378.804l1.317 2.04v.002l1.1 1.701c.07.107.164.197.275.262.034.022.071.03.108.047.076.035.156.06.238.071.019.003.035.016.054.017.045.003.09-.009.135-.013a.871.871 0 0 0 .096-.009.857.857 0 0 0 .296-.116.87.87 0 0 0 .258-1.202l-1.1-1.704a2.2 2.2 0 0 1-.353-1.478c.06-.445.273-.806.6-1.018.327-.21.744-.254 1.174-.128.48.142.907.474 1.204.933l1.977 3.062a.871.871 0 0 0 1.456.033.87.87 0 0 0 .005-.976l-.66-1.02c-.577-.896-.465-2.04.245-2.5.71-.457 1.8-.09 2.378.805l3.297 5.105c1.633 2.527 2.15 5.561 1.457 8.545Z"
							/><path
								d="M11.305 3.478c-4.316 0-7.826 3.511-7.826 7.826 0 3.995 3.01 7.294 6.879 7.763l-1.383-2.141a6.095 6.095 0 0 1-3.757-5.622 6.094 6.094 0 0 1 6.087-6.087 6.093 6.093 0 0 1 6.085 6.056h1.74c-.018-4.3-3.52-7.795-7.825-7.795Z"
							/><path
								d="M11.304 0C5.071 0 0 5.07 0 11.304S5.07 22.61 11.304 22.61c.431-.002.862-.029 1.29-.08l-1.08-1.67c-.07.001-.139.01-.21.01-5.274 0-9.565-4.29-9.565-9.565 0-5.274 4.291-9.565 9.565-9.565 5.264 0 9.547 4.274 9.564 9.534h1.74C22.59 5.054 17.527 0 11.303 0Z"
							/></g
						><defs><clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath></defs></svg
					>
				</div>
				<div>
					<div class="text-xl font-bold h6">This screen is interactive</div>
					<div class="text-xl">Touch events below to explore</div>
				</div>
			</div>
		</div>

		<Splide
			on:click={(e) => {
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					event: 'slideClick',
					slug: e.detail.Slide.slide.dataset.slug
				});

				setTimeout(function () {
					console.log('fake click');
					document.body.click();
				}, 30000);
			}}
			options={thumbsOptions}
			bind:this={thumbs}
		>
			{#each $nowShowingStore as slide}
				<SplideSlide data="boss" data-slug={slide.slug} class="relative rounded-xl overflow-hidden">
					<img
						src={modifyURL(slide.tileImageCloudinary[0].secure_url)}
						alt={slide.name}
						class="rounded-xl"
					/>
					<div
						class="w-full h-full block absolute -bottom-1 bg-gradient-to-b from-transparent to-black rounded-xl"
					/>
					{#if showText}
						<div
							in:fly={{ y: 200, duration: 500 }}
							out:fade
							class="absolute bottom-3 left-3 right-3 text-xl leading-tight h2"
						>
							{slide.name}
						</div>
					{/if}
				</SplideSlide>
			{/each}
		</Splide>

		<div class="flex w-full items-center my-10">
			<div class="flex flex-col">
				<div class="text-xl">Powered by whatson.sydney</div>
				<div class="text-2xl h3">List your event free</div>
			</div>
			<div class="ml-auto">
				<button
					on:click={handlefeedbackBtnHandler}
					use:popup={popupFeedBack}
					class="btn btn-lg w-52 h6 bg-yellow-400 text-black outline-none"
					><span
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
							><path
								fill="#041C2C"
								d="M22 1h-7a2.44 2.44 0 0 0-2.41 2l-.92 5.05a2.44 2.44 0 0 0 1.373 2.647 2.47 2.47 0 0 0 1.037.233H17l-.25.66a3.26 3.26 0 0 0 3 4.41.999.999 0 0 0 .92-.59l2.24-5.06A1 1 0 0 0 23 10V2a1 1 0 0 0-1-1Zm-1 8.73-1.83 4.13a1.33 1.33 0 0 1-.45-.4 1.23 1.23 0 0 1-.14-1.16l.38-1a1.68 1.68 0 0 0-.2-1.58A1.7 1.7 0 0 0 17.35 9h-3.29a.46.46 0 0 1-.35-.16.5.5 0 0 1-.09-.37l.92-5A.441.441 0 0 1 15 3h6v6.73ZM9.94 13.05H7.05l.25-.66A3.26 3.26 0 0 0 4.25 8a1 1 0 0 0-.92.59l-2.24 5.06a1 1 0 0 0-.09.4v8a1 1 0 0 0 1 1h7a2.44 2.44 0 0 0 2.41-2l.92-5a2.44 2.44 0 0 0-.53-2 2.47 2.47 0 0 0-1.86-1Zm-.48 7.58A.44.44 0 0 1 9 21H3v-6.73l1.83-4.13c.179.097.333.234.45.4a1.23 1.23 0 0 1 .14 1.16l-.38 1a1.68 1.68 0 0 0 .2 1.58 1.7 1.7 0 0 0 1.41.74h3.29a.458.458 0 0 1 .35.16.5.5 0 0 1 .09.37l-.92 5.08Z"
							/></svg
						></span
					><span>{feedbackButton}</span></button
				>
			</div>
		</div>
	</div>
</div>

<div class="card p-8 w-[240px] shadow-xl z-20 !bg-yellow-400" data-popup="popupFeedBack">
	<div class="space-y-6">
		<p class="text-black font-semibold text-2xl">Let us know what you think</p>
		<div class="flex items-center justify-evenly space-x-6">
			<button
				class="bg-white rounded-full p-2 shadow-md"
				disabled={buttonsDisabled}
				id="btnHappy"
				on:click={handleButtonClick}
			>
				<svg
					id="imgHappy"
					class="active:scale-125 fill-green-800"
					width="27"
					height="28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M16.648 16.973a5.014 5.014 0 0 1-6.293 0 1.335 1.335 0 1 0-1.707 2.053 7.573 7.573 0 0 0 9.707 0 1.335 1.335 0 1 0-1.707-2.053Zm-7.147-4.307a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm8-2.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-4-9.333a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Z"
					/></svg
				>
			</button>
			<button
				class="bg-white rounded-full p-2 shadow-md"
				disabled={buttonsDisabled}
				id="btnNeutral"
				on:click={handleButtonClick}
			>
				<svg
					width="27"
					height="28"
					class="active:scale-125 fill-orange-500"
					id="imgNeutral"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M9.501 12.666a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm8 4h-8a1.334 1.334 0 0 0 0 2.667h8a1.333 1.333 0 0 0 0-2.667Zm0-6.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-4-9.333a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Z"
					/></svg
				>
			</button>
			<button
				class="bg-white rounded-full p-2 shadow-md"
				disabled={buttonsDisabled}
				id="btnAngry"
				on:click={handleButtonClick}
			>
				<svg
					width="27"
					height="28"
					class="active:scale-125 fill-red-600"
					id="imgAngry"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M8.648 18.44a1.333 1.333 0 0 0-.173 1.866 1.333 1.333 0 0 0 1.88.173 5.013 5.013 0 0 1 6.293 0 1.335 1.335 0 0 0 1.88-.173 1.333 1.333 0 0 0-.173-1.867 7.746 7.746 0 0 0-9.707 0Zm.853-5.774a1.334 1.334 0 1 0 0-2.667 1.334 1.334 0 0 0 0 2.667Zm4-12a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.667 10.667 0 1 1 0-21.334 10.667 10.667 0 0 1 0 21.334Zm4-14.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Z"
					/></svg
				>
			</button>
		</div>

		<p class="text-xl text-black">Scan the QR code to take the survey</p>
		<figure class="flex items-center justify-center">
			<img src="/qrcode-survey.svg" width="104" height="104" alt="" class="p-1 bg-white" />
		</figure>
	</div>
	<div class="arrow bg-yellow-400" />
</div>
<svelte:head>
	<script>
		function BroadSignPlay() {
			if (typeof BroadSignObject !== 'undefined') {
				//display_unit_id = BroadSignObject['display_unit_id'];
				display_unit_id = BroadSignObject['display_unit_id'];
			} else {
				display_unit_id = '';
			}
			let screendetails = document.getElementById('screendetails');
			screendetails.value = display_unit_id;
		}
	</script>
</svelte:head>

<style lang="postcss">
</style>
