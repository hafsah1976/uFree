import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

// import GET_EVENT query
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { monthAndDay } from '../utils/convertDate';

const Dashboard = () => {

    const eventBoxes = [1, 2, 3, 4, 5, 6];

    const { loading, error, data } = useQuery(QUERY_ME);
    const events = data?.me.events;

    if (loading) return (
        <p>Loading...</p>
    )

    if (error) return (
        <p>Oops! An error occurred.</p>
    )

    return (
      
        <section id="content_dashboard_page">
            <section id="dashboard_content">
                <div id="header_content">
                    <h1 id='header_title'>Dashboard</h1>
                    <div id="header_buttons">
                        <Link to="/createEventPage">
                            <div id="dashboard_createEvent_button" className='dashboard_button'>Create Event</div>
                        </Link>
                        <Link to="/joinEventPage">
                            <div id="dashboard_joinEvent_button" className='dashboard_button'>Join Event</div>
                        </Link>
                    </div>
                </div>
                <div id="dashboard_event_board">
                    <h2 id='board_title'>
                        Events
                    </h2>
                    {(events.length === 0)
                        ?
                            <p>You have no events.</p>
                        :
                            <div id='board_elements'>
                                {events.map((event) => 
                                    <EventBox key={event._id} event={event} />
                                )}
                            </div>
                    }
                </div>
            </section>
        </section>
    );
};

function EventBox({ event }) {
    return (
        <div className='event_box'>
                <Link to={`/events/${event._id}`}>
                <div className='event_header' style={{
                    backgroundImage: `url("${event.thumbnail}")`,
                    backgroundSize: 'cover',
                }} />

                <div className='event_content'>
                    <p className='event_content_name'>{event.name}</p>
                    <p className='event_content_week'>Week of {monthAndDay(event.week)}</p>
                </div>
        </Link>
            </div>
    );
};

export default Dashboard;