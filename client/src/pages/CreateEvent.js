import React from 'react';
import "../assets/createEvent.css"

const CreateEvent = () => {

    return (
        <section id="content_createEvent_page">
            <p id="DEBUG_createEvent_page_text" className='DEBUG_text'>
                PLACEHOLDER CREATE EVENT PAGE TEXT
            </p>

            <div id='createEvent_page_title'>
                <h1>Create an Event</h1>
            </div>
            <div id="createEvent_form">
                <form>
                        <input type='text' id="event_name" placeholder='Name your event...' />
                        <input type='text' id="event_week" placeholder='Week of your event...' />
                        <input type='text' id="event_location" placeholder='Location of your event...' />
                        <input type='text' id="event_description" placeholder='Description of your event...' />         

                        <select id='event_thumbnail'>
                            <option value="thumbnail_tools">Tools</option>
                            <option value="thumbnail_party">Party</option>
                            <option value="thumbnail_celebration">Celebration</option>
                            <option value="thumbnail_scenery">Scenery</option>
                        </select>
                
                        <input type='submit' value="submit" />           
                    </form>
                </div>
        </section>
    );
};

export default CreateEvent;