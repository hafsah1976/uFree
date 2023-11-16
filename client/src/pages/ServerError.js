import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

import { pageImages } from "../images";

import '../assets/serverError.css';

const NOT_FOUND = "ERROR CODE: NOT_FOUND";

export default function ServerError() {
    const navigate = useNavigate();
    const error = useRouteError();

    if (error) console.error(error);

    // navigate to 404 page if error code is "NOT_FOUND"
    useEffect(() => {
        if (String(error).includes(NOT_FOUND)) {
            navigate('/404');
        }
    }, [error, navigate]);


    return (
        <section className="message-container server-error-container">
            <p className="server-error-message">Oops! Something went wrong...</p>
            <img className="message-container-image" src={pageImages.serverError} alt="" />
            <button className="btn_large btn_accent" onClick={() => navigate(-1)}>Go Back</button>
        </section>
    )
}