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
            <div>
                <h1>Landing</h1>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/register"}>Register</NavLink>
            </div>
    );
}
export default Landing;