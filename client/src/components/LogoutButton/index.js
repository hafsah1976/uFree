import Auth from "../../utils/auth";
import React, { useState, useEffect } from "react";

export default function LogoutButton({ logoutFunc }) {
  // State to store the logout timer
  const [logoutTimer, setLogoutTimer] = useState(null);
  // Time in milliseconds before automatic logout (30 minutes)
  const logoutTimeInMilliseconds = 30 * 60 * 1000;

  useEffect(() => {
    // Set the timer for automatic logout when the component mounts
    const timer = setTimeout(() => {
      Auth.logout(); // Log out the user
      logoutFunc(); // Execute the provided logout function
      // Redirect to the login page or any other appropriate action
      window.location.assign("/home");
    }, logoutTimeInMilliseconds);

    // Store the timer in state
    setLogoutTimer(timer);

    // Clear the timer when the component unmounts
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  });

  // Manual logout function
  const handleClick = () => {
    // Clear the timer if it exists
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    Auth.logout(); // Log out the user
    logoutFunc(); // Execute the provided logout function
    window.location.assign("/home"); 
  };

  // Event listeners to reset the timer on user activity
  useEffect(() => {
    // List of user activity events
    const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"];

    // Function to reset the timer on user activity
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer); // Clear the existing timer
      }

      // Restart the timer for automatic logout
      const newTimer = setTimeout(() => {
        Auth.logout(); // Log out the user
        logoutFunc(); // Execute the provided logout function
        window.location.assign("/"); // Redirect to the login page
      });

      // Store the new timer in state
      setLogoutTimer(newTimer);
    };

    // Add event listeners for user activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [logoutFunc, logoutTimer]);

  // Render the logout button
  return (
    <button className="logout_button" onClick={handleClick} type="button">
      Log Out
    </button>
  );
}
