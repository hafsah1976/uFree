// third-party imports
import { redirect } from "react-router-dom";
import { client } from "./apolloClient";

// local imports
import Auth from "./auth";

// queries and mutations
import { QUERY_MY_EVENTS, GET_EVENT } from '../utils/queries';


// redirects to dashboard if user is logged in
export function homeLoader() {
    if (Auth.loggedIn()) return redirect('/dashboard');
    return null;
}

// redirects to login page if user is not logged in
export function authLoader() {
    if (Auth.loggedIn()) return null;
    return redirect('/login');
}

export async function dashboardLoader() {
    // loads user's events
    const { data } = await client.query({
        query: QUERY_MY_EVENTS
    });

    return data.me;
}

export async function eventLoader({ params }) {
    const { eventId } = params;
    
    // loads event
    const { data, error } = await client.query({
        query: GET_EVENT,
        variables: { eventId }
    });

    if (error) throw error;

    return data.event;
}