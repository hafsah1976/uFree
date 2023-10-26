import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../assets/login.css";
import { login } from "../utils/mutations"; // Import the LOGIN_USER mutation
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';

// contains the elements that will be present in the login page
// element ids with DEBUG are dev only and should be removed in work ing product
const Login = () => {

    // Initialize state for form data which containst user credentials 
    const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
    const [validated] = useState(false); //validate form status
    //const [error, setError] = useState(""); //for initializing error messages
    const [showAlert, setShowAlert] = useState(false);// Alert display state

    // TODO: change these to useMutation when ready
    const loginUser = () => console.warn('TODO: LOGIN_USER MUTATION');
    const error = {};
    // const [loginUser] = useMutation(LOGIN_USER);// Use useMutation to execute the LOGIN_USER mutation

    // function to handle changes in form input fields
    const handleChange = (event) => 
    { 
        const { name, value } = event.currentTarget;
    // Update the 'data' state when an input field value changes
    setUserCredentials({ ...userCredentials, [name]: value });
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
            // Clear the form data
        setUserCredentials({
            email: '',
            password: '',
        });
        };

        }
          return (
            <div className='login_container'>
                <div className='login_form_container'>
                    <div className='left'>
                        <form className='form_container' onSubmit={handleOnSubmitEvent}>
                            <h1>Login to Your Account</h1>
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
						{error && <div className='error_msg'>{error}</div>}
						<button type="submit" className='login_btn'>
							Log In
						</button>
					</form>
				</div>
				<div className='right'>
					<h1>New Here?</h1>
					<Link to="/signup">
						<button type="button" className='signup_btn' >
							Sign Up Now
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
