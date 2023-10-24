import React from 'react';

import { eventThumbnails } from '../images';

import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const data = {
    id: '124374734ub3iu436436ui34',
    name: "Dinner with the Smiths",
    week: Date.now(),
    location: '4138 Brunkzy Pl',
    code: 'UFG65TY',
    description: `- Dress Code: busniess casual\n- All you can eat crackers!`,
    thumbnail: eventThumbnails.dinner,
    availabilities: [
        {
            userId: '123456',
            availabilities: [
                { day: 'monday', start: 10, end: 20.5 },
                { day: 'tuesday', start: 12, end: 17 },
                { day: 'wednesday', start: 13, end: 24 },
                { day: 'thursday', start: 15, end: 22.5 },
                { day: 'friday', start: 15, end: 22.5 },
                { day: 'saturday', start: 15, end: 22.5 },
                { day: 'sunday', start: 15, end: 22.5 },
            ]
        },
        {
            userId: 'iusdbv832989',
            availabilities: [
                { day: 'monday', start: 0, end: 9 },
                { day: 'tuesday', start: 12, end: 17 },
                { day: 'wednesday', start: 13, end: 24 },
                { day: 'thursday', start: 0, end: 0 },
                { day: 'friday', start: 15, end: 22.5 },
                { day: 'saturday', start: 15, end: 22.5 },
                { day: 'sunday', start: 15, end: 22.5 },
            ]
        },
    ]
};

const Event = () => {

    return (
        <section id="content_event_page">
            <EventHeader event={data} />

            <EventDaySelector avails={data.availabilities}/>
        </section>
    );
};

export default Event;