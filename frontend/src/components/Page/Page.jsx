import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userpfp from "../../public/userpfp.jpg";
import "./Page.scss";
import Post from "../Post/Post";
import Axios from "axios";

const config = require("../../config.json");

function Page() {
  const { page } = useParams();
  const [pageObj, setPageObj] = useState({});

  const [posts, setPosts] = useState([]);
  const myUser = JSON.parse(localStorage.getItem("user"));
  const [isAdmin, setIsAdmin] = useState(false);

  async function getPage() {
    fetch(config.BACKEND_URL + "/api/page/" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPageObj(data);
        if (myUser.role === "Admin") {
          setIsAdmin(true);
        }
      })
      .catch((error) => console.error(error));
  }

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
    }
    console.log(caption);
    console.log(picture);
    console.log(SendingPicture);
    // event.preventDefault()
    const bodyFormData = new FormData();
    bodyFormData.append("caption", caption);
    bodyFormData.append("image", SendingPicture);
    bodyFormData.append("postedIn", page);
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

  async function getPosts() {
    fetch(config.BACKEND_URL + "/api/custompost/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ uploadedIn: page }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.reverse());
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getPage();
    getPosts();
  }, []);

  return (
    <div>
      <div className="profile">
        <div className="profile_picture">
          <img src={config.BACKEND_URL + "/pages/" + pageObj.image} />
        </div>
        <div className="profile_name">
          <h1>{pageObj.name + " - " + pageObj.category}</h1>
        </div>
        <div className="profile_info">
          <h2>Despre</h2>
          <p>{pageObj.description}</p>
        </div>

        <div className="post-form">
          <div className="form-container">
            <div className="your-comment">
              <div className="your-comment-image">
                <img src={userpfp} />
              </div>
              <div className="your-comment-body">
                <h2>{myUser.firstname + " " + myUser.lastname}</h2>
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
        </div>
        <div className="posts">
          {posts.map((post, key) => (
            <Post post={post} me={myUser} key={key} admin={isAdmin} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Page;
