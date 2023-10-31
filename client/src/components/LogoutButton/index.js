import Auth from "../../utils/auth";
import React, { useEffect } from "react";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const LogoutButton = ({ logoutFunc }) => {
  
  // Retrieve the expiration time from the environment variables
  const expiration = process.env.EXPIRATION_TIME;

  useEffect(() => {
    // Set up the timer for automatic logout when the component mounts
    const timer = setTimeout(() => {
      // Check if the user's token is expired
      if (Auth.isTokenExpired(Auth.getToken())) {
        // Token is expired, perform logout
        Auth.logout();
        // Redirect to the home page
        window.location.assign("/");
      }
    }, expiration); // Use the expiration time from the .env file

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(timer);
    };
  }, [logoutFunc]);

  const handleClick = () => {
    // Manually log out the user
    Auth.logout();
    // Execute the provided logout function
    logoutFunc();
    // Redirect to the home page
    window.location.assign("/");
  };

  return (
    <button className="logout_button" onClick={handleClick} type="button">
      Log Out
    </button>
  );
};



  // useEffect(() => {
  //   // List of user activity events to reset the timer
  //   const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"];
  //   let timer;

  //   const resetTimer = () => {
  //     clearTimeout(timer);
  //     const newTimer = setTimeout(() => {
  //       // Check if the user's token is expired
  //       if (Auth.isTokenExpired(Auth.getToken())) {
  //         // Token is expired, perform logout
  //         Auth.logout();
  //         // Execute the provided logout function
  //         logoutFunc();
  //         // Redirect to the home page
  //         window.location.assign("/");
  //       }
  //     });
  //     timer = newTimer;
  //   };

  //   events.forEach((event) => {
  //     // Add event listeners for user activity
  //     window.addEventListener(event, resetTimer);
  //   });

  //   return () => {
  //     events.forEach((event) => {
  //       // Remove event listeners when the component unmounts
  //       window.removeEventListener(event, resetTimer);
  //     });
  //     clearTimeout(timer); // Clear the timer when the component unmounts
  //   };
  // }, [logoutFunc]);


export default LogoutButton;
