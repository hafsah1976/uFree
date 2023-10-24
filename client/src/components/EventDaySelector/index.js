import { useState } from 'react';
import { getUserWeekAvails, getDayAvailabilities } from '../../utils/availabilityFinder';

import './EventDaySelector.css';

import DayWidget from "./DayWidget";
import EventDayAvail from './EventDayAvail';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function EventDaySelector({ avails }) {
    
    const [currentDay, setDay] = useState('monday');

    const userAvails = getUserWeekAvails(avails);
    const eventTimeSlots = getDayAvailabilities(userAvails);

    console.log(userAvails);

    return (
        <div className="day_selector">
            <div className="day_widget_container">
                {daysOfWeek.map((day, key) => 
                    <DayWidget key={key} day={day} currentDay={currentDay} setDay={() => setDay(day)}/>
                )}
            </div>

            <div className='event_day_container'>
                {daysOfWeek.map((day, key) =>
                    <EventDayAvail key={key} day={day} isSelected={day === currentDay} timeSlot={eventTimeSlots[day]} userAvails={userAvails[day]} />
                )}
            </div>
        </div>
    )
}