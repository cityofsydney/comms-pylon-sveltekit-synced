<script lang="ts">
  import '@splidejs/svelte-splide/css';

	import { onMount } from 'svelte';
	import { nowShowingStore, allEventsStore } from '$lib/stores';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  
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
		speed: 300,
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

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'top'
	};

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
				<SplideSlide class="rounded relative">
					<div
						class="w-full h-[50%] block absolute left-0 top-0 bg-gradient-to-t from-transparent to-black"
					/>
					<div class="absolute top-0 p-12 w-full flex flex-col">
						<h1 class="text-white font-heading text-6xl leading-tight mb-5">{slide.name}</h1>
					</div>
					<div class="absolute bottom-8 right-8">
						<img src={slide.qrcode} class="w-[100px] rounded" alt="" />
					</div>
					<img
						src={slide.tileImageCloudinary[0].secure_url}
						alt={slide.name}
						class="object-cover"
					/>
				</SplideSlide>
			{/each}
		</Splide>

    <div>
      <button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
        <span class="capitalize">{comboboxValue ?? 'Today'}</span>
        <span>↓</span>
      </button>
  
      <div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
        <ListBox rounded="rounded-none">
          <ListBoxItem
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
        <div class="arrow bg-surface-100-800-token" />
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
				<SplideSlide data="boss">
					<img src={slide.tileImageCloudinary[0].secure_url} alt={slide.name} />
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</div>

<style lang="postcss">
</style>
