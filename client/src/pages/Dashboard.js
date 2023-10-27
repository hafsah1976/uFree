import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

// import GET_EVENT query
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Dashboard = () => {

    // using the GET_EVENT query
    const { loading, error, data } = useQuery(QUERY_ME);
    console.log(data);

    return (
        <section id="content_dashboard_page">
            <p id="DEBUG_dashboard_page_text" className='DEBUG_text'>
                PLACEHOLDER DASHBOARD TEXT
            </p>
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
                    <div id='board_elements'>
                        {data.user.map(() => (
                            <EventBoxes />
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

function EventBoxes({ userInfo }) {
    return (
        <div>
            {userInfo.events.map((events) => {
                <EventBox key={events._id} />
            })}
        </div>
    );
};

function EventBox() {
    return (
        <div className='event_box'>
            <div id='event_header'>
                <h3>An Event</h3>
            </div>
            <div id="event_footer">
                <p>An event's description</p>
            </div>
        </div>  
    );
};

export default Dashboard;