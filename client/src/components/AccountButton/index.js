import { useState, useRef } from "react";

import Auth from "../../utils/auth";
import LogoutButton from "../LogoutButton";


export default function AccountButton({ logoutFunc }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const accountButtonRef = useRef(null);
    
    document.addEventListener('click', (event) => {
        // console.log(event.target);
        // console.log(accountButtonRef);
        console.log(event.target === accountButtonRef.current || event.target.parentNode === accountButtonRef.current);
    });

    return (
        <button className="account_button" ref={accountButtonRef}>
            <span>{Auth.getProfile().data.username}</span>
            <i className="bi bi-person-circle" style={{marginLeft: 'var(--padding-sm)'}}></i>

            {dropdownOpen && (
                <div>
                    <LogoutButton logoutFunc={logoutFunc} />
                </div>
            )}
        </button>
    )
}