import { useState } from 'react';
import { monthAndDay } from '../../utils/convertDate';

import './EventHeader.css';

import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

export default function EventHeader({ event }) {

    const [descriptionModal, setDescriptionModal] = useState(false);

    return (
        <div className='event_header_container' style={{
            backgroundImage: `url("${event.thumbnail}")`,
        }}>
            <h1>{event.name}</h1>

            <div className='justify-content-start align-items-center'>
                <i className="bi bi-calendar-event"></i>
                <p>Week of {monthAndDay(event.week)}</p>
            </div>

            <div className='justify-content-start align-items-center'>
                <i className="bi bi-geo-alt"></i>
                <p>{event.location}</p>
            </div>

            <div className='justify-content-start align-items-center'>
                <i className="bi bi-pass"></i>
                <p>{event.code}</p>
            </div>

            <p className='event_read_more' onClick={() => setDescriptionModal(true)}>Read more</p>

            <ReactModal isOpen={descriptionModal}>
                <p style={{
                    whiteSpace: 'pre-line'
                }}>
                    {event.description}
                </p>

                <p className='modal_close' onClick={() => setDescriptionModal(false)}>Close</p>

            </ReactModal>

            <br/>

            <Link to={`/events/${event.id}/availabilities`}>
                <button className='btn-large btn-accent'>Add Your Availability</button>
            </Link>
            
        </div>
    )
}