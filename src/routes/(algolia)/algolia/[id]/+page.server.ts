import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async  ({ params }) => {

	let res = await fetch(`https://cos-express-api-upgrade.web.app/whatson/events/dynamic?eventids=${params.id}`);

	if (!res.ok) {
        throw error(404, {
            message: res.statusText
        });
    }

	const { data } = await res.json();


	return {
		post: data[0],
	};
}) satisfies PageServerLoad;