import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef, useState } from "react";
import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice.js";

export default function Chat() {
    const textareaRef = useRef();
    const chatContainerRef = useRef();
    const chatMessages = useSelector((state) => state?.chatMessages);

    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chatMessages]);
    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value:", e.target.value);
            socket.emit("newChatMessage", e.target.value);
            textareaRef.current.value = "";
        }
    };

    return (
        <>
            <div
                className="chat-container"
                ref={chatContainerRef}
                style={{
                    height: "200px",
                    width: "500px",
                    backgroundColor: "white",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                }}
            >
                {chatMessages?.map((message, i) => (
                    <div key={i}>
                        <img
                            className={"thumb"}
                            src={message.profile_pic_url || "/default.png"}
                        />
                        <strong>{message.first} : </strong>
                        {message.message} <em>{message.created_at}</em>
                    </div>
                ))}
            </div>
            <br></br>
            <textarea
                ref={textareaRef}
                className="input-container"
                onKeyDown={keyCheck}
                placeholder="Please enter a chat message"
                rows="5"
            />
        </>
    );
}
