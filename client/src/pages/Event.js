import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENT, QUERY_SINGLE_USER } from '../utils/queries';

import { eventThumbnails } from '../images';

import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const dataDummy = {
    id: '124374734ub3iu436436ui34',
    name: "Dinner with the Smiths",
    week: Date.now(),
    location: '4138 Brunkzy Pl',
    code: 'UFG65TY',
    description: `- Dress Code: busniess casual\n- All you can eat crackers!\n\nWe will be serving a deluxe meal of hotdogs, cornflakes, and plain white bread with a mayonnaise spread.`,
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
                { day: 'monday', start: 7.34, end: 9 },
                { day: 'tuesday', start: 15, end: 17 },
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

    const { data, loading, error } = useQuery(GET_EVENT, {
        variables: {
            eventId: '653b128d4ce385f197203c41'
        }
    });

    console.log('Event Data:', data);
    if (error) console.error('Event data error', error);

    return (
        <>
            {loading
                ? 
                    <p>Loading...</p> 
                : 
                    <section id="content_event_page">
                        <EventHeader event={data.event} />

                        <EventDaySelector avails={data.event.availabilities}/>
                    </section>
            }
        </>
    );
};

export default Event;