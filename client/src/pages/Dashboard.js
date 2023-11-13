import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

// import GET_EVENT query
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { monthAndDay } from '../utils/convertDate';

const Dashboard = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const events = data?.me.events;

    function eventBoxes() {
        if (error) return (
            <p>Oops! An error occurred.</p>
        );

        if (loading) return (
            <p>Loading...</p>
        );
    
        if (events.length === 0) return (
            <p>You have no events.</p>
        )

        return (
            <div id='board_elements'>
                {events.map((event) => 
                    <EventBox key={event._id} event={event} />
                )}
            </div>
        )
    }


    return (
        <section id="content_dashboard_page">
            <section id="dashboard_content">
                <div id="header_content">
                    <h1 id='header_title'>Dashboard</h1>
                    <div id="header_buttons">
                        <Link to="/events/create">
                            <button className='btn_large btn_accent dashboard_btn'>
                                <i className="bi bi-plus-lg" style={{marginRight: 'var(--padding-sm)'}}></i>
                                Create Event
                            </button>
                        </Link>
                        <Link to="/events/join">
                            <button className='btn_large btn_accent dashboard_btn'>
                                <i className="bi bi-door-open" style={{marginRight: 'var(--padding-sm)'}}></i>
                                Join Event
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="dashboard_event_board">
                    <h2 id='board_title'>
                        Events
                    </h2>
                    {eventBoxes()}
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
                    backgroundPosition: '50%',
                }} />

                <div className='event_content'>
                    <p className='event_content_name'>{event.name}</p>
                    <div className='event_content_info'>
                        <p className='event_content_week'>Week of {monthAndDay(event.week)}</p>
                        <p className='event_content_week'>{event.attendees.length} <i className="bi bi-person-arms-up"></i></p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Dashboard;