import React from 'react';

const Home = () => {

    return (
        <section id="content_home_page">
            <section id='home_page_title'>uFree</section>
            <section id='home_page_intro'>Get Togethers, minus the hassle</section>
            <section id='home_page_buttons'>
                <div>
                    <a href=""><div id="button_login" className="homepage_button">Login</div></a>
                    <a href=""><div id="button_createEvent"className="homepage_button">Create Event</div></a>
                </div>
            </section>
        </section>
    );
};

export default Home;