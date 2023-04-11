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
        fetch('/api/auth/login', {
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
        <div className='formular-login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <h2 >
                        Email:
                    </h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <h3>Email cannot be empty!</h3>
                </div>
                <div >
                    <h2 >
                        Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <h3>Password cannot be empty!</h3>
                </div>
                <button type="submit">Submit</button>

                {/*<Link to="/register">Don't have an account? Register now</Link> */}
            </form>
        </div>
    );
}
export default Login;