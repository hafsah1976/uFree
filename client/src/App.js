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
import { createBrowserRouter, createRoutesFromElements, Outlet, BrowserRouter, Routes, Route, redirect, RouterProvider, Navigate } from 'react-router-dom';

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import HeaderNavBar from "./components/HeaderNavBar/index.js";

// imports Home as landing page for the site
// uses empty URL
//import Home from "./pages/Home.js"
//import Login from './pages/Login.js';

import { Login, GoToEvent, Event, Dashboard, SignUp, Home, Availabilities, EditAvails, CreateEvent, JoinEvent } from "./pages/PageContainer.js";

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

function Layout({ loggedIn, setLoggedIn }) {
  return (
    <>
      <header className="App-header">
              <section id="content_header">
                <HeaderNavBar logoutFunc={() => setLoggedIn(false)} loggedIn={loggedIn} />
              </section>
      </header>
      <section id="page_container">
        <Outlet />
      </section>
    </>
  )
}



function Root({ loggedIn, setLoggedIn }) {
  return (
    <Routes>
        {/* <Route
          path='/'
          element={loggedIn ? <Dashboard /> : <Home />}
        /> */}
        {/* <Route
          path='/login'
          element={<Login loginFunc={() => setLoggedIn(true)} />}
        /> */}
        {/* <Route
          path='/dashboard'
          element={<Dashboard />}
        /> */}
        {/* <Route
          path='/events/:eventId'
          element={<Event />}
        /> */}
        {/* <Route
          path='/events/create'
          element={<CreateEvent />}
        /> */}
        {/* <Route
          path='/signup'
          element={<SignUp loginFunc={() => setLoggedIn(true)} />}
        /> */}
        {/* <Route
          path='events/:eventId/availabilities'
          element={<Availabilities />}
        /> */}
        {/* <Route
          path='events/:eventId/availabilities/edit'
          element={<EditAvails />}
        /> */}
        {/* <Route
          path='/events/join'
          element={<JoinEvent />}
        /> */}
    </Routes>
  )
}

const authLoader = (loggedIn) => {
  return !loggedIn ? redirect('/login') : null;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  console.log(loggedIn);

  const router = createBrowserRouter([
    { path: "/", Component: () => <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />, children: [
      { path: "/", Component: Home, loader: () => loggedIn ? redirect('/dashboard') : null },
      { path: "/signup", Component: () => <SignUp loginFunc={() => setLoggedIn(true)} /> },
      { path: "/login", Component: () => <Login loginFunc={() => setLoggedIn(true)} /> },
      { path: '/dashboard', Component: Dashboard, loader: () => authLoader(loggedIn) },
      { path: '/events/:eventId', Component: Event, loader: () => authLoader(loggedIn) },
      { path: '/events/create', Component: CreateEvent, loader: () => authLoader(loggedIn) },
      { path: '/events/join', Component: JoinEvent, loader: () => authLoader(loggedIn) },
      { path: 'events/:eventId/availabilities', Component: Availabilities, loader: () => authLoader(loggedIn) },
      { path: 'events/:eventId/availabilities/edit', Component: EditAvails, loader: () => authLoader(loggedIn) },
    ] },
    { path: '*', Component: () => <Navigate to="/" />, }
  ])

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
