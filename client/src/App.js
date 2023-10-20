import React from 'react';
import logo from './logo.svg';
import './App.css';

// imports Route as page router through URLs
import { Routes, Route, Router } from 'react-router-dom';

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
      <header className="App-header">
        <section id="content_header">
          <HeaderNavBar />
        </section>
      </header>
      <section id="page_container">
        <PageContainer />
      </section>
    </div>
  );
}

export default App;
