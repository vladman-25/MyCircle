import "./Landing.scss"
import {NavLink} from "react-router-dom";
import Auth from "../../modules/Auth";

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Landing() {

    let navigate = useNavigate()
    useEffect(
        () => {if (Auth.isUserAuthenticated() == true) {
                        navigate("/feed")
                    }
        }
    )

    return (
        <div className="Landing-root">
            <div className="title-desk">
                <h1>Welcome to MyCircle</h1>
                <p> We aim to give chatting a new perspective by offering
                    you an adventurous experience in talking with strangers. </p>
            </div>
            <div className="options-desk">
                <div className="options-container">
                    <div className="options-title">
                        <h1>You already registered?</h1>
                    </div>
                    <div className="options-button">
                        <NavLink to={"/login"}>Go to sign-in</NavLink>
                    </div>
                    <div className="options-title">
                        <h1>Don’t have an account?</h1>
                    </div>
                    <div className="options-button">
                        <NavLink to={"/register"}>Create an account</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Landing;