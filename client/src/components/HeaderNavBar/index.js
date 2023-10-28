import React from "react";
import { Outlet, Link } from "react-router-dom";

// contains the elements that will be present inside the header
// element ids with DEBUG are dev only elements and should be removed in working product
const HeaderNavBar = () => {
    return (
        <section id="content_header_nav">
            <section id="header_nav_buttons">
                <Link to="/"><div id="DEBUG_button_homepage" className="header_nav_button">Home</div></Link>
                <Link to="/login"><div id="button_login" className="header_nav_button">Login</div></Link>
                <Link to="/signup"><div id="button_login" className="header_nav_button">Sign Up</div></Link>
                <Link to="/dashboard"><div id="DEBUG_button_dashboard" className="header_nav_button">Dashboard</div></Link>
                <Link to="/events/create"><div id="button_createEvent"className="header_nav_button">Create Event</div></Link>
                <Link to="/events"><div id="DEBUG_button_eventPage" className="header_nav_button">Search Event</div></Link>
                {/* <Link to="/events/availabilities"><div id="DEBUG_button_availabilities" className="header_nav_button">Availabilities</div></Link> */}
            </section>
        </section>
    )
}

export default HeaderNavBar;