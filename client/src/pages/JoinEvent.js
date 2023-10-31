import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { JOIN_EVENT } from '../utils/mutations';


const JoinEvent = () => {
    const [joinEventInput, setJoinEventInputs] = useState({
        event_joincode: '',
    });

    const [joinEvent] = useMutation(JOIN_EVENT);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const event_code = event.target.value;
        setJoinEventInputs(values => ({...values, [name]: event_code}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(joinEventInput);
        const { data, error } = await joinEvent({
            variables: {
                code: joinEventInput.event_joincode
            }
        });

        if (error) {
            console.error(error);
            return;
        }

        if (data.joinEvent) {
            navigate(`/events/${data.joinEvent._id}`);
        }
    };

    return(
        <section id='content_joinEvent_page'>
            <p id="DEBUG_joinEvent_page_text" className='DEBUG_text'>
                PLACEHOLDER JOIN EVENT TEXT
            </p>
            <section id="joinEvent_form">
                <form onSubmit={handleSubmit}>
                    <input
                    type='text'
                    name='event_joincode'
                    placeholder='Event code here...'
                    value={joinEventInput.event_joincode}
                    onChange={handleChange}>
                    </input>
                    <input type='submit' value="submit" />
                </form>
            </section>
        </section>
    );
};

export default JoinEvent;