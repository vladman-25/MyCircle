import './Chat.scss'
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:5000");

function Chat() {
    const {chat} = useParams()
    // console.log("chat " + chat);

    const username = JSON.parse(localStorage.getItem('user')).username
    const room = chat

    let ignore = false
    //////

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        if (!ignore) {
            console.log("trying to join")
            if ( username !== "" && room !== "") {
                socket.emit("join_room", room);
                console.log("joined")
            }
            ignore = true
        }

        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
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
        <div>
            <h1>{chat}</h1>
            <div className="chat-body">
                {messageList.map((messageContent) => {
                    return (
                        <div
                            className="message"
                            id={username === messageContent.author ? "you" : "other"}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat