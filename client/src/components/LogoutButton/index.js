import Auth from "../../utils/auth";
import React from "react";
 import { useNavigate } from "react-router-dom";

export default function LogoutButton({ logoutFunc }) {
     const navigate = useNavigate();

     function handleClick() {
          Auth.logout();
          logoutFunc();
          navigate("/");
     }

     return (
          <button id="DEBUG_button_logout" className="header_nav_button" onClick={handleClick} type="button">Logout</button >
     )

 }
