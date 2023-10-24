import React from 'react';

import { eventThumbnails } from '../images';

import EventHeader from '../components/EventHeader';

const data = {
    id: '124374734ub3iu436436ui34',
    name: "Dinner with the Smiths",
    week: Date.now(),
    location: '4138 Brunkzy Pl',
    code: 'UFG65TY',
    description: `- Dress Code: busniess casual\n- All you can eat crackers!`,
    thumbnail: eventThumbnails.dinner,
};

const Event = () => {

    return (
        <section id="content_event_page">
            <EventHeader event={data} />
        </section>
    );
};

export default Event;