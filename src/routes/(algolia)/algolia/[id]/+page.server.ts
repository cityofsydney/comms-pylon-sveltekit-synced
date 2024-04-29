import type { PageServerLoad } from './$types';

export const load = (async  ({ params }) => {
	return {
		post: {
			title: `Title for ${params.id} goes here`,
			content: `Content for ${params.id} goes here`,
		},
	};
}) satisfies PageServerLoad;;