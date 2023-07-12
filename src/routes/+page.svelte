<script lang="ts">
	import '@splidejs/svelte-splide/css';

	import { onMount } from 'svelte';
	import { nowShowingStore, allEventsStore } from '$lib/stores';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	//Skeleton Popup
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { popup, storePopup } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	// Retrieve store
	$nowShowingStore; // read value with automatic subscription

	let main: Splide;
	let thumbs: SplideSlide;

	const options = {
		type: 'fade',
    lazyLoad: "sequential",
		speed: 600,
		perPage: 1,
		perMove: 1,
		arrows: false,
		pagination: false,
		gap: '1rem',
		width: 920,
		height: 920,
		pauseOnHover: false
	};

	const thumbsOptions = {
		type: 'loop',
    lazyLoad: "sequential",
		perMove: 1,
		autoplay: true,
		interval: 10000,
		rewind: false,
		gap: '1rem',
		pagination: false,
		width: 920,
		fixedWidth: 172,
		fixedHeight: 172,
		cover: true,
		focus: 'center',
		trimSpace: true,
		isNavigation: true,
		updateOnMove: true,
		pauseOnHover: false
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

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
		//state: (e: Record<string, boolean>) => console.log(e)
	};
	function handleDropdownChange(e) {




		const value = e.target.__value;

		switch (value) {
			case 'today':
				nowShowingStore.set($allEventsStore.eventsToday);
				break;
			case 'weekend':
				nowShowingStore.set($allEventsStore.eventsWeekend);
				break;
			case 'next-week':
				nowShowingStore.set($allEventsStore.eventsNextWeek);
				break;
		}
		//console.log(e)
	}

	const dates = [
		'2023-07-01',
		'2023-07-02',
		'2023-07-03',
		'2023-07-04',
		'2023-07-05',
		'2023-07-06',
		'2023-07-07',
		'2023-07-08',
		'2023-07-09',
		'2023-07-10',
		'2023-07-11',
		'2023-07-12',
		'2023-07-13',
		'2023-07-14',
		'2023-07-15',
		'2023-07-16',
		'2023-07-17',
		'2023-07-18',
		'2023-07-19',
		'2023-07-20',
		'2023-07-21',
		'2023-07-22',
		'2023-07-23',
		'2023-07-24',
		'2023-07-25',
		'2023-07-26',
		'2023-07-27',
		'2023-07-28',
		'2023-07-29',
		'2023-07-30',
		'2023-07-31'
	];

	const currentDate = new Date();

	const filteredDates = dates.filter((date) => {
		const dateObj = new Date(date);
		return dateObj >= currentDate;
	});

	//console.log(filteredDates);

	const weekendDates = filteredDates.filter((date) => {
		const dayOfWeek = new Date(date).getDay();
		return dayOfWeek === 6 || dayOfWeek === 0;
	});

	console.log(weekendDates); //

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
			console.log(main.splide);
		}
	});
</script>

