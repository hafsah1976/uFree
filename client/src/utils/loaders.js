// third-party imports
import { redirect } from "react-router-dom";
import { client } from "./apolloClient";

// local imports
import Auth from "./auth";

// queries and mutations
import { QUERY_ME } from '../utils/queries';


export function authLoader() {
    if (Auth.loggedIn()) return null;
    return redirect('/login');
}
  
export async function dashboardLoader() {
    const authRes = authLoader();
    if (authRes !== null) return authRes;

    const { data } = await client.query({
        query: QUERY_ME
    });

    return data.me;
}