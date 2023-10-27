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

            <div className='event_header_info justify-content-start align-items-center'>
                <i className="bi bi-calendar-event"></i>
                <p className='no-margin'>Week of {monthAndDay(event.week)}</p>
            </div>

            <div className='event_header_info justify-content-start align-items-center'>
                <i className="bi bi-geo-alt"></i>
                <p className='no-margin'>{event.location}</p>
            </div>

            <div className='justify-content-start align-items-center'>
                <i className="bi bi-pass"></i>
                <p>{event.code}</p>
            </div>

            <p className='event_read_more' onClick={() => setDescriptionModal(true)}>Read more</p>

            <ReactModal isOpen={descriptionModal} onRequestClose={() => setDescriptionModal(false)} appElement={document.querySelector('.App')} style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    content: {
                        whiteSpace: 'pre-line',
                        border: 'none',
                        borderRadius: 'var(--large-border-radius)',
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: '30px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}>
                    <i className="modal_x bi bi-x" onClick={() => setDescriptionModal(false)}></i>
                    <p>{event.description}</p>

                    <p className='modal_close' onClick={() => setDescriptionModal(false)}>Close</p>

            </ReactModal>

            <br/>

            <Link to={`/events/${event._id}/availabilities`}>
                <button className='add_avail_btn btn_large btn_accent'>Add Your Availability</button>
            </Link>
            
        </div>
    )
}