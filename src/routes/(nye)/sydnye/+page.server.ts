import type { PageServerLoad } from './$types';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
export const load = (async () => {
    const vpquery = ` {
        allVantagePointCollection: vantagePointCollection(where:{showOnQmsScreen:true}){
			items{
                title
                slug
                statusAlert
            }
		}

	}`;
    const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;
    const vpresponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + CONTENTFUL_ACCESS_TOKEN
        },
        body: JSON.stringify({ query: vpquery })
    });
    if (!vpresponse.ok) {
        throw error(404, {
            message: vpresponse.statusText
        });
    }
    else {
        const { data } = await vpresponse.json();
        const { items } = data.allVantagePointCollection;
        const sortedVpData = items.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        return {
            items: sortedVpData,
        };
    }
}) satisfies PageServerLoad;