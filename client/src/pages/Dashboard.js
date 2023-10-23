import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

const Dashboard = () => {

    return (
        <section id="content_dashboard_page">
            <p id="DEBUG_dashboard_page_text" className='DEBUG_text'>
                PLACEHOLDER DASHBOARD TEXT
            </p>
            <section id="dashboard_header">
                <div id="header_content">
                    <h1 id='header_title'>Dashboard</h1>
                    <div id="header_buttons">
                        <Link to="/createEventPage">
                            <div id="dashboard_createEvent_button">Create Event</div>
                        </Link>
                        <Link to="/joinEventPage">
                            <div id="dashboard_joinEvent_button">Join Event</div>
                        </Link>
                    </div>
                </div>
                <div id="header_event_board"></div>
            </section>
        </section>
    );
};

export default Dashboard;