import './DayWidget.css';

export default function DayWidget({ day, setDay, currentDay }) {

    function getDayAbbr(day) {
        return day.charAt(0).toUpperCase() + day.slice(1, 3);
    }

    function getDayChar(day) {
        return day.charAt(0).toUpperCase();
    }

    const isSelected = day === currentDay;

    return (
        <button className={`day_widget ${isSelected ? 'day_widget_selected' : ''}`} onClick={setDay} type="button">
            <p className="day_widget_abbr">{getDayAbbr(day)}</p>
            <p className="day_widget_char">{getDayChar(day)}</p>

            {isSelected && (
                <div className='day_widget_select_icon'>
                    <i className="bi bi-caret-down-fill"></i>
                </div>
            )}
        </button>
    )
}