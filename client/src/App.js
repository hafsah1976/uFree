import React from 'react';
import logo from './logo.svg';
import './App.css';

// imports Route as page router through URLs
import { Route } from 'react-router-dom';

// imports Home as landing page for the site
// uses empty URL
import { Home } from "./pages/Home.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <section id="page_container">
          <Route path = "/" element={<Home />}></Route>
        </section>
      </header>
    </div>
  );
}

export default App;
