import "./Landing.scss"
import {NavLink} from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Landing</h1>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
        </div>
    );
}
export default Landing;