import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import "./Login.scss"

import Auth from "../../modules/Auth"

function Login() {
    const BASE_URL = "http://localhost:5000";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    let navigate = useNavigate()

    useEffect(
        () => {if (Auth.isUserAuthenticated() === true) {
                        navigate("/feed")
                        }
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then((data) => {
                if ((data.token !== null) && (typeof(data.token) !== "undefined")) {
                    Auth.authenticateUser(data.token, JSON.stringify(data.user))
                    console.log(data)
                    if (Auth.isUserAuthenticated()) navigate("/feed")
                } else {
                    data.error.includes("email") ? setEmailErr(data.error) : setEmailErr('')
                    data.error.includes("Password") ? setPasswordErr(data.error) : setPasswordErr('')
                    data.error.includes("error") ? setEmailErr('Wrong email or password!') : setEmailErr('')
                    // console.log(data.error)
                }
                })
            .catch(error => console.error(error));
    };

    return (
        <div className='formular-login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <h2 >
                        Email:
                    </h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <h3>{emailErr}</h3>
                </div>
                <div >
                    <h2 >
                        Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <h3>{passwordErr}</h3>
                </div>
                <button type="submit">Submit</button>

                {/*<Link to="/register">Don't have an account? Register now</Link> */}
            </form>
        </div>
    );
}
export default Login;
