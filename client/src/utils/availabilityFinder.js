const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function isNotAvailable(avail) {
    return (avail.start === 0 && avail.end === 0);
}

/* 
userAvails -> array of user availability objects for a given day
{
    day: String
    start: 10,
    end: 21.5
}
*/

// returns an availability object with a start and end time (or null)
function findAvailability(userAvails) {
    // if any user is not available, return null
    if (userAvails.some(a => isNotAvailable(a))) return null;

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
function getDayAvailabilities(userWeekAvails) {
    const obj = {};
    Object.keys(userWeekAvails).forEach(day => {
        obj[day] = findAvailability(userWeekAvails[day]);
    });

    return obj;
}

// have an array of user week avails containing avails for each day the week for that user
// need an array of days containing each user avail for that day
function getUserWeekAvails(availabilitiesSchemaArray) {
    const avails = availabilitiesSchemaArray;

    const userWeekAvails = {};
    for (const day of DAYS_OF_WEEK) {
        userWeekAvails[day] = avails.map(user => {
            const obj = user.availabilities.find(a => a.day === day);
            return {
                userId: user.userId,
                start: obj.start,
                end: obj.end,
            }
        })
    }

    return userWeekAvails;
}

// function test(args) {
//     const weekAvails = getUserWeekAvails(args);
//     console.log(JSON.stringify(getUserWeekAvails(args), null, 4));
//     console.log(getDayAvailabilities(weekAvails));
//     console.log();
// }

// test([
//     {
//         userId: '123456',
//         availabilities: [
//             { day: 'monday', start: 10, end: 20.5 },
//             { day: 'tuesday', start: 12, end: 17 },
//             { day: 'wednesday', start: 13, end: 24 },
//             { day: 'thursday', start: 15, end: 22.5 },
//             { day: 'friday', start: 15, end: 22.5 },
//             { day: 'saturday', start: 15, end: 22.5 },
//             { day: 'sunday', start: 15, end: 22.5 },
//         ]
//     },
//     {
//         userId: 'iusdbv832989',
//         availabilities: [
//             { day: 'monday', start: 0, end: 12 },
//             { day: 'tuesday', start: 12, end: 17 },
//             { day: 'wednesday', start: 13, end: 24 },
//             { day: 'thursday', start: 15, end: 22.5 },
//             { day: 'friday', start: 15, end: 22.5 },
//             { day: 'saturday', start: 15, end: 22.5 },
//             { day: 'sunday', start: 15, end: 22.5 },
//         ]
//     },
// ])

export { getUserWeekAvails, getDayAvailabilities };
