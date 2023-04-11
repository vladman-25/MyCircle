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
        fetch('/api/auth/register', {
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
        <div className='formular-register'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 >
                        Username:
                    </h2>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <h3>First name cannot be empty!</h3>
                </div>
                <div >
                    <h2 >
                        Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <h3>Last name cannot be empty!</h3>
                </div>
                <div >
                    <h2 >
                        Email:</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <h3>Email cannot be empty!</h3>
                </div>
                <div >
                    <h2 >
                        Phone:</h2>
                    <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <h3>Password cannot be empty!</h3>
                </div>
                <div className='Buton'>
                    <button type="submit">Submit</button>
                </div>
                {/*<Link to="/login">Already have an account? Login now</Link> */}
            </form>
        </div>
    );
}
export default Register;