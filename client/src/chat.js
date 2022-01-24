import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const textareaRef = useRef();
    const chatContainerRef = useRef();
    const chatMessages = useSelector((state) => state?.chat);
    const [chatMessages, setChatMessages] = useState([
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
        "Hello this is a chat message",
    ]);
    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chatMessages]);
    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value:", e.target.value);
            socket.emit("newChatMessage:", e.target.value);
            setChatMessages([...ChatMessages, e.target.value]);
            textareaRef.current.style.cssText = `
            background-color:${e.target.value.split("")[0]}
            `;
        }
    };
    return (
        <>
            <div
                className="chat-container"
                ref={chatContainerRef}
                style={{
                    height: "30vh",
                    width: "300px",
                    backgroundColor: "white",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "colume-reverse",
                }}
            >
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>
                <p>Chat message</p>

                {ChatMessages.map((message, i) => (
                    <p key={i}>{message}</p>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                className="input-container"
                onKeyDown={keyCheck}
                placeholder="Please enter a chat message"
                rows="10"
            />
        </>
    );
}
