import React from "react";

// contains the elements that will be present inside the header
const HeaderNavBar = () => {
    return (
        <section id="content_header_nav">
            <section id="header_nav_buttons">
                <a href=""><div id="button_login" className="header_nav_button">Login</div></a>
                <a href=""><div id="button_createEvent"className="header_nav_button">Create Event</div></a>
            </section>
        </section>
    )
}

export default HeaderNavBar;