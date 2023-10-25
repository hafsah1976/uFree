import React from 'react';
import { useState } from 'react'; // Importing the useState hook
import { Link, useNavigate } from 'react-router-dom'; // Importing the Link component and useNavigate hook.
import Auth from '../utils/auth'; // Importing the Auth utility
import '../assets/signup.css';
import { useMutation } from "@apollo/client"; // Import the useMutation hook from Apollo Client
// import { REGISTER_USER_MUTATION } from "./graphql"; // Importing GraphQL mutation
// import { signToken } from '../../../server/utils/auth';

// Defining the Signup component/page
const Signup = () => {
  // Initializing state using the useState hook
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Initializing state to manage error messages
  const [error, setError] = useState('');

 // Define a state variable to track whether the username is available or taken
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  // Use the useMutation hook to execute your GraphQL mutation
  const signup = () => console.warn('TODO: add useMutation when ready for signup');
  // const [signup] = useMutation(REGISTER_USER_MUTATION, {
  //   variables: { input: data }, // Assuming data contains user registration input
  // });

  //Create a function to check if the username is taken
  const checkUsernameAvailability = async (username) => {
    // Make an API request to your server to check if the username is taken
    try {
      const response = await fetch(`/api/check-username?username=${username}`);
      const data = await response.json();
      setIsUsernameTaken(data.isTaken);
    } catch (error) {
      // Handle errors, e.g., connection issues
      console.error("Error checking username availability:", error);
    }
  };
  

  // Obtaining a navigation function using the useNavigate hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.warn('TODO: handle change');
  }

  // Handle form submission when the user attempts to sign up
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {

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
      <div className={'signup_container'}>
        <div className={'signup_form_container'}>
          <div className={'left'}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={'login_btn'}>
                Log in
              </button>
            </Link>
          </div>
          <div className={'right'}>
            <form className={'form_container'} onSubmit={handleSubmit}>
              <div className='signup-container'>
                {/* The Signup form */}
                <form className={'form-container'} onSubmit={handleSubmit}>
                  <h1>Please Create an Account</h1>
                  {/* Input field for the username */}
                  <input
                  type="text"
                  placeholder="Create your unique Username"
                  name="username"
                  value={data.username}
                  required
                  className={'input'}
                  onChange={(e) => {
    setData({ ...data, username: e.target.value });
    checkUsernameAvailability(e.target.value);
  }}
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
                  {isUsernameTaken ? (
  <p className="error_msg">Username is already taken.</p>
) : null}

                  {error && <p className="error_msg">{error}</p>}

                  {/* Submit button */}
                  <button className='signup-btn' type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>

                {/* Link to navigate to a different page, e.g., the login page if the user already has an account */}
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup; // Export the Signup component
