import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import "./Login.scss"

function Login() {
    const BASE_URL = process.env.BACKEND_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(BASE_URL);
        console.log(`Email: ${email}, Password: ${password}`);
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {localStorage.setItem("token",data.token)
                console.log(data)
                navigate("/feed")}
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