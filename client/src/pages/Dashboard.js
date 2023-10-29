import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

// import GET_EVENT query
import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Dashboard = () => {

    const eventBoxes = [1, 2, 3, 4, 5, 6];

    const { loading, error, data } = useQuery(QUERY_ME);

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
                        <div key={data._id}>
                            {data.events.map((event) => {
                                <EventBox prop={event} />
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

function EventBox(event_data) {
    return (
        <div className='event_box'>
            <div id='event_header'>

            </div>
            <div id='event_footer'>

            </div>
        </div>
    );
};

export default Dashboard;