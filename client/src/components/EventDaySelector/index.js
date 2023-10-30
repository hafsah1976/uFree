import { useState } from 'react';
import { getUserWeekAvails, getDayAvailabilities } from '../../utils/availabilityFinder';

import './EventDaySelector.css';

import DayWidget from "./DayWidget";
import EventDayAvail from './EventDayAvail';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function EventDaySelector({ event, avails, attendees }) {
    const userAvails = getUserWeekAvails(avails);
    const eventTimeSlots = getDayAvailabilities(userAvails);

    let defaultCurrentDay = 'monday';

    for (const day of daysOfWeek) {
        if (eventTimeSlots[day]) {
            defaultCurrentDay = day;
            break;
        }
    }
    
    const [currentDay, setDay] = useState(defaultCurrentDay);

    return (
        <div className="day_selector">
            {(avails.length === 0)
            ?
                <>
                    <p>Add your availabilities to begin!</p>
                </>
            :
                <>
                    <div className="day_widget_container">
                        {daysOfWeek.map((day, key) => 
                            <DayWidget key={key} day={day} currentDay={currentDay} isOpen={eventTimeSlots[day] != null} setDay={() => setDay(day)}/>
                        )}
                    </div>

                    <div className='event_day_container'>
                        {daysOfWeek.map((day, key) =>
                            <EventDayAvail key={key} event={event} day={day} isSelected={day === currentDay} timeSlot={eventTimeSlots[day]} userAvails={userAvails[day]} attendees={attendees} />
                        )}
                    </div>
                </>
            }
        </div>
    )
}