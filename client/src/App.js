import React from 'react';
import logo from './logo.svg';
import './App.css';

// importing normalize.css to normalize page element styling
import './normalize.css'

// imports Route as page router through URLs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// imports Home as landing page for the site
// uses empty URL
import Home from "./pages/Home.js"
import PageContainer from './pages/PageContainer';

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import HeaderNavBar from "./components/HeaderNavBar/index.js";

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
            path='/:pathName'
            element={<PageContainer />}
            />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
