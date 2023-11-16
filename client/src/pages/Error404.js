import { Link } from "react-router-dom";

import { useAuth } from "../utils/AuthContext";
import { pageImages } from "../images";

export default function Error404() {
    const { loggedIn } = useAuth();

    const buttonClasses = "btn_large btn_accent";

    return (
        <section className="message-container server-error-container">
            <p className="server-error-message">The page you're looking for doesn't exist.</p>
            <img className="message-container-image" src={pageImages.error404} alt="" />
            <Link to='/'>
                <button className={buttonClasses}>
                    {loggedIn() ? 'Go To Dashboard' : 'Go Home'}
                </button>
            </Link>
        </section>
    )
}