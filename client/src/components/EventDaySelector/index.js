import { useState } from 'react';

import './EventDaySelector.css';

import DayWidget from "./DayWidget";

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function DayOfWeekSelector({ avails }) {
    
    const [currentDay, setDay] = useState('monday');

    return (
        <div className="day_selector">
            <div className="day_widget_container">
                {daysOfWeek.map((day, key) => 
                    <DayWidget key={key} day={day} currentDay={currentDay} setDay={() => setDay(day)}/>
                )}
            </div>

            <div className='current_day_container'>
                {avails.map((day, key) => 
                    <></>
                )}
            </div>
        </div>
    )
}