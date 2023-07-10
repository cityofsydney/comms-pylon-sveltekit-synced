<script lang='ts'>



import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { popup } from '@skeletonlabs/skeleton';
import type { PopupSettings } from '@skeletonlabs/skeleton';

import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

const popupFeatured: PopupSettings = {
	// Represents the type of event that opens/closed the popup
	event: 'click',
	// Matches the data-popup value on your popup element
	target: 'popupFeatured',
	// Defines which side of your trigger the popup will appear
	placement: 'top',
};


let comboboxValue: string;

const popupCombobox: PopupSettings = {
	event: 'focus-click',
	target: 'popupCombobox',
	placement: 'bottom',
	closeQuery: '.listbox-item'
};
				

import { setContext } from 'svelte';
    import { writable, derived  } from 'svelte/store';


export let data;

//console.log(data)

  // Create a store and update it when necessary...
  const events = writable([]);
	const one = writable([]);
	const two = writable([]);

	$: one.set(data.one)
	$: two.set(data.two)


 	$: events.set(data.two);

  // ...and add it to the context for child components to access
    setContext('events', events);

</script>

<!-- App Shell -->
<AppShell slotHeader="flex items-center justify-center" slotPageFooter="py-4 " slotFooter="py-16 flex items-center justify-center">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="py-16" background="bg-none">
			<svelte:fragment slot="lead">
				<strong class="text-4xl">Whats' On <span class="underline">nearby</span></strong>

				
					<button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
						<span class="capitalize">{comboboxValue ?? 'Trigger'}</span>
						<span>↓</span>
					</button>

					
<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxValue} name="medium" value="books">Books</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="movies">Movies</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="television">TV</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
					
			
			</svelte:fragment>
			
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
	
	<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
		<div><p>Feedbackform</p></div>
		<div class="arrow " />
	</div>

	<button class="btn variant-filled" use:popup={popupFeatured}>Feedback</button>
				
	</svelte:fragment>
	<svelte:fragment slot="footer">
	<img src="cos-logo.svg" alt="" class="w-48 ">
	</svelte:fragment>
</AppShell>
