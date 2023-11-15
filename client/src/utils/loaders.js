// third-party imports
import { redirect } from "react-router-dom";
import { client } from "./apolloClient";

// local imports
import Auth from "./auth";

// queries and mutations
import { QUERY_MY_EVENTS, GET_EVENT } from '../utils/queries';


// redirects user to login page not logged in
export function authLoader() {
    if (Auth.loggedIn()) return null;
    return redirect('/login');
}

// loads user's events
export async function dashboardLoader() {
    const authRes = authLoader();
    if (authRes !== null) return authRes;

    const { data } = await client.query({
        query: QUERY_MY_EVENTS
    });

    return data.me;
}

// loads event
export async function eventLoader({ params }) {
    const authRes = authLoader();
    if (authRes !== null) return authRes;

    const { eventId } = params;

    const { data, error } = await client.query({
        query: GET_EVENT,
        variables: { eventId }
    });

    if (error) throw error;

    return data.event;
}