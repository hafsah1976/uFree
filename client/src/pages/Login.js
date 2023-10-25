import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../assets/login.css";
import { LOGIN_USER } from "../utils/mutations"; // Import the LOGIN_USER mutation
import { useMutation } from "@apollo/client";
import { Auth } from 'client/src/utils/auth.js';


// contains the elements that will be present in the login page
// element ids with DEBUG are dev only and should be removed in working product
const Login = () => {

// Initialize state for form data which containst user credentials 
const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
const [validated] = useState(false); //validate form status
//const [error, setError] = useState(""); //for initializing error messages
const [showAlert, setShowAlert] = useState(false);// Alert display state
const [loginUser] = useMutation(LOGIN_USER);// Use useMutation to execute the LOGIN_USER mutation

// function to handle changes in form input fields
const handleChange = (event) => 
{ 
    const { name, value } = event.currentTarget;
  // Update the 'data' state when an input field value changes
  userCredentials({ ...userCredentials, [name]: value });
};

// Define the event handler for form submission
const handleOnSubmitEvent = async (event) => {
    event.preventDefault();

    // Check if the form has all the required fields (as per react-bootstrap docs)
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        // Attempt to log in the user using the 'loginUser' function via the LOGIN_USER mutation
        const { data } = await loginUser({
            variables: { ...userCredentials }
        });

        // Extract the token and user data from the API response
        localStorage.setItem('token', Auth.login(data.login.token));

    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            setShowAlert(true); // Display an alert for login failure
        }
    }
};

   // Create a function to handle the form submission
const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    return (
        <section id="content_login_page">
            <p id="DEBUG_login_page_text" className='DEBUG_text'>
                PLACEHOLDER LOGIN TEXT
            </p>
        </section>
    );
};
}
export default Login;