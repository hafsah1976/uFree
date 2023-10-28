import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const GoToEvent = () => {

    const [eventId, setEventId] = useState('');

    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        navigate(`/events/${eventId}`);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <p>Enter Event ID below:</p>
            <input type="text" value={eventId} onChange={(event) => setEventId(event.target.value)} />
            <button type="submit">Go</button>
        </form>
    );
};

export default GoToEvent;