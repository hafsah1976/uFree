import React, { useState } from 'react';
import "../assets/createEvent.css"
import { eventThumbnails } from '../images';

const CreateEvent = () => {
    const [eventInputs, setEventInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEventInputs(values => ({...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(eventInputs);
    }

    return (
        <section id="content_createEvent_page">
            <p id="DEBUG_createEvent_page_text" className='DEBUG_text'>
                PLACEHOLDER CREATE EVENT PAGE TEXT
            </p>

            <div id='createEvent_page_title'>
                <h1>Create an Event</h1>
            </div>
            <div id="createEvent_form">
                <form onSubmit={handleSubmit}>
                    <input 
                    type='text' 
                    id="event_name"
                    name='event_name' 
                    placeholder='Name your event...'
                    value={eventInputs.eventName} 
                    onChange={handleChange} />
                    <input type='text' id="event_week" placeholder='Week of your event...' />
                    <input 
                    type='text' 
                    id="event_location" 
                    name='event_location'
                    placeholder='Location of your event...' 
                    value={eventInputs.eventLocation} 
                    onChange={handleChange}
                    />
                    <input 
                    type='text' 
                    id="event_description" 
                    name='event_description'
                    placeholder='Description of your event...'
                    value={eventInputs.eventDescription} 
                    onChange={handleChange}
                    />         

                    <select 
                    id='event_thumbnail' 
                    name='event_thumbnail' 
                    value={eventInputs.eventThumbnail}
                    onChange={handleChange}>
                        <option value={eventThumbnails.home}>Home</option>
                        <option value={eventThumbnails.dinner}>Dinner</option>
                        <option value={eventThumbnails.game}>Game</option>
                        <option value={eventThumbnails.friends}>Friends</option>
                        <option value={eventThumbnails.park}>Park</option>
                        <option value={eventThumbnails.concert}>Concert</option>
                    </select>
                
                    <input type='submit' value="submit" />           
                </form>
            </div>
        </section>
    );
};

export default CreateEvent;