<div class="container h-full mx-auto flex justify-center items-start">
	<div class="flex flex-col gap-y-12 items-center">
		<Splide bind:this={main} {options}>
			{#each $nowShowingStore as slide}
				<SplideSlide class="relative">
					<div
						class="w-full h-[70%] block absolute left-0 top-0 bg-gradient-to-t from-transparent to-black"
					/>
					<div class="absolute top-0 p-12 w-full flex flex-col">
						<p class="text-white text-6xl leading-tight mb-5">{slide.name}</p>
						<p class="text-white text-3xl mb-5">{slide.strapline}</p>
						<p class="text-white text-2xl flex items-center gap-2">
							{slide.upcomingDate} |
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
						<div class="w-[100px] leading-none mb-3">Scan QR code for more info</div>
						<img src={slide.qrcode} class="w-[100px]" alt="" />
					</div>
					<img
          data-splide-lazy={slide.tileImageCloudinary[0].secure_url}
						alt={slide.name}
						class="object-cover"
					/>
				</SplideSlide>
			{/each}
		</Splide>

		<div class="flex gap-10 items-center w-full">
			<div class="flex gap-10 items-center">
				<h2 class="h1 text-white text-4xl">What&#8217;s On</h2>
				<button
					class="btn btn-lg bg-green-700 w-48 justify-between text-white"
					use:popup={popupCombobox}
				>
					<span class="capitalize">{comboboxValue ?? 'Today'}</span>
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
					class="card w-48 shadow-xl rounded-xl py-2 z-10 bg-primary-500"
					data-popup="popupCombobox"
				>
					<ListBox class="text-white ">
						<ListBoxItem
							active="bg-green-700"
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="today">Today</ListBoxItem
						>
						<ListBoxItem
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="weekend">This weekend</ListBoxItem
						>
						<ListBoxItem
							bind:group={comboboxValue}
							on:change={handleDropdownChange}
							name="medium"
							value="next-week">Next week</ListBoxItem
						>
					</ListBox>
					<!-- 	<div class="arrow bg-surface-100-800-token" /> -->
				</div>
			</div>
			<div class="ml-auto flex gap-4 items-center">
				<div class="shrink">
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
					<div class="text-xl font-bold h6 tracking-widest">This pylon is interactive</div>
					<div class="text-xl">Touch events below to explore</div>
				</div>
			</div>
		</div>

		<Splide
			on:click={(e) => {
				console.log(e.detail);
			}}
			options={thumbsOptions}
			bind:this={thumbs}
		>
			{#each $nowShowingStore as slide}
				<SplideSlide data="boss" class="relative">
					<img data-splide-lazy={slide.tileImageCloudinary[0].secure_url} alt={slide.name} class="" />
					<div
						class="w-full h-[75%] block absolute bottom-0 bg-gradient-to-b from-transparent to-[#041C2C]"
					/>
					<div class="absolute bottom-5 left-5 text-base">
						{slide.name}
					</div>
				</SplideSlide>
			{/each}
		</Splide>

		<div class="flex w-full items-center">
			<div class="flex flex-col">
				<div class="text-2xl">Powered by What’s On</div>
				<div class="text-3xl">whatson.sydney</div>
			</div>
			<div class="ml-auto">
				<button class="btn btn-lg h6 bg-yellow-400 text-black"
					><span
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
							><path
								fill="#041C2C"
								d="M22 1h-7a2.44 2.44 0 0 0-2.41 2l-.92 5.05a2.44 2.44 0 0 0 1.373 2.647 2.47 2.47 0 0 0 1.037.233H17l-.25.66a3.26 3.26 0 0 0 3 4.41.999.999 0 0 0 .92-.59l2.24-5.06A1 1 0 0 0 23 10V2a1 1 0 0 0-1-1Zm-1 8.73-1.83 4.13a1.33 1.33 0 0 1-.45-.4 1.23 1.23 0 0 1-.14-1.16l.38-1a1.68 1.68 0 0 0-.2-1.58A1.7 1.7 0 0 0 17.35 9h-3.29a.46.46 0 0 1-.35-.16.5.5 0 0 1-.09-.37l.92-5A.441.441 0 0 1 15 3h6v6.73ZM9.94 13.05H7.05l.25-.66A3.26 3.26 0 0 0 4.25 8a1 1 0 0 0-.92.59l-2.24 5.06a1 1 0 0 0-.09.4v8a1 1 0 0 0 1 1h7a2.44 2.44 0 0 0 2.41-2l.92-5a2.44 2.44 0 0 0-.53-2 2.47 2.47 0 0 0-1.86-1Zm-.48 7.58A.44.44 0 0 1 9 21H3v-6.73l1.83-4.13c.179.097.333.234.45.4a1.23 1.23 0 0 1 .14 1.16l-.38 1a1.68 1.68 0 0 0 .2 1.58 1.7 1.7 0 0 0 1.41.74h3.29a.458.458 0 0 1 .35.16.5.5 0 0 1 .09.37l-.92 5.08Z"
							/></svg
						></span
					><span>Give feedback</span></button
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
