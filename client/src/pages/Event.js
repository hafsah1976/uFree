import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_EVENT } from '../utils/queries';

import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const Event = () => {

    const { eventId } = useParams();

    const { data, loading, error } = useQuery(GET_EVENT, {
        variables: { eventId }
    });

    // console.log('Event Data:', data);
    if (error) console.error('Event data error', error);

    return (
        <>
            {loading
                ? 
                    <p>Loading...</p> 
                : 
                    <section id="content_event_page">
                        <EventHeader event={data.event} />

                        <EventDaySelector avails={data.event.availabilities} attendees={data.event.attendees} />
                    </section>
            }
        </>
    );
};

export default Event;