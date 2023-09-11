import { CITYSWITCH_DATOCMS_API_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { subscribeToQuery } from 'datocms-listen';

export const load: PageServerLoad = async ({ params }) => {

    const unsubscribe = await subscribeToQuery({
        query: `query MyQuery {
            allPages {
                id
                title

            }
        }`,
        variables: { first: 10 },
        token: CITYSWITCH_DATOCMS_API_TOKEN,
        preview: true,
        onUpdate: (update) => {
            // response is the GraphQL response
            console.log(update.response.data);

            
        },
        onStatusChange: (status) => {
            // status can be "connected", "connecting" or "closed"
            //console.log(status);
        },
        onChannelError: (error) => {
            console.error(error);
        },
        onError: (error) => {
            console.log(error.message);
        },
        onEvent: (event) => {
            //console.log('event: ',event)
        }
    });

    return {
        post: unsubscribe,
    };
};