import { React } from 'react';
import { ApolloProvider } from '@apollo/client';

import { client } from './utils/apolloClient.js';
import Auth from './utils/auth';
import { AuthProvider } from './utils/AuthContext.js';
import { authLoader, dashboardLoader, eventLoader } from './utils/loaders.js';

// importing normalize.css to normalize page element styling
// import logo from './logo.svg';
import './normalize.css'
import './helpers.css';
import './App.css';

// imports Route as page router through URLs
import { createBrowserRouter, Outlet, redirect, RouterProvider, Navigate } from 'react-router-dom';

// imports HeaderNav
// elements in HeaderNav will be used as the elements present in the page header
import HeaderNavBar from "./components/HeaderNavBar/index.js";
import { Login, Event, Dashboard, SignUp, Home, Availabilities, EditAvails, CreateEvent, JoinEvent, ServerError, Error404 } from "./pages/PageContainer.js";

function Layout() {
  return (
    <>
      <header className="App-header">
        <section id="content_header">
          <HeaderNavBar />
        </section>
      </header>

      <section id="page_container">
        <Outlet />
      </section>
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    { path: "/", Component: Layout, ErrorBoundary: ServerError, children: [
      { path: "/", Component: Home, loader: () => Auth.loggedIn() ? redirect('/dashboard') : null },
      { path: "/signup", Component: () => <SignUp /> },
      { path: "/login", Component: () => <Login /> },
      { path: '/dashboard', Component: Dashboard, loader: dashboardLoader },
      { path: '/events/:eventId', Component: Event, loader: eventLoader },
      { path: '/events/create', Component: CreateEvent, loader: authLoader },
      { path: '/events/join', Component: JoinEvent, loader: authLoader },
      { path: 'events/:eventId/availabilities', Component: Availabilities, loader: authLoader },
      { path: 'events/:eventId/availabilities/edit', Component: EditAvails, loader: authLoader },
    ] },
    { path: '*', Component: Error404, ErrorBoundary: ServerError }
  ])

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
