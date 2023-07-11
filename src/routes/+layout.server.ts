import type { LayoutServerLoad } from './$types';
import {addQRcode} from '$lib/qrcode';

async function fetchEvents(param: String) {
	const response = await fetch(`https://cos-express-api.web.app/whatson/algolia-events/` + param);
	const res = await response.json();
	//const data = await addQRcode(res);
	return res;
}

export const load = (async () => {
	return {
		eventsToday: await fetchEvents('today'),
		eventsWeekend: await fetchEvents('weekend'),
		eventsNextWeek: await fetchEvents('next-week'),
	};
}) satisfies LayoutServerLoad;
