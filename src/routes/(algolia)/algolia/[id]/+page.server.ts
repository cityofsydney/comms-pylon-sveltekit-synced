import type { PageServerLoad } from './$types';

export const load = (async  ({ params }) => {
	return {
		post: {
			title: `Title for ${params.id}`,
			content: `Content for ${params.id}`,
		},
	};
}) satisfies PageServerLoad;