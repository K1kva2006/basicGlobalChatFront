import { useState, useEffect, useRef } from "react";

import Login from "./Login";
import "./App.css";

function App() {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [localStorageName, setLocalStorageName] = useState(() => {
        if (!localStorage.getItem("name")) {
            return true;
        }
    });
    const inputRef = useRef(null);

    function postMessage() {
        if (value.trim().length > 1) {
            fetch("https://basicglobalchatback.onrender.com/", {
                method: "POST",
                body: JSON.stringify({
                    message: value,
                    name: localStorage.getItem("name"),
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((res) => res.text())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
        }
        setValue("");
        inputRef.current.focus();
    }
    useEffect(() => {
        fetch("https://basicglobalchatback.onrender.com/")
            .then((res) => res.json())
            .then((messagesArray) => {
                setMessages(messagesArray);
            })
            .catch((err) => console.log(err));
    }, [messages]);
    useEffect(() => {
        const getMessages = setInterval(() => {
            fetch("https://basicglobalchatback.onrender.com/")
                .then((res) => res.json())
                .then((messagesArray) => {
                    setMessages(messagesArray);
                })
                .catch((err) => console.log(err));
        }, 3000);
        return () => clearInterval(getMessages);
    }, []);

    return (
        <>
            {localStorageName && <Login />}
            <div>
                <div className="main-cont">
                    <div className="second-wrap">
                        <label htmlFor="messageInput" className="message-label">
                            Type a message
                        </label>
                        <input
                            name="messageInput"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            ref={inputRef}
                            className="message-input"
                        />
                        <button onClick={postMessage} className="message-send">
                            add message
                        </button>
                    </div>
                </div>

                <ul className="ul">
                    {" "}
                    {messages.map((messageObj, index) => {
                        return (
                            <div key={index} className="message-cont">
                                <h3 className="user-name">
                                    {messageObj.name}:{" "}
                                </h3>
                                <li className="message">
                                    {messageObj.message}
                                </li>
                                <button
                                    className="delete-button"
                                    onClick={(e) => {
                                        if (
                                            messageObj.name ===
                                            localStorage.getItem("name")
                                        ) {
                                            fetch("https://basicglobalchatback.onrender.com/", {
                                                method: "DELETE",
                                                body: JSON.stringify({
                                                    _id: messageObj._id,
                                                }),

                                                headers: {
                                                    "Content-type":
                                                        "application/json; charset=UTF-8",
                                                },
                                            })
                                                .then((res) => res.text())
                                                .then((data) =>
                                                    console.log(data)
                                                )
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }
                                    }}
                                >
                                    Delete Message
                                </button>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default App;
