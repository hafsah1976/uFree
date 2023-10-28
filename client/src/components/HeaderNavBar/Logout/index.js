import Auth from "../../../utils/auth";
import React from "react";

export default function Logout() {
    if(!Auth.loggedIn){
    return (
        ""
    )
 } 
    else if (Auth.loggedIn){
    return (
         <button id="DEBUG_button_logout" className="header_nav_button" onClick={Auth.logout} type="button">Logout</button >

        )
}
 }
