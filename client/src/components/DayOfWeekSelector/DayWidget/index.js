import './DayWidget.css';

export default function DayWidget({ day, setDay, currentDay, avails }) {

    function getDayAbbr(day) {
        return day.charAt(0).toUpperCase() + day.slice(1, 3);
    }

    function getDayChar(day) {
        return day.charAt(0).toUpperCase();
    }

    const isSelected = day === currentDay;
    const isAvailable = !(avails.start === 0 && avails.end === 0);
    const isPartiallyAvailable = (avails.start !== 0) || (avails.end !== 24);

    return (
        <button 
            className={`day_widget ${isSelected ? 'day_widget_selected' : ''}`}
            onClick={setDay}
            type="button"
            style={{
                backgroundColor: isAvailable ? 'var(--primary)' : '',
            }}
        >
            <p className="day_widget_abbr">{getDayAbbr(day)}</p>
            <p className="day_widget_char">{getDayChar(day)}</p>

            {isSelected && (
                <div 
                    className={`day_widget_select_icon`}
                    style={{
                        backgroundColor: isAvailable ? 'var(--primary)' : '',
                        color: isAvailable ? 'var(--light)' : '',
                }}>
                    <i className="bi bi-caret-down-fill"></i>
                </div>
            )}

            {isAvailable && (
                <div 
                    className={`day_widget_check_icon`}
                    style={{
                        backgroundColor: isAvailable ? 'var(--primary)' : '',
                        color: isAvailable ? 'var(--light)' : '',
                }}>
                    {isPartiallyAvailable
                        ? <i className='bi bi-dash'></i>
                        : <i className="bi bi-check"></i>
                    }
                </div>
            )}
        </button>
    )
}