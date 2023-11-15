import { useRouteError, useNavigate } from "react-router-dom"

export default function ServerError() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    return (
        <section>
            <h1>Oops! Something went wrong...</h1>
            <button className="btn_large btn_accent" onClick={() => navigate(-1)}>Go Back</button>
        </section>
    )
}