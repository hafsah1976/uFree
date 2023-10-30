import { getDateFromWeekday, dayMonthDate, to12Hour } from "../../../utils/convertDate";
import { useNavigate } from "react-router-dom";

import './EventDayAvail.css';

export default function EventDayAvail({ user, event, day, isSelected, timeSlot, userAvails, attendees }) {

    const navigate = useNavigate();

    function getAttendeeUsername(_id) {
        const attendee = attendees.find(a => a._id === _id);
        return attendee.username;
    }

    let userAvailsFormatted = userAvails;
    // Put current user at top of list
    if (user) {
        userAvailsFormatted = [userAvails.find(u => u.userId === user._id)].concat(userAvails.filter(u => u.userId !== user._id));
    }
    
    let myAvails;
    if (!userAvailsFormatted[0]) userAvailsFormatted.shift();
    else myAvails = userAvailsFormatted[0];

    // console.log(userAvailsFormatted);

    function getTimeSpanText(times, className) {
        let message = "";
        if (times.start === 0 && times.end === 0) {
            message = "Not available";
        }
        else if (times.start === 0 && times.end === 24) {
            message = "All day"
        }
        else {
            message = `${to12Hour(times.start)} - ${to12Hour(times.end)}`
        }
        
        return (
            <span className={className}>{message}</span>
        );
    }

    return (
        <div className={`${!isSelected ? "hidden" : ""}`}>
            <p className="event_day">{dayMonthDate(getDateFromWeekday(day, event.week))}</p>

            {timeSlot 
            ? 
                <p className="event_time_slot">{getTimeSpanText(timeSlot, "sweet_spot_time_span")} is the sweet spot!</p>
            : 
                <p className="event_time_slot">Oops, the schedules didn't sync up.</p>
            }

            <div className="horizontal_line"></div>

            <table className="avails_table">
                <tbody>
                    {myAvails && (
                        <tr className="you_avails_row" key={myAvails.userId}>
                            <td>You</td>
                            <td>{getTimeSpanText(myAvails, "")}</td>
                        </tr>
                    )}
                    {userAvailsFormatted.slice(1).map(avail =>
                        <tr key={avail.userId}>
                            <td>{getAttendeeUsername(avail.userId)}</td>
                            <td>{getTimeSpanText(avail, "")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}