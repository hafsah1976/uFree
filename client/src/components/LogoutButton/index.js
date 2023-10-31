import Auth from '../../utils/auth';
import React, {useEffect } from "react";

const LogoutButton = ({ logoutFunc }) => {
  const logoutTimeInMilliseconds = 600000; // Define the time (10 minutes)

  // Effect to set up the automatic logout timer when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      Auth.logout();
      logoutFunc();
      window.location.assign("/Home");
    }, logoutTimeInMilliseconds);

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, [logoutFunc]);

  // Manual logout function
  const handleClick = () => {
    Auth.logout();
    logoutFunc();
    window.location.assign("/Home");
  };

  // Event listeners to reset the timer on user activity
  useEffect(() => {
    // List of user activity events
    const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"];

    const resetTimer = () => {
      clearTimeout(timer); // Clear the existing timer

      // Restart the timer for automatic logout
      const newTimer = setTimeout(() => {
        Auth.logout();
        logoutFunc();
        window.location.assign("/Home");
      });

      timer = newTimer; // Store the new timer
    };

    let timer; // Store the timer variable

    // Add event listeners for user activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, [logoutFunc]);

  // Render the logout button
  return (
    <button className="logout_button" onClick={handleClick} type="button">
      Log Out
    </button>
  );
}

export default LogoutButton;
