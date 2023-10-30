import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toBeginningOfWeek } from '../utils/convertDate';
import { pageImages, eventThumbnails } from '../images';
import { CREATE_EVENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import "../assets/createEvent.css";

import Calendar from 'react-calendar';

// <input type='text' id="event_week" placeholder='Week of your event...' />

const CreateEvent = () => {
    const navigate = useNavigate();

    const [eventInputs, setEventInputs] = useState({
        event_name: '',
        event_location: '',
        event_description: '',
        event_thumbnail: eventThumbnails.home,
    });
    const [eventDate, setEventDate] = useState(new Date());

    // gqp query to add event to database
    const [createEvent] = useMutation(CREATE_EVENT);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setEventInputs(values => ({
            ...values,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('PAYLOAD:', {
            name: eventInputs.event_name,
            thumbnail: eventInputs.event_thumbnail,
            location: eventInputs.event_location,
            description: eventInputs.event_description,
            week: toBeginningOfWeek(eventDate),
        });

        // gql queries addEvent when form is submitted
        const { data, error } = await createEvent({
            variables: {
                name: eventInputs.event_name,
                thumbnail: eventInputs.event_thumbnail,
                location: eventInputs.event_location,
                description: eventInputs.event_description,
                week: toBeginningOfWeek(eventDate),
            }
        });

        if (error) {
            console.error(error);
        }

        if (data.createEvent) {
            navigate(`/events/${data.createEvent._id}`);
        }
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
                        value={eventInputs.event_name} 
                        onChange={handleChange}
                    />
                    <Calendar 
                        id="event_date"
                        name='event_date'
                        value={eventDate}
                        onChange={setEventDate} 
                    />
                    <p id='selected_event_date'>Your event is scheduled in: {eventDate.toDateString()}</p>
                    <input 
                        type='text' 
                        id="event_location" 
                        name='event_location'
                        placeholder='Location of your event...' 
                        value={eventInputs.event_location} 
                        onChange={handleChange}
                    />
                    <input 
                        type='text' 
                        id="event_description" 
                        name='event_description'
                        placeholder='Description of your event...'
                        value={eventInputs.event_description} 
                        onChange={handleChange}
                    />         

                    <select 
                        id='event_thumbnail' 
                        name='event_thumbnail' 
                        value={eventInputs.event_thumbnail}
                        onChange={handleChange}
                    >
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

            <img 
                className='availabilities_background_image'
                src={pageImages.createEvent}
                alt="Create Event"
            />
        </section>
    );
};

export default CreateEvent;