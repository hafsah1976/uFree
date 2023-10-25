import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/login.css";
import { AUTH_MUTATION } from '../utils/mutations';

// contains the elements that will be present in the login page
// element ids with DEBUG are dev only and should be removed in working product
const Login = () => {

    // Initialize state for form data and error messages
const [data, setData] = useState({ email: "", password: "" });
const [error, setError] = useState("");

// Handle changes in form input fields
const handleChange = ({ currentTarget: input }) => {
  // Update the 'data' state when an input field value changes
  setData({ ...data, [input.name]: input.value });
};

const handleSubmit = (data) => {
    data.preventDefault();
    console.log(data);
}

    return (
        <section id="content_login_page">
            <p id="DEBUG_login_page_text" className='DEBUG_text'>
                PLACEHOLDER LOGIN TEXT
            </p>
            <div id='login_page_title'>
                <h1>Login to Your Account</h1>
            </div>
            <div id='login_form'>
                <form onSubmit={handleSubmit}>

                </form>
            </div>
        </section>
    );
};

export default Login;