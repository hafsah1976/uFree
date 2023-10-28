import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/homepage.css';

const Home = () => {
  return (
    <div className='App page-container'>
      <section className="content_home_page">
        <section className="home_page_title">uFree</section>
        <section className="home_page_intro">Get Togethers, minus the hassle</section>
        <section className="home_page_buttons">
          <div>
            <Link to="/login">
              <div id="button_login" className="homepage_button">
                Login
              </div>
            </Link>
            <Link to="/signup">
              <div id="button_createEvent" className="homepage_button">
                Create Event
              </div>
            </Link>
          </div>
        </section>
        <div className='image-container'>
          <img
            src={'homepage-image'}
            alt=""
            className="homepage-image"
          />
        </div>
      </section>
      </div>
  );
};

export default Home;
