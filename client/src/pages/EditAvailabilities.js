import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { monthAndDay } from '../utils/convertDate';
import { EDIT_AVAILABILITY } from "../utils/mutations";
import { QUERY_USER_AVAILABILITY } from "../utils/queries";
import { pageImages } from '../images';

import '../assets/addAvailabilities.css';

import DayOfWeekSelector from '../components/DayOfWeekSelector';

const ALL_DAY = { start: 0, end: 24 };

const Availabilities = () => {

    const navigate = useNavigate();
    const { eventId } = useParams();
    const [showAlert, setShowAlert] = useState(false); // State for displaying alerts
    const [error, setError] = useState(""); // State for storing error messages
    const [editAvailibility] = useMutation(EDIT_AVAILABILITY);

    const { loading, data } = useQuery(QUERY_USER_AVAILABILITY, {
        variables: { eventId },
    });

    // if (error) {
    //     console.log(error);
    // }

    console.log(`eventId: ${eventId}`);
    // console.log(data?.availabilities);
    // console.log(data?.availability);
    // console.log(data);
//    if (data) {
    const avail = data?.availability.availabilities;
    console.log(avail);
    console.log(`data: ${data}`);
    const [avails, setAvails] = useState({

        monday: avail ? { ...avail.find(a => a.day === 'monday') } : {...ALL_DAY},
        tuesday: avail ? { ...avail.find(a => a.day === 'tuesday') } : {...ALL_DAY},
        wednesday: avail ? { ...avail.find(a => a.day === 'wednesday') } : {...ALL_DAY},
        thursday: avail ? { ...avail.find(a => a.day === 'thursday') } : {...ALL_DAY},
        friday: avail ? { ...avail.find(a => a.day === 'friday') } : {...ALL_DAY},
        saturday: avail ? { ...avail.find(a => a.day === 'saturday') } : {...ALL_DAY},
        sunday: avail ? { ...avail.find(a => a.day === 'sunday') } : {...ALL_DAY},

    });

    useEffect( () => {setAvails(
    {monday: avail ? { ...avail.find(a => a.day === 'monday') } : {...ALL_DAY},
    tuesday: avail ? { ...avail.find(a => a.day === 'tuesday') } : {...ALL_DAY},
    wednesday: avail ? { ...avail.find(a => a.day === 'wednesday') } : {...ALL_DAY},
    thursday: avail ? { ...avail.find(a => a.day === 'thursday') } : {...ALL_DAY},
    friday: avail ? { ...avail.find(a => a.day === 'friday') } : {...ALL_DAY},
    saturday: avail ? { ...avail.find(a => a.day === 'saturday') } : {...ALL_DAY},
    sunday: avail ? { ...avail.find(a => a.day === 'sunday') } : {...ALL_DAY},})}, []);

    // if (avail) {
    //     console.log(avail.find(a => a.day === 'thursday'));
    // }

    async function handleFormSubmit(event) {
        event.preventDefault();
        // Perform user registration by calling the addUser mutation
        const formattedAvails = Object.keys(avails).map(day => {
            return {
                day: day,
                start: avails[day].start,
                end: avails[day].end,
            }
        })

        // console.log('PAYLOAD:', {
        //     availabilities: formattedAvails,
        //     eventId,
        // });
        const { error } = await editAvailibility({
            variables: {
                availabilities: formattedAvails,
                eventId,
            },
        });

        if (loading) return (
            <p>Loading...</p>
            )

        if (error) {
            console.error("Failed to make availablity");
            setError(error.message);
            setShowAlert("Failed to make availability. Please try again.");
            return;
        }
        // console.log(' avilabilty-Data:', data);

        navigate(`/events/${eventId}`);
    }

    const eventWeek = Date.now();

    return (
        <section id="content_availabilities_page">
            <h1 className='text-align-start'>Edit Your Availability</h1>
            <p className='text-align-start'>Week of {monthAndDay(eventWeek)}</p>

            <form onSubmit={handleFormSubmit}>
                <DayOfWeekSelector setAvails={setAvails} avails={avails}/>

                <button type="submit" className='btn_large btn_accent'>Submit</button>
            </form>

            <img
                className='availabilities_background_image'
                src={pageImages.addAvailabilities}
                alt="Edit Availabilities"
            />


        </section>
    );
};

export default Availabilities;
