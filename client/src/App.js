import { React, useState } from 'react';
//import logo from './logo.svg';
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
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { Login, GoToEvent, Event, Dashboard, SignUp, Home, Availabilities, EditAvails, CreateEvent, JoinEvent } from "./pages/PageContainer.js";

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import HeaderNavBar from "./components/HeaderNavBar/index";

// imports Home as landing page for the site
// uses empty URL
//import Home from "./pages/Home.js"
//import Login from './pages/Login.js';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/graphql' : '/graphql',
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
  // State to track user's login status
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <header className="App-header">
            <section id="content_header">
              {/* Header component with logout functionality */}
              <HeaderNavBar logoutFunc={() => setLoggedIn(false)} loggedIn={loggedIn} />
            </section>
          </header>
          <section id="page_container">
            <Routes>
              {/* Landing page when the URL is the root */}
              <Route path='/' element={loggedIn ? <Dashboard /> : <Home />} />

              {/* Login page */}
              <Route path='/login' element={<Login loginFunc={() => setLoggedIn(true)} />} />

              {/* Dashboard page */}
              <Route path='/dashboard' element={<Dashboard />} />

              {/* Page to list events */}
              <Route path='/events' element={<GoToEvent />} />

              {/* Individual event page */}
              <Route path='/events/:eventId' element={<Event />} />

              {/* Page to create a new event */}
              <Route path='/events/create' element={<CreateEvent />} />

              {/* Signup page */}
              <Route path='/signup' element={<SignUp loginFunc={() => setLoggedIn(true)} />} />

              {/* Page to manage event availabilities */}
              <Route path='events/:eventId?/availabilities' element={<Availabilities />} />

              {/* Page to edit event availabilities */}
              <Route path='events/:eventId?/availabilities/edit' element={<EditAvails />} />

              {/* Page to join an event */}
              <Route path='/events/join' element={<JoinEvent />} />
            </Routes>
          </section>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
