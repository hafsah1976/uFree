/* 
userAvails -> array of user availability objects for a given day
{
    start: 10,
    end: 21.5
}
*/

// returns an availability object with a start and end time (or null)
function findAvailability(userAvails) {
    // object tracking the maximum time slot available to all users
    const avail = userAvails[0];
    // if first user not available, return null
    if (avail === null) return null;

    // for each user other than the first...
    for (const userAvail of userAvails.slice(1)) {
        // set beginning time to latest time of all users
        avail.start = Math.max(userAvail.start, avail.start);
        // set ending time to earliest time of all users
        avail.end = Math.min(userAvail.end, avail.end);

        // if beginning and ending time cross, no time slot is available
        if (avail.start >= avail.end) return null
    }

    return avail;
}

// returns an array of availability objects
function getDayAvailabilities(userDayAvails) {
    return userDayAvails.map(userAvails => findAvailability(userAvails))
}

export { getDayAvailabilities };
