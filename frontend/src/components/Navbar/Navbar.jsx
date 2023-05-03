import "./Navbar.scss"

import logo from '../../public/MyCircle-Logo.png'
import shape from '../../public/shape.png'
import React, { useState } from 'react';

import Auth from "../../modules/Auth"
import {useNavigate} from "react-router-dom";

function Navbar() {

    const [check, setCheck] = useState(false);
    console.log(Auth.isUserAuthenticated())
    let navigate = useNavigate()


    return (
        <div className="navbar">
            <div className="nav-high">
                <div className="navbar-logo">
                    <a href={Auth.isUserAuthenticated()? "/feed":"/"} >
                        <img src={logo}/>
                    </a>
                </div>

                {
                    Auth.isUserAuthenticated() ?
                        <div className="navbar-buttons sel">
                            <div className="navbar-button-wrapper">
                                <a href={'/user/' + JSON.parse(localStorage.getItem('user'))._id}>Profile</a>
                            </div>
                            <div className="navbar-button-wrapper">
                                <a href="/feed">Feed</a>
                            </div>
                            <div className="navbar-button-wrapper">
                                <button onClick={() => {Auth.deauthenticateUser()
                                                        navigate("/")}}>Logout</button>
                            </div>
                        </div>
                        :
                        <div className="navbar-buttons sel">
                            <div className="navbar-button-wrapper">
                                <a href="/login">Login</a>
                            </div>
                            <div className="navbar-button-wrapper">
                                <a href="/register">Register</a>
                            </div>
                        </div>
                }
                <div className="navbar-extend" onClick={() => {setCheck(!check)}}>
                    <img src={shape}/>
                </div>
            </div>

            {
                Auth.isUserAuthenticated() ?
                    <div className={`nav-low ${check ? "" : "nav-hidden"}`}>
                        <div className="button-wrap">
                            <a href="/feed">Feed</a>
                        </div>
                        <div className="button-wrap">
                            <a href={'/user/' + JSON.parse(localStorage.getItem('user'))._id}>Profile</a>
                        </div>
                        <div className="button-wrap">
                            <button onClick={() => {Auth.deauthenticateUser()
                                navigate("/")}}>Logout</button>
                        </div>
                    </div>
                    :
                    <div className={`nav-low ${check ? "" : "nav-hidden"}`}>
                        <div className="button-wrap">
                            <a href="/login">Login</a>
                        </div>
                        <div className="button-wrap">
                            <a href="/register">Register</a>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Navbar;