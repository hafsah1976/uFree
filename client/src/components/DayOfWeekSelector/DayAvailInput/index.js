import { useState, useEffect } from 'react';

import './DayAvailInput.css';

import RadioOption from '../../RadioOption';

const NOT_AVAILABLE = { start: 0, end: 0 };
const ALL_DAY = { start: 0, end: 24 };

export default function DayAvailInput({ day, currentDay, handleAvailsChange }) {

    const [currentOption, setCurrentOption] = useState(1);
    const [timeInput, setTimeInput] = useState(ALL_DAY);

    function getTimeOptions(type='start') {
        return (
            <>
                <option value="0">12 AM</option>
                <option value="1">1 AM</option>
                <option value="2">2 AM</option>
                <option value="3">3 AM</option>
                <option value="4">4 AM</option>
                <option value="5">5 AM</option>
                <option value="6">6 AM</option>
                <option value="7">7 AM</option>
                <option value="8">8 AM</option>
                <option value="9">9 AM</option>
                <option value="10">10 AM</option>
                <option value="11">11 AM</option>
                <option value="12">12 PM</option>
                <option value="13">1 PM</option>
                <option value="14">2 PM</option>
                <option value="15">3 PM</option>
                <option value="16">4 PM</option>
                <option value="17">5 PM</option>
                <option value="18">6 PM</option>
                <option value="19">7 PM</option>
                <option value="20">8 PM</option>
                <option value="21">9 PM</option>
                <option value="22">10 PM</option>
                <option value="23">11 PM</option>
                <option value="24">End of Day</option>
            </>
        )
    }

    function handleTimeInputChange(event) {
        const value = Number(event.target.value);
        const timeSlotType = event.target.getAttribute('id') === 'time_slot_select_from' ? "start" : "end";

        const newTimeInput = {
            ...timeInput,
            [timeSlotType]: value, 
        };

        if (newTimeInput.start >= newTimeInput.end) return;

        setTimeInput(newTimeInput);
        
        handleAvailsChange({
            [day]: newTimeInput,
        });
    }

    return (
        <div className={`day_avail_input_container ${day === currentDay ? "" : "hidden"}`}>
            <div className='dav_avail_input_options'>
                <RadioOption
                    setOption={() => { 
                        setCurrentOption(1);
                        setTimeInput(ALL_DAY);
                        handleAvailsChange({
                            [day]: ALL_DAY
                        });
                    }}
                    // className={currentOption === 1 ? "radio_option_selected" : ""}
                    isSelected={currentOption === 1}>
                        Available all day
                </RadioOption>
                <RadioOption
                    setOption={() => {
                        setCurrentOption(2);
                        setTimeInput(ALL_DAY);
                        handleAvailsChange({
                            [day]: timeInput
                        });
                    }}
                    // className={currentOption === 2 ? "radio_option_selected" : ""}
                    isSelected={currentOption === 2}>
                        Available from
                </RadioOption>
                <RadioOption
                    setOption={() => {
                        setCurrentOption(3);
                        setTimeInput(NOT_AVAILABLE);
                        handleAvailsChange({
                            [day]: NOT_AVAILABLE
                        })
                    }}
                    // className={currentOption === 3 ? "radio_option_selected" : ""}
                    isSelected={currentOption === 3}>
                        Not available
                </RadioOption>
            </div>

            {/* if we choose an availability slot, show time options menu */}
            <div className={`day_avail_time_input ${currentOption !== 2 ? 'invisible' : ''}`}>
                <div>
                    <label htmlFor='time_slot_select_from'>From</label>
                    <select id="time_slot_select_from" value={timeInput.start} onChange={handleTimeInputChange}>
                        {getTimeOptions()}
                    </select>
                </div>

                <div>
                    <label htmlFor='time_slot_select_to'>To</label>
                    <select id="time_slot_select_to" value={timeInput.end} onChange={handleTimeInputChange}>
                        {getTimeOptions()}
                    </select>
                </div>
            </div>
        </div>
    )
}