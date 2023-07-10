import type { LayoutServerLoad } from './$types';

async function fetchEvents(param: String) {
	const response = await fetch(`https://cos-express-api.web.app/whatson/algolia-events/` + param);
	const data = await response.json();
	return data;
}

export const load = (async () => {
	return {
		eventsToday: await fetchEvents('today'),
		eventsWeekend: await fetchEvents('weekend'),
		eventsNextWeek: await fetchEvents('next-week'),
	};
}) satisfies LayoutServerLoad;
