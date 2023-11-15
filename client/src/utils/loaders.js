// third-party imports
import { redirect } from "react-router-dom";
import { client } from "./apolloClient";

// local imports
import Auth from "./auth";

// queries and mutations
import { QUERY_MY_EVENTS } from '../utils/queries';


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