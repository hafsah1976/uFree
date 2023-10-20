import React, { useState } from 'react';
import Login from './Login';
import Event from './Event';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Home from './Home';

const PageContainer = () => {
    const [currentPage, setCurrentPage] = useState('Home');

    switch (currentPage) {
        case "Home": return <Home />
        case "Login": return <Login />
        case "SignUp": return <SignUp />
        case "Dashboard": return <Dashboard />
        case "Event": return <Event />
    }

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <section id="content_page_container">
            
        </section>
    );
};

export default PageContainer;