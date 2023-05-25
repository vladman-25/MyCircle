import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./User.scss";
import Post from "../Post/Post";
import userpfp from "../../public/userpfp.jpg";

const config = require("../../config.json");

function User() {
  const { user } = useParams();
  const [currUser, setCurrUser] = useState({});
  const [posts, setPosts] = useState([]);
  let myUser = JSON.parse(localStorage.getItem("user"));
  const [logic, setLogic] = useState("sendReq");

  const [doUpdate, setDoUpdate] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendsReq, setFriendsReq] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getUser() {
    fetch(config.BACKEND_URL + "/api/admin/" + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrUser(data);
        console.log(myUser.friendsSent);
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
        console.log(myUser.friendsSent);

        if (myUser.role === "Admin") {
          setIsAdmin(true);
        }

        if (myUser.friendsSent.includes(user)) {
          setLogic("removeReq");
        } else {
          setLogic("sendReq");
        }
        if (myUser.friendsRequest.includes(user)) {
          setLogic("acceptReq");
        }
        if (myUser.friendsList.includes(user)) {
          setLogic("removeFriend");
        }
      })
      .catch((error) => console.error(error));
  }

  async function getPosts() {
    fetch(config.BACKEND_URL + "/api/custompost/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ authorId: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.reverse());
      })
      .catch((error) => console.error(error));
  }
  async function friendAction(target) {
    fetch(config.BACKEND_URL + "/api/friends/" + target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ currUserID: myUser._id, targetUserID: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDoUpdate(!doUpdate);
      })
      .catch((error) => console.error(error));
  }
  const [showFriends, setShowFriends] = useState(false);
  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };
  const [showFriends2, setShowFriends2] = useState(false);
  const toggleFriends2 = () => {
    setShowFriends2(!showFriends2);
  };

  async function getFriends(field, setter) {
    fetch(config.BACKEND_URL + "/api/friends/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userID: user, field: field }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setter(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getUser();
    getPosts();
    getFriends("friendsList", setFriends);
    getFriends("friendsRequest", setFriendsReq);
  }, []);

  useEffect(() => {
    getMyUser();
  }, [doUpdate]);

  return (
    <div className="profile">
      <div className="profile_picture">
        <img src={userpfp} />
      </div>
      <div className="profile_name">
        <h1>{currUser.firstname + " " + currUser.lastname}</h1>
        {myUser._id === user ? (
          <h1>You</h1>
        ) : (
          <div className="friend-button">
            {
              {
                sendReq: (
                  <button onClick={() => friendAction("sendrequest")}>
                    Send Request
                  </button>
                ),
                removeReq: (
                  <button onClick={() => friendAction("removerequest")}>
                    Remove Request
                  </button>
                ),
                acceptReq: (
                  <button onClick={() => friendAction("acceptrequest")}>
                    Accept Request
                  </button>
                ),
                removeFriend: (
                  <button onClick={() => friendAction("removefriend")}>
                    Remove Friend
                  </button>
                ),
              }[logic]
            }
            {/*<button onClick={sendRequest}>Add Friend</button>*/}
          </div>
        )}
      </div>
      <div className="frien">
        <h2>Prieteni</h2>
        <button className="toogleBtn" onClick={toggleFriends}>
          Arata prieteni
        </button>
        {showFriends && (
          <div className="friends_list">
            <div className="friend_row">
              {friends.map((prfriend) => (
                <a
                  className="friend"
                  key={prfriend._id}
                  href={"/user/" + prfriend._id}
                >
                  <img src={userpfp} />
                  <h3>{prfriend.firstname + " " + prfriend.lastname}</h3>
                </a>
              ))}
            </div>
          </div>
        )}
        {user === myUser._id ? (
          <button className="toogleBtn" onClick={toggleFriends2}>
            Arata cereri
          </button>
        ) : (
          <div />
        )}
        {user === myUser._id ? (
          showFriends2 && (
            <div className="friends_list">
              <div className="friend_row">
                {friendsReq.map((prfriend) => (
                  <a
                    className="friend"
                    key={prfriend._id}
                    href={"/user/" + prfriend._id}
                  >
                    <img src={userpfp} />
                    <h3>{prfriend.firstname + " " + prfriend.lastname}</h3>
                  </a>
                ))}
              </div>
            </div>
          )
        ) : (
          <div />
        )}
      </div>
      <div className="posts">
        {posts.map((post, key) => (
          <Post post={post} me={myUser} key={key} admin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
export default User;
