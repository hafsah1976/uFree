import React from 'react';

import { eventThumbnails } from '../images';

import EventHeader from '../components/EventHeader';

const data = {
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