import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { monthAndDay } from '../utils/convertDate';

import DayOfWeekSelector from '../components/DayOfWeekSelector';

const ALL_DAY = { start: 0, end: 24 };

const Availabilities = () => {

    const [avails, setAvails] = useState({
        monday: {...ALL_DAY},
        tuesday: {...ALL_DAY},
        wednesday: {...ALL_DAY},
        thursday: {...ALL_DAY},
        friday: {...ALL_DAY},
        saturday: {...ALL_DAY},
        sunday: {...ALL_DAY},
    });

    const navigate = useNavigate();

    // TODO: handle mutation
    async function handleFormSubmit(event) {
        event.preventDefault();

        const formattedAvails = Object.keys(avails).map(day => {
            return {
                day: day,
                start: avails[day].start,
                end: avails[day].end,
            }
        })

        console.warn('TODO: HANDLE MUTATION', formattedAvails);

        navigate('/eventPage');
    }

    const eventWeek = Date.now();

    return (
        <section id="content_availabilities_page">
            <h1 className='text-align-start'>Add Your Availabilities</h1>
            <p className='text-align-start'>Week of {monthAndDay(eventWeek)}</p>

            <form onSubmit={handleFormSubmit}>
                <DayOfWeekSelector setAvails={setAvails} avails={avails}/>

                <button type="submit" className='btn_large btn_accent'>Submit</button>
            </form>
        </section>
    );
};

export default Availabilities;