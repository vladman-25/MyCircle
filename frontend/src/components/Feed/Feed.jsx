import "./Feed.scss";
import Unauthorized from "../Unauthorized/Unauthorized";
import Auth from "../../modules/Auth";
import Minichat from "./Minichat/Minichat";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import submit from "../../public/submit-comm.png";
import userpfp from "../../public/userpfp.jpg";
import Axios from "axios";
import Searchbar from "../Searchbar/Searchbar";

const config = require("../../config.json");

function Feed() {
  let navigate = useNavigate();
  let myUser = JSON.parse(localStorage.getItem("user"));

  const [isAdmin, setIsAdmin] = useState(false);

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    fetch(config.BACKEND_URL + "/api/custompost/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ uploadedIn: "feed" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.reverse());
      })
      .catch((error) => console.error(error));
  }

  async function getMyUser() {
    fetch(config.BACKEND_URL + "/api/admin/" + myUser._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        myUser = data;
        if (myUser.role === "Admin") {
          setIsAdmin(true);
        }
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (!Auth.isUserAuthenticated()) {
      navigate("/unauthorized");
    }

    getPosts();
    getMyUser();
  }, []);

  const [picture, setPicture] = useState("");
  const [SendingPicture, setSendingPicture] = useState("");
  const [caption, setCaption] = useState("");

  const onChangePicture = (e) => {
    console.log("picture: ", picture);
    setPicture(URL.createObjectURL(e.target.files[0]));
    setSendingPicture(e.target.files[0]);
    console.log("picture: ", picture);
  };

  const onChangeCaption = (e) => {
    setCaption(e.target.value);
  };

  function handleSubmit(event) {
    if (caption === "") {
      event.preventDefault();
      return;
    }
    console.log(caption);
    console.log(picture);
    console.log(SendingPicture);
    // event.preventDefault()
    const bodyFormData = new FormData();
    bodyFormData.append("caption", caption);
    bodyFormData.append("image", SendingPicture);
    bodyFormData.append("postedIn", "feed");
    // console.log(bodyFormData)
    Axios({
      method: "POST",
      url: config.BACKEND_URL + "/api/post",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: bodyFormData,
    })
      // .then(response => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div>
      {myUser.role === "Admin" ? <h1>Hello Admin</h1> : <div></div>}
      <Searchbar />
      <div className="feed-container">
        <div className="post-form">
          <div className="form-container">
            <h1>Create a post!</h1>
            <div className="your-comment">
              <div className="your-comment-image">
                <img src={userpfp} />
              </div>
              <div className="your-comment-body">
                <h2>
                  {myUser.firstname +
                    " " +
                    myUser.lastname +
                    " @" +
                    myUser.username}
                </h2>
              </div>
            </div>

            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="form-comment">
                <textarea
                  rows="4"
                  placeholder="Write a caption..."
                  id={"caption"}
                  onChange={onChangeCaption}
                />
                {picture === "" ? (
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Choose a file
                  </label>
                ) : (
                  <h2
                    onClick={() => {
                      setPicture("");
                      setSendingPicture("");
                    }}
                  >
                    Remove file
                  </h2>
                )}
                <input
                  id="file-upload"
                  type="file"
                  // value={file}
                  onChange={onChangePicture}
                />
                <img src={picture} />
              </div>
              <button type="submit">Post</button>
            </form>
          </div>
          <div className="form-container">
            <h1>Create a page!</h1>
            <div className="page">
              <a href="/page">Take me there</a>
            </div>
          </div>
        </div>
        <div className="chats">
          <div className="chats-container">
            <h1>Choose a chat!</h1>

            <Minichat
              chatcount="10"
              chatname="Happy Mood"
              pageurl={"chat/happy"}
            />
            <Minichat
              chatcount="4"
              chatname="Energy Time"
              pageurl={"chat/energy"}
            />
            <Minichat chatcount="7" chatname="Sad hours" pageurl={"chat/sad"} />
          </div>
        </div>
      </div>
      <div className="posts">
        {posts.map((post, key) => (
          <Post post={post} me={myUser} key={key} admin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
export default Feed;
