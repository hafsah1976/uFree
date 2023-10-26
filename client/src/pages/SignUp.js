import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import "../assets/signup.css";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../utils/mutations";

const Signup = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false); // State for displaying alerts
  const [error, setError] = useState(""); // State for storing error messages
  // Use the signup mutation
  const [signUp] = useMutation(SIGN_UP, {
    variables: { ...userCredentials },
  });

  // Function to handle changes in form inputs
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmitEvent = async (event) => {
    event.preventDefault();

    // const signupForm = event.currentTarget;
    // if (signupForm.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // Perform user registration by calling the addUser mutation
    const { data, error } = await signUp();

    if (error) {
      console.error("Failed to sign-up user");
      setError(error.message);
      setShowAlert("Failed to sign up. Please try again.");
      return;
    }

    console.log('Data:', data);
    console.log('Data Signup:', data.signup);

    // Check if the registration was successful
    if (data.signup) {
      Auth.login(data.signup.token); // Log in the user
      navigate("/dashboard");
      setShowAlert(true);
    }

    // Clear the form inputs
    setUserCredentials({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className={"signup_container"}>
        <div className={"signup_form_container"}>
          <div className={"left"}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={"login_btn"}>
                Log in
              </button>
            </Link>
          </div>
          <div className="right">
            <div className="form_container" onSubmit={handleSubmitEvent}>
              <div className="signup-container">
                <form className="form-container" onSubmit={handleSubmitEvent}>
                  <h1>Please Create an Account</h1>
                  <input
                    type="text"
                    placeholder="Create your unique Username"
                    name="username"
                    value={userCredentials.username}
                    required
                    className="input"
                    onChange={(event) => {
                      setUserCredentials({ ...userCredentials, username: event.target.value });
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleInputChange}
                    value={userCredentials.email}
                    required
                    className="input"
                  />
                  <input
                    type="password"
                    placeholder="Create Your Password"
                    name="password"
                    value={userCredentials.password}
                    required
                    onChange={(event) => {
                      setUserCredentials({ ...userCredentials, password: event.target.value });
                    }}
                    className={"input"}
                  />
                  {showAlert && <p className={"error_msg"}>Something went wrong with your signup!</p>}
                  <button className="signup-btn" type="submit">
                    Sign Up
                  </button>
                  {showAlert && (
                      <p className={"success_msg"}>
                        Success! You may proceed and start creating your events! Don't Forget to Share! </p>
                        )}
                </form>
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
