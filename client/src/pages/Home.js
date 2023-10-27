import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <section id="content_home_page">
            <section id='home_page_title'>uFree</section>
            <section id='home_page_intro'>Get Togethers, minus the hassle</section>
            <section id='home_page_buttons'>
                <div>
                    <Link to="/login"><div id="button_login" className="homepage_button">Login</div></Link>
                    <Link to="/createEvent"><div id="button_createEvent"className="homepage_button">Create Event</div></Link>
                </div>
            </section>
        </section>
    );
};

export default Home;