import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import "./Login.scss"

import Auth from "../../modules/Auth"

function Login() {
    const BASE_URL = "http://localhost:5000";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate()

    useEffect(
        () => {if (Auth.isUserAuthenticated() == true) {
                        navigate("/feed")
                        }
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        fetch(BASE_URL + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                Auth.authenticateUser(data.token)
                data.token? navigate("/feed"): console.log(data.error)}
            )
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <label >
                        Email:
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                </div>
                <div >
                    <label >
                        Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <button type="submit">Submit</button>

                <Link to="/register">Don't have an account? Register now</Link>
            </form>
        </div>
    );
}
export default Login;