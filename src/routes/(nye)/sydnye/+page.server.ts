import type { PageServerLoad } from './$types';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load = (async () => {

    const { MODE } = import.meta.env;

    const vpquery = ` {
        allVantagePointCollection: vantagePointCollection(preview: ${ MODE === 'development' ? 'true': 'false'}, where:{showOnQmsScreen:true}){
			items{
                title
                slug
                statusAlert
            }
		}

	}`;

    const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ MODE === "development" ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN}` 
        },
        body: JSON.stringify({ query: vpquery })
    });

    if (!res.ok) {
        throw error(404, {
            message: res.statusText
        });
    }
    else {
        const { data } = await res.json();
        const { items } = data.allVantagePointCollection;
        const sortedVpData = items.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        return {
            items: sortedVpData,
        };
    }
}) satisfies PageServerLoad;