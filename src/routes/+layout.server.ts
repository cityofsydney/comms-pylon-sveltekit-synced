//export const prerender = true;

import type { LayoutServerLoad } from './$types';
import { addQRcode } from '$lib/qrcode';
//import { get } from 'svelte/store'
//import { nowShowingStore, allEventsStore } from '$lib/stores';


async function fetchEvents(param: String) {
	console.log('fetching data')
	const response = await fetch(`https://cos-express-api.web.app/whatson/algolia-events/` + param);
	const json = await response.json();
	const qrcode = await addQRcode(json)
	return qrcode;
}

export const load = (async () => {
	console.log('Fire load')
	//const store = get(allEventsStore)
	//console.log(Object.keys(store).length)

	return {
		eventsToday: await fetchEvents('today'),
		//eventsWeekend: await fetchEvents('weekend'),
		//eventsNextWeek: await fetchEvents('next-week'),
	};

}) satisfies LayoutServerLoad;
