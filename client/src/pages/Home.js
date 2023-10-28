import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/homepage.css';

import { pageImages } from '../images';

const Home = () => {
  return (
    <div className='App page-container'>
      <section className="content_home_page">
        <section className="home_page_title">uFree</section>
        <section className="home_page_intro">Get-Togethers,</section>
        <section className="home_page_intro_sub">Minus the Hassle</section>
        <section className="home_page_buttons">
          <div>
            <Link to="/signup">
              <button id="button_createEvent" className="homepage_button btn_accent">Create an Event</button>
            </Link>
            <Link to="/login">
              <button id="button_login" className="homepage_button btn_light">Login</button>
            </Link>
          </div>
        </section>
        
      </section>

      <div
        className='homepage_image_container'
        style={{
          backgroundImage: `url("${pageImages.home}")`,
          backgroundPositionY: '100%',
          backgroundSize: 'contain'
        }}
      >
        {/* <img
          src={pageImages.home}
          alt="Homepage background"
          className="homepage-image"
        /> */}
      </div>
    </div>
  );
};

export default Home;
