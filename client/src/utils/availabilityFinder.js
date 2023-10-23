/* 
userAvails -> array of user availability objects for a given day
{
    start: 10,
    end: 21.5
}
*/

// returns an availability object with a start and end time (or null)
function findAvailability(userAvails) {
    // if any user is not available, return null
    if (userAvails.includes(null)) return null;

    // array of all start times
    const startTimes = userAvails.map(userAvail => userAvail.start);
    // array of all end times
    const endTimes = userAvails.map(userAvail => userAvail.end);

    // object tracking the time slot available to all users
    const avail = {
        // set start time to latest time of all users
        start: Math.max(...startTimes),
        // set end time to earliest time of all users
        end: Math.min(...endTimes),
    }

    // if start and end time cross, no available time slot exists
    if (avail.start >= avail.end) return null;

    return avail;
}

// returns an array of availability objects
function getDayAvailabilities(userDayAvails) {
    return userDayAvails.map(userAvails => findAvailability(userAvails))
}

// function test(args) {
//     console.log(getDayAvailabilities(args));
// }

// test([
//     [
//         { start: 10, end: 20.5 },
//         { start: 12, end: 17 },
//         { start: 13, end: 24 },
//         { start: 15, end: 22.5 },
//     ],
//     [
//         { start: 17, end: 24 },
//         { start: 10, end: 18 },
//         { start: 15, end: 24 },
//         { start: 15, end: 22.5 },
//     ],
// ])

export { getDayAvailabilities };