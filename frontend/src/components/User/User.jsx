import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import './User.scss'
import Post from "../Post/Post";
import userpfp from "../../public/userpfp.jpg";

function User() {
    const {user} = useParams()
    const [currUser, setCurrUser] = useState({})
    const [posts, setPosts] = useState([]);
    const myUser = JSON.parse(localStorage.getItem('user'))

    const BASE_URL = "http://localhost:5000"
    async function getUser() {
        fetch(BASE_URL + '/api/admin/' + user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setCurrUser(data)
            })
            .catch(error => console.error(error));
    }

    async function getPosts() {
        fetch(BASE_URL + '/api/custompost/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({authorId: user})
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data.reverse())
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getUser()
        getPosts()
    },[])

    return(
        <div className='profile'>

            <div className='profile_picture'>
                <img src={userpfp}/>
            </div>
            <div className='profile_name'>
                <h1>{currUser.firstname + " " + currUser.lastname}</h1>
            </div>
            {/*<div className='profile_info'>*/}
            {/*    <h2>Despre</h2>*/}
            {/*    <p>Lorem Ipsum</p>*/}
            {/*</div>*/}
            <div className="posts">
                {posts.map((post, key) =>
                    <Post post={post} me={myUser} key={key} />
                )}
            </div>
        </div>
    );
}
export default User