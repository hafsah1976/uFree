import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { useAuth, useAuthDispatch } from "../utils/AuthContext";
import { SIGN_UP } from "../utils/mutations";
import { pageImages } from "../images";

const Signup = () => {
  // State to hold user input and form validation
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for displaying alerts
  const [showAlert, setShowAlert] = useState(false);

  // Initialize an error state for handling sign-up errors
  const [error, setError] = useState('');

  // State for pressing sign up button
  const [signupPressed, setSignupPressed] = useState(false);

  // Use the signUp mutation
  const [signup] = useMutation(SIGN_UP);

  const dispatch = useAuthDispatch();

  // Function to handle changes in form inputs
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserCredentials({ ...userCredentials, [name]: value });

  // Check if username , email and password are non-empty to determine form validity
  // const isFormValid = userCredentials.username.trim() !== '' && userCredentials.email.trim() !== '' && userCredentials.password.trim() !== '';

  // Update the iIsSignUpFormValid state based on the form's validity
  // setIsSignUpFormValid(isFormValid);
  };

  // Use the navigate hook for page navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmitEvent = async (event) => {
    event.preventDefault();

    // Check if the form has all the required fields (as per react-bootstrap docs)
    // const signupForm = event.target;
    // if (signupForm.checkValidity() === false) {
    //   event.preventDefault();    }

    console.log('submit!');

    try {
      // Attempt to sign up the user by calling the signUp mutation
      const { data, error } = await signup({
        variables: { ...userCredentials },
      });

      if (error) {
        // Handle the case where sign-up fails
        console.error("Failed to sign-up user");
        setError("Failed to sign up. Please try again."); // Set an error message
        setShowAlert("Please enter a valid email to sign up"); // Display an alert
        return;
      }

      // Check if the registration was not successful
      if (!data.signup) return;

      console.log(data);

      await dispatch({
        type: 'login',
        payload: {
          token: data.signup.token
        }
      });
      setSignupPressed(true);
      setShowAlert(true); // Display an alert
    }
    catch (error) {
      console.error("Failed to sign-up user", error);
      // Handle additional errors if needed
    }
      // Clear the form inputs
      setUserCredentials({
        username: "",
        email: "",
        password: "",
      });

  };

  const auth = useAuth();

  // navigate to dashboard if signup is pressed and user context is recieved
  useEffect(() => {
    if (!signupPressed) return;
    if (!auth.user?._id) return;
    
    setSignupPressed(false);
    navigate('/dashboard');
    
  }, [auth, navigate, signupPressed, setSignupPressed])

  return (
    <div className='page-container blue_page_background no_navbar'>
      <div className='credentials_form_container'>
        <div className='credentials_container'>
          <div className="form_container">
            <form id= 'signup-form' onSubmit={handleSubmitEvent}>
              <h1>Please Create an Account</h1>
              <input
                type="text"
                placeholder="Unique Username"
                name="username"
                value={userCredentials.username}
                required
                className='input'
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                onChange={handleInputChange}
                value={userCredentials.email}
                required
                className='input'
              />
              <input
                type="password"
                placeholder="Create Your Password"
                name="password"
                value={userCredentials.password}
                required
                onChange={handleInputChange}
                className='input'
              />
              {/* Display an error message if there is an error */}
              <div className={`error_msg ${showAlert ? '' : 'invisible'}`}>{error}</div>
              <button className='nav_btn btn_accent btn' type="submit" >Sign Up</button>
              <div>
              <h3>Already have an account?</h3>
              <Link to="/login">
                <button className="nav_btn btn_accent btn">Log In</button>
              </Link>
            </div>

            <div className={`success_msg ${showAlert ? '' : 'invisible'}`}>
              Success! You may proceed and start creating your events! Don't Forget to Share!
            </div>

            </form>
          </div>
        </div>
      </div>

      <img
          className='signup_background_image'
          src={pageImages.signup}
          alt="Login background"
      />
    </div>
    );
  };

  export default Signup;
