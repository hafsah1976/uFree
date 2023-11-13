import { useState } from 'react';
import { monthAndDay } from '../../utils/convertDate';
import { useAuth } from '../../utils/AuthContext';
import './EventHeader.css';

import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

export default function EventHeader({ event }) {

    const { user: me } = useAuth();

    const [descriptionModal, setDescriptionModal] = useState(false);
    const [copyMessage, setCopyMessage] = useState("");

    // check if user already has an availability added
    const hasAvails = event.availabilities.some(availability => availability.userId === me._id);
    // console.log(hasAvails);

    function hasAddedAvails(userId) {
        return event.availabilities.some(availability => availability.userId === userId);
    }


    return (
        <div className='event_header_container' style={{
            backgroundImage: `url("${event.thumbnail}")`,
        }}>
            <h1>{event.name}</h1>

            <div className='event_header_info justify-content-start align-items-center'>
                <i className="bi bi-calendar-event"></i>
                <p className='no-margin'>Week of {monthAndDay(event.week)}</p>
            </div>

            {event?.location && (
                <div className='event_header_info justify-content-start align-items-center'>
                    <i className="bi bi-geo-alt"></i>
                    <p className='no-margin'>{event.location}</p>
                </div>
            )}

            <div className='justify-content-start align-items-center'>
                <i className="bi bi-pass"></i>
                <p>{event.code}</p>
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(event.code);
                        setCopyMessage('Code copied!');
                        setTimeout(() => setCopyMessage(""), 3000);
                    }}
                    style={{
                        marginLeft: '5px',
                        padding: 0,
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--light)',
                    }}
                >
                    <i className="bi bi-copy" style={{ margin: 0 }}></i>
                </button>
                <p style={{marginLeft: 'var(--padding-sm)'}}>{copyMessage}</p>
            </div>

            {event?.description && (
                <p className='event_read_more' onClick={() => setDescriptionModal(true)}>Read more</p>
            )}

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
                    
                    <p className='modal_heading'>Description</p>
                    <p>{event?.description}</p>

                    <p className='modal_heading'>Attendees</p>
                    <ul>
                        {event.attendees.map(user => (
                            <li key={user._id}>{user.username} {hasAddedAvails(user._id) ? "" : "*"}</li>
                        ))}
                    </ul>

                    <small>* has not added availabilities</small>

                    <p className='modal_close' onClick={() => setDescriptionModal(false)}>Close</p>

            </ReactModal>

            <br/>
            {(hasAvails === false)
                        ?
                            // display add availability if user does not have an availability
                            <Link to={`/events/${event._id}/availabilities`}>
                                <button className='add_avail_btn btn_large btn_accent'>Add Your Availability</button>
                            </Link>
                        :
                            <Link to={`/events/${event._id}/availabilities/edit`}>
                                <button className='add_avail_btn btn_large btn_accent'>Edit Your Availability</button>
                            </Link>

                    }

        </div>
    )
}
