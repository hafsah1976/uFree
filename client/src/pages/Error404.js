import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function Error404() {
    const navigate = useNavigate();
    const { loggedIn } = useAuth();

    const buttonClasses = "btn_large btn_accent";

    return (
        <section>
            <h1>404</h1>
            <p>The page you're looking for does not exist.</p>
            <button className={buttonClasses} onClick={() => navigate('/')}>
                {loggedIn() ? 'Go To Dashboard' : 'Go Home'}
            </button>
        </section>
    )
}