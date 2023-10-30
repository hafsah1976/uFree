import React, { useState } from 'react';


const JoinEvent = () => {

    const [joinEventInput, setJoinEventInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const event_code = event.target.value;
        setJoinEventInputs(values => ({...values, [name]: event_code}))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(joinEventInput);
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