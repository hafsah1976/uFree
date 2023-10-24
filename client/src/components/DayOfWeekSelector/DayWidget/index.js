import './DayWidget.css';

export default function DayWidget({ day, setDay, currentDay }) {

    function getDayAbbr(day) {
        return day.charAt(0).toUpperCase() + day.slice(1, 3);
    }

    function getDayChar(day) {
        return day.charAt(0).toUpperCase();
    }

    return (
        <button className={`day_widget ${day === currentDay ? 'day_widget_selected' : ''}`} onClick={setDay} type="button">
            <p className="day_widget_abbr">{getDayAbbr(day)}</p>
            <p className="day_widget_char">{getDayChar(day)}</p>
        </button>
    )
}