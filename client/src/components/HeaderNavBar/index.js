import React from "react";
import { Outlet, Link } from "react-router-dom";

// contains the elements that will be present inside the header
const HeaderNavBar = () => {
    return (
        <section id="content_header_nav">
            <section id="header_nav_buttons">
                <Link to="/login"><div id="button_login" className="header_nav_button">Login</div></Link>
                <Link to="/createEvent"><div id="button_createEvent"className="header_nav_button">Create Event</div></Link>
            </section>
        </section>
    )
}

export default HeaderNavBar;