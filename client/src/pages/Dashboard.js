import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/dashboard.css";

const Dashboard = () => {

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
                        <div className='event_box'>
                            <div id='event_header'>
                                <h3>An Event</h3>
                            </div>
                            <div id="event_footer">
                                <p>An event's description</p>
                            </div>
                        </div>
                        <div className='event_box'>
                            
                        </div>    
                        <div className='event_box'>
                            
                        </div>
                        <div className='event_box'>
                            
                        </div>
                        <div className='event_box'>
                            
                        </div>
                        <div className='event_box'>
                            <div id='event_header'>
                                <h3>An Event</h3>
                            </div>
                            <div id="event_footer">
                                <p>An event's description</p>
                            </div>
                        </div>
                        <div className='event_box'>
                            
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Dashboard;