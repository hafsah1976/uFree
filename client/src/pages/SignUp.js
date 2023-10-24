import React from 'react';
import { useState } from 'react'; // Importing the useState hook
import { Link, useNavigate } from 'react-router-dom'; // Importing the Link component and useNavigate hook.
import Auth from '../utils/auth'; // Importing the Auth utility
import '../assets/signup.css';

// Defining the Signup component/page
const Signup = () => {

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

  // Rendering of the Signup component
  return (
    <>
      <div className='signup-container'>
        {/* The Signup form */}
        <form>
          {/* Input field for the username */}
          <input
            type="text"
            placeholder="Create your Username"
            name="username"
            value={data.username}
            // Add validation to check if the username is taken
          />

          {/* Input field for the email address */}
          <input 
            type="email"
            placeholder="Your Email"
            name="email"
            value={data.email}
            // add validation to check if the user with this email already exists
          />

          {/* Input field for the password */}
          <input
            type="password"
            placeholder="Create Your Password"
            name="password"
            value={data.password}
            onChange={(e) => {setData({...data, password: e.target.value})}}
            // Add an event handler (onChange) to update the password in the state, 
            //validation for password exists in the user model..??
          />
          {/* Display any error messages */}
          {error && <p className="error">{error}</p>}

          {/* Submit button */}
          <button type="submit">Sign Up</button>
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