import { useState } from 'react';

import './DayOfWeekSelector.css';

// import DayWidget from '../EventDaySelector/DayWidget';
import DayWidget from '../DayOfWeekSelector/DayWidget';
import DayAvailInput from './DayAvailInput';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function DayOfWeekSelector({ avails, setAvails }) {
    
    const [currentDay, setDay] = useState('monday');

    function handleAvailsChange(newAvail) {
        setAvails({
            ...avails,
            ...newAvail,
        });
    }

    console.log(avails);

    return (
        <div className="day_selector">
            <div className="day_widget_container">
                {daysOfWeek.map((day, key) => 
                    <DayWidget key={key} day={day} currentDay={currentDay} setDay={() => setDay(day)} avails={avails[day]} />
                )}
            </div>

            <div className='current_day_container'>
                {daysOfWeek.map((day, key) => 
                    <DayAvailInput key={key} day={day} currentDay={currentDay} handleAvailsChange={handleAvailsChange} />
                )}
            </div>
        </div>
    )
}