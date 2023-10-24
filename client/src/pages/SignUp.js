import React from 'react';
import { useState } from 'react'; // Importing the useState hook
import { Link, useNavigate } from 'react-router-dom'; // Importing the Link component and useNavigate hook.
import Auth from '../utils/auth'; // Importing the Auth utility
import '../assets/signup.css';
import { useMutation } from "../utils/mutations"; // Import the useMutation hook from Apollo Client
import { REGISTER_USER_MUTATION } from "./graphql"; // Importing GraphQL mutation

// Defining the Signup component/page
const Signup = () => {

  // JSX for a debug placeholder (can be removed in production)
  <section id="signup_page">
    <p id="DEBUG_signup_page" >
      PLACEHOLDER SIGNUP TEXT
    </p>
  </section>

  // Initializing state using the useState hook
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Initializing state to manage error messages
  const [error, setError] = useState('');

  // Obtaining a navigation function using the useNavigate hook
  const navigate = useNavigate();

  // Handle form submission when the user attempts to sign up
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Use the useMutation hook to execute your GraphQL mutation
      const [signup] = useMutation(REGISTER_USER_MUTATION, {
        variables: { input: data }, // Assuming data contains user registration input
      });

      // Execute the GraphQL mutation by invoking the signup function
      const response = await signup();

      // Check if the response indicates a successful registration
      if (response.data.signup) {
        Auth.login(response.data.signup.token); // Log in the user with the received token
        // If the registration is successful, navigate to the login page
        navigate("/login");
        console.log("Success! You may proceed and start creating your events! Don't Forget to Share!");
      }
    } catch (error) {
      // Handle errors here, if needed
      console.error("Failed to sign-up user");
      setError(error.message); // Set the error message if there's an error
    }
  };
  
  // Rendering of the Signup component
  return (
    <>
      <div className='signup-container'>
        {/* The Signup form */}
        <form className={'form-container'} onSubmit={handleSubmit}>
          <h1>Please Create your Account</h1>
          {/* Input field for the username */}
          <input
            type="text"
            placeholder="Create your unique Username"
            name="username"
            value={data.username}
            required
            className={'input'}
            // Add validation to check if the username is taken
          />

          {/* Input field for the email address */}
          <input 
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            class={'input'}
            // Add validation to check if the user with this email already exists
          />

          {/* Input field for the password */}
          <input
            type="password"
            placeholder="Create Your Password"
            name="password"
            value={data.password}
            required
            onChange={(e) => {setData({...data, password: e.target.value})}}
            className={'input'}// Add an event handler (onChange) to update the password in the state,
            // validation for password exists in the user model..??
          />
          {/* Display any error messages */}
          {error && <p className="error_msg">{error}</p>}

          {/* Submit button */}
          <button className='signup-btn' type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>

        {/* Link to navigate to a different page, e.g., the login page if the user already has an account */}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </>
  );
}

export default Signup; // Export the Signup component
