import React from 'react';
import logo from './logo.svg';
import './helpers.css';
import './App.css';

// importing normalize.css to normalize page element styling
import './normalize.css'

// imports Route as page router through URLs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import HeaderNavBar from "./components/HeaderNavBar/index.js";

// imports Home as landing page for the site
// uses empty URL
//import Home from "./pages/Home.js"
//import Login from './pages/Login.js';

import { Login, Event, Dashboard, SignUp, Home, Availabilities, CreateEvent } from "./pages/PageContainer.js";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <section id="content_header">
            <HeaderNavBar />
          </section>
        </header>
        <section id="page_container">
          <Routes>
            <Route 
            path='/'
            element={<Home />}
            />
            <Route 
            path='/login'
            element={<Login />}
            />
            <Route 
            path='/dashboard'
            element={<Dashboard />}
            />
            <Route 
            path='/eventPage'
            element={<Event />}
            />
            <Route 
            path='/events/create'
            element={<CreateEvent />}
            />
            <Route 
            path='/signup'
            element={<SignUp />}
            />
            <Route 
            path='events/:eventId?/availabilities'
            element={<Availabilities />}
            />              
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
