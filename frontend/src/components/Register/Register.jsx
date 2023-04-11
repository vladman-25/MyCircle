import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import "./Register.scss"
import Auth from "../../modules/Auth";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const BASE_URL = "http://localhost:5000"

    let navigate = useNavigate()

    useEffect(
        () => {if (Auth.isUserAuthenticated() == true) {
            navigate("/feed")
        }
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}, Email: ${email}, Phone: ${phone}`);
        fetch(BASE_URL + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, email: email, phone: phone })
        })
            .then(response => console.log(response))
            .then(data => {
                console.log(data)
                navigate("/login")}
            )
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >
                        Username:
                    </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div >
                    <label >
                        Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <div >
                    <label >
                        Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                </div>
                <div >
                    <label >
                        Phone:</label>
                    <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>

                </div>
                <button type="submit">Submit</button>

                <Link to="/login">Already have an account? Login now</Link>
            </form>
        </div>
    );
}
export default Register;