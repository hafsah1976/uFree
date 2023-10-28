import { React, useState } from 'react';
import logo from './logo.svg';
import Auth from './utils/auth';
import './helpers.css';
import './App.css';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

import { Login, GoToEvent, Event, Dashboard, SignUp, Home, Availabilities, CreateEvent } from "./pages/PageContainer.js";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <header className="App-header">
            <section id="content_header">
              <HeaderNavBar logoutFunc={() => setLoggedIn(false)} loggedIn={loggedIn} />
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
              element={<Login loginFunc={() => setLoggedIn(true)} />}
              />
              <Route 
              path='/dashboard'
              element={<Dashboard />}
              />
              <Route 
              path='/events'
              element={<GoToEvent />}
              />
              <Route 
              path='/events/:eventId'
              element={<Event />}
              />
              <Route 
              path='/events/create'
              element={<CreateEvent />}
              />
              <Route 
              path='/signup'
              element={<SignUp loginFunc={() => setLoggedIn(true)} />}
              />
              <Route 
              path='events/:eventId?/availabilities'
              element={<Availabilities />}
              />              
            </Routes>
          </section>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
