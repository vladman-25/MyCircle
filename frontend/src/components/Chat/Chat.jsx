import "./Chat.scss";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Auth from "../../modules/Auth";
import ScrollToBottom from "react-scroll-to-bottom";
const config = require("../../config.json");

const socket = io(config.BACKEND_URL_CHAT, {
  transports: ["websocket"],
  autoConnect: false,
});

function Chat() {
  socket.connect();
  let navigate = useNavigate();
  let username = "";
  if (!Auth.isUserAuthenticated()) {
    navigate("/unauthorized");
  } else {
    username = JSON.parse(localStorage.getItem("user")).username;
  }

  const { chat } = useParams();
  const room = chat;
  let ignore = false;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [title, setTitle] = useState("");
  async function getHistory() {
    fetch(config.BACKEND_URL + "/api/chat/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: room }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.messages);
        setMessageList(data.messages);
        setTitle(data.topic);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    // getHistory()
    if (!Auth.isUserAuthenticated()) {
      navigate("/unauthorized");
    }

    if (!ignore) {
      getHistory();
      console.log("trying to join");
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        console.log("joined");
      }
      ignore = true;
    }

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author_id: JSON.parse(localStorage.getItem("user"))._id,
        room: room,
        author: username,
        content: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h1>{title}</h1>
      </div>
      <ScrollToBottom className="chat-body">
        {messageList.map((messageContent, key) => {
          return (
            <div
              className={`message-${
                username === messageContent.author ? "you" : "other"
              }`}
              key={key}
            >
              <div className="message">
                <div className="message-content">
                  <p>{messageContent.content}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      {/*</div>*/}
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type something..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
