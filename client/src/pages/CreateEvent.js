import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toBeginningOfWeek, monthAndDay } from '../utils/convertDate';
import { pageImages, eventThumbnails } from '../images';
import { CREATE_EVENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import 'react-calendar/dist/Calendar.css';
import "../assets/createEvent.css";

import Calendar from 'react-calendar';
import Select from 'react-select';

const CreateEvent = () => {
    // const navigate = useNavigate();

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

    const thumbnailOptions = Object.keys(eventThumbnails).map(thumb => {
        return {
            value: eventThumbnails[thumb],
            label: thumb.charAt(0).toUpperCase() + thumb.slice(1),
        }
    });

    const [eventThumbnail, setEventThumbnail] = useState(thumbnailOptions[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // gql queries addEvent when form is submitted
        const { data, error } = await createEvent({
            variables: {
                name: eventInputs.event_name,
                thumbnail: eventThumbnail.value,
                location: eventInputs.event_location,
                description: eventInputs.event_description,
                week: toBeginningOfWeek(eventDate),
            }
        });

        if (error) {
            console.error(error);
        }

        if (data.createEvent) {
            window.location.assign(`/events/${data.createEvent._id}`);
            // navigate(`/events/${data.createEvent._id}`);
        }
    }

    return (
        <section id="content_createEvent_page">
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
                        className='input'
                        style={{
                            margin: 'var(--padding-md) 0'
                        }}
                    />

                    <input 
                        type='text' 
                        id="event_location" 
                        name='event_location'
                        placeholder='Location of your event...' 
                        value={eventInputs.event_location} 
                        onChange={handleChange}
                        className='input'
                    />

                    <input 
                        type='text' 
                        id="event_description" 
                        name='event_description'
                        placeholder='Description of your event...'
                        value={eventInputs.event_description} 
                        onChange={handleChange}
                        className='input'
                        style={{
                            marginBottom: 'var(--padding-md)'
                        }}
                    />         

                    <p id='selected_event_date'>Scheduled for the week of <span className='bold'>{monthAndDay(eventDate)}</span>.</p>
                    <Calendar 
                        id="event_date"
                        name='event_date'
                        value={eventDate}
                        onChange={setEventDate} 
                    />

                    <div style={{
                        margin: 'var(--padding-lg) 0',
                    }}>
                        <p>Choose a thumbnail:</p>
                        <Select
                            defaultValue={eventThumbnail}
                            onChange={setEventThumbnail}
                            options={thumbnailOptions}
                        />
                        <div 
                            className='event_thumbnail_preview' 
                            style={{
                                marginTop: 'var(--padding-sm)',
                                backgroundImage: `url("${eventThumbnail.value}")`
                            }}
                        />
                        {/* <img  alt="Thumbnail Preview" src={eventThumbnail.value} /> */}
                    </div>
                
                    <button type='submit' className='btn btn_accent'>Create</button>         
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