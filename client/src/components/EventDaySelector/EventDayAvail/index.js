import { getDateFromWeekday, dayMonthDate, to12Hour } from "../../../utils/convertDate";
import { useNavigate } from "react-router-dom";

export default function EventDayAvail({ day, isSelected, timeSlot, userAvails }) {

    const navigate = useNavigate();

    function getTimeSpanText(times, className) {
        return (
            <span className={className}>{to12Hour(times.start)} - {to12Hour(times.end)}</span>
        );
    }

    // TODO: Make leave event mutation
    function handleLeaveEvent() {
        console.warn('TODO: Leave event mutation');
        navigate('/dashboard');
    }

    return (
        <div className={`${!isSelected ? "hidden" : ""}`}>
            <p>{dayMonthDate(getDateFromWeekday(day))}</p>

            {timeSlot 
            ? 
                <p>{getTimeSpanText(timeSlot, "sweet_spot_time_span")} is the sweet spot!</p>
            : 
                <p>Oops, the schedules didn't sync up.</p>
            }

            <div className="horizontal_line"></div>

            <table>
                {userAvails.map(user =>
                    <tr>
                        <td>{user.userId}</td>
                        <td>{getTimeSpanText(user, "")}</td>
                    </tr>
                )}
            </table>

            <button className="btn btn-accent" onClick={handleLeaveEvent}>Leave Event</button>
        </div>
    )
}