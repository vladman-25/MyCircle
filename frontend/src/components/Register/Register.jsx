import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import "./Register.scss"
import Auth from "../../modules/Auth";

function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const BASE_URL = "http://localhost:5000"

    const [firstnameErr, setFirstnameErr] = useState('');
    const [lastnameErr, setLastnameErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
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
        console.log(`First Name: ${firstname}, 
                    Last Name: ${lastname}, 
                    Username: ${username},
                    Email: ${email}, 
                    Password: ${password}`);

        fetch(BASE_URL + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname: firstname,
                                        lastname: lastname,
                                        username: username,
                                        email: email,
                                        password: password})
        })
            .then(response => response.json())
            .then((data) => {
                if ((data.error !== null) && (typeof(data.error) !== "undefined")) {
                    console.log(data.error)

                    data.error.includes("First Name") ? setFirstnameErr(data.error) : setFirstnameErr('')
                    data.error.includes("Last Name") ? setLastnameErr(data.error) : setLastnameErr('')
                    data.error.includes("Username") ? setUsernameErr(data.error) : setUsernameErr('')
                    data.error.includes("email") ? setEmailErr(data.error) : setEmailErr('')
                    data.error.includes("Password") ? setPasswordErr(data.error) : setPasswordErr('')


                } else {
                    navigate('/login')
                }
            })
            .catch(error => console.error(error));
    };
    return (
        <div className='formular-register'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 >
                        First Name:
                    </h2>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    <h3>{firstnameErr}</h3>
                </div>

                <div>
                    <h2 >
                        Last Name:
                    </h2>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    <h3>{lastnameErr}</h3>
                </div>

                <div>
                    <h2 >
                        Username:
                    </h2>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <h3>{usernameErr}</h3>
                </div>
                <div >
                    <h2 >
                        Email:</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <h3>{emailErr}</h3>
                </div>
                <div >
                    <h2 >
                        Password:</h2>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <h3>{passwordErr}</h3>
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