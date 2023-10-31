import { useState } from 'react';
import { hourToNumber } from '../../../utils/convertDate';

import './DayAvailInput.css';
import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

import RadioOption from '../../RadioOption';
import TimePicker from 'react-time-picker';

const NOT_AVAILABLE = { start: 0, end: 0 };
const ALL_DAY = { start: 0, end: 24 };

export default function DayAvailInput({ day, currentDay, handleAvailsChange, avails }) {

    console.log('avails variable: ', avails);

    const [currentOption, setCurrentOption] = useState(1);
    const [timeInput, setTimeInput] = useState(ALL_DAY);
    const [timePickerInput, setTimePickerInput] = useState({
        start: avails.start,
        end: avails.end
    });

    function handleTimeInputChange(value, type) {
        const hourNum = hourToNumber(value);

        const newTimeInput = {
            ...timeInput,
            [type]: hourNum,
        };

        // console.log(newTimeInput);

        if (newTimeInput.start >= newTimeInput.end) return;

        setTimePickerInput({
            ...timePickerInput,
            [type]: value
        });
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
                    isSelected={currentOption === 3}>
                        Not available
                </RadioOption>
            </div>

            {/* if we choose an availability slot, show time options menu */}
            <div className={`day_avail_time_input ${currentOption !== 2 ? 'invisible' : ''}`}>
                <div className='time_slot_container'>
                    <label htmlFor='time_slot_select_from'>From</label>
                    <TimePicker onChange={(value) => handleTimeInputChange(value, 'start')} value={timePickerInput.start} disableClock={true} clearIcon={null} />
                </div>

                <div className='time_slot_container'>
                    <label htmlFor='time_slot_select_to'>To</label>
                    <TimePicker onChange={(value) => handleTimeInputChange(value, 'end')} value={timePickerInput.end} disableClock={true} clearIcon={null} />
                </div>
            </div>
        </div>
    )
}
