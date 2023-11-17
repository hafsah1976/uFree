import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthDispatch } from "../../utils/AuthContext";

export default function LogoutButton() {
     const navigate = useNavigate();
     const dispatch = useAuthDispatch();

     function handleLogout() {
          dispatch({
               type: 'logout',
          });

          // navigate after the event cycle to give time for dispatch to occur
          setTimeout(() => navigate('/'));
     }

     return (
          <button className="logout_button" onClick={handleLogout} type="button">Log Out</button >
     )
 }
