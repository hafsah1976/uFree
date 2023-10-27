// Import necessary libraries and styles
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../assets/login.css";
import { LOG_IN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';

// Define the Login component
const Login = () => {
    // Initialize state to store user's email and password
    const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
        
    // Initialize an error state for handling login errors
    const [error, setError] = useState('');

    // State to control whether to display an alert
    const [showAlert, setShowAlert] = useState(false);

    // Initialize a function to execute the login mutation
    const loginUser = useMutation(LOG_IN,  {
        variables: {...userCredentials},
    });

    // Initialize a state to control the disabled property of the login button
    const [isLoginFormValid, setIsLoginFormValid] = useState(true)

    // Use the useNavigate hook to handle page navigation
    const navigate = useNavigate();

    // Handle changes in the input fields
    const handleChange = (event) => { 
        const { name, value } = event.currentTarget;

        // Update the userCredentials state with the changed input
        setUserCredentials({ ...userCredentials, [name]: value });

        // Check if both email and password are non-empty to determine form validity
        const isFormValid = userCredentials.email.trim() !== '' && userCredentials.password.trim() !== '';

        // Update the isLoginFormValid state based on the form's validity
        setIsLoginFormValid(isFormValid);
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
            // Attempt to log in the user using the 'loginUser' function via the LOG_IN mutation
            const { data } = await loginUser({
                variables: { ...userCredentials }
            });

            // Store the user's token and navigate to the dashboard
            localStorage.setItem('token', Auth.login(data.login.token));
            navigate("/dashboard");

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // Set the error state to display an error message
                setError('Invalid username or password');
                setShowAlert(true);
            }
            
            // Clear the form data
            setUserCredentials({
                email: '',
                password: '',
            });
        };
    };

    // Render the login form and related elements
    return (
        <div className='page-container'>
            <div className='credentials_form_container'>
                <div className='credentials_container'>
                    <h1>Welcome Back!</h1>
                    <div className='form_container'>
                        <form onSubmit={handleOnSubmitEvent}>
                            <h2>Login to Your Account</h2>
                            <input
                                type="email"
                                placeholder="Your E-mail"
                                name="email"
                                onChange={handleChange}
                                value={userCredentials.email}
                                required
                                className='input'
                            />
                            <input
                                type="password"
                                placeholder="Your Password"
                                name="password"
                                onChange={handleChange}
                                value={userCredentials.password}
                                required
                                className='input'
                            />
                            {/* Display an error message if there is an error */}
                            <div className={`error_msg ${showAlert ? '' : 'invisible'}`}>{error}</div>
                            {/* Disable the button if the form is not valid */}
                            <button type="submit" className='nav_btn' disabled={!isLoginFormValid}>
                                Log In
                            </button>
                        </form>
                        <div>
                            <h3>Don't have an account?</h3>
                            <Link to="/signup">
                                <button className='nav_btn'>
                                    Sign Up Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the Login component
export default Login;
