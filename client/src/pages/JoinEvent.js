import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import { JOIN_EVENT } from '../utils/mutations';
import { pageImages } from '../images';

const JoinEvent = () => {
    const [joinEventInput, setJoinEventInputs] = useState({
        event_joincode: '',
    });

    const [joinEvent] = useMutation(JOIN_EVENT);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const event_code = event.target.value;
        setJoinEventInputs(values => ({...values, [name]: event_code}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(joinEventInput);
        const { data, error } = await joinEvent({
            variables: {
                code: joinEventInput.event_joincode
            }
        });

        if (error) {
            console.error(error);
            return;
        }

        if (data.joinEvent) {
            navigate(`/events/${data.joinEvent._id}`);
        }
    };

    return(
        <section id='content_joinEvent_page' className='blue_page_background'>
            <p id="DEBUG_joinEvent_page_text" className='DEBUG_text'>
                <div> <p className='joinT'> Join an Event</p>
            <p className='joinTT'>Type your event code below</p></div>
            <hr></hr>

            </p>
            <section id="joinEvent_form">
                <form onSubmit={handleSubmit} className='forme'>
                    <input
                    type='text'
                    name='event_joincode'
                    placeholder='Event code'
                    value={joinEventInput.event_joincode}
                    onChange={handleChange} className='inputp'>
                    </input>
                    <br></br>
                    <input type='submit' value="submit"  className='buttonJE'/>
                </form>
            </section>
          
            <div
        className='homepage_image_container'
        style={{
          backgroundImage: `url("${pageImages.home}")`,
          backgroundPositionY: '100%',
          backgroundSize: 'contain'
        }}
      >
        {/* <img
          src={pageImages.home}
          alt="Homepage background"
          className="homepage-image"
        /> */}
      </div>
        </section>
    );
};

export default JoinEvent;