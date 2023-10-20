import React from 'react';
import logo from './logo.svg';
import './App.css';

// imports Route as page router through URLs
import { Route } from 'react-router-dom';

// imports Home as landing page for the site
// uses empty URL
import { Home } from "./pages/Home.js"

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import { HeaderNav } from "./components/HeaderNavBar/index.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <section id="content_header">
          <HeaderNav />
        </section>
        <section id="page_container">
          <Route path = "/" element={<Home />}></Route>
        </section>
      </header>
    </div>
  );
}

export default App;
