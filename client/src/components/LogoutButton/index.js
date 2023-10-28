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
          <button className="logout_button" onClick={handleClick} type="button">Log Out</button >
     )

 }
