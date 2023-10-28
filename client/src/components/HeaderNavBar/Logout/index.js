import Auth from "../../../utils/auth";
import React from "react";
 import { useNavigate } from "react-router-dom";

export default function Logout() {
    function handleclick(event) {
    event.preventDefault()
         Auth.logout()
        navigate("/")
        window.location.reload()
     }
   const navigate = useNavigate()   
    return (
         <button id="DEBUG_button_logout" className="header_nav_button" onClick={handleclick} type="button">Logout</button >

        )

 }
