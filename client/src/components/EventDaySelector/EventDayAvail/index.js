import { getDateFromWeekday, dayMonthDate, to12Hour } from "../../../utils/convertDate";
import { useNavigate } from "react-router-dom";

import './EventDayAvail.css';

export default function EventDayAvail({ event, day, isSelected, timeSlot, userAvails, attendees }) {

    const navigate = useNavigate();

    function getAttendeeUsername(_id) {
        const attendee = attendees.find(a => a._id === _id);
        return attendee.username;
    }

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
                <p>{getTimeSpanText(timeSlot, "sweet_spot_time_span")} is the sweet spot!</p>
            : 
                <p>Oops, the schedules didn't sync up.</p>
            }

            <div className="horizontal_line"></div>

            <table className="avails_table">
                <tbody>
                    {userAvails.map(user =>
                        <tr key={user.userId}>
                            <td>{getAttendeeUsername(user.userId)}</td>
                            <td>{getTimeSpanText(user, "")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}