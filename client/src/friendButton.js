import { useState, useEffect } from "react";

const FriendButton = ({ id }) => {
    const [buttonText, setButton] = useState("");

    function getRelation() {
        fetch(`/api/relation/${id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("🧼 res:", res.data);
                if (!res.data) {
                    setButton("Send request");
                } else if (
                    res.data &&
                    res.data.accepted === false &&
                    res.data.recipient_id != id
                ) {
                    setButton("Accept Request");
                } else if (
                    res.data &&
                    res.data.accepted === false &&
                    res.data.recipient_id == id
                ) {
                    setButton("Cancel Request");
                } else if (res.data && res.data.accepted === true) {
                    setButton("Delete Friendship");
                }
            });
    }

    function onClick() {
        let action;
        if (buttonText === "Send request") {
            action = "request";
        } else if (buttonText === "Accept Request") {
            action = "accept";
        } else if (buttonText === "Cancel Request") {
            action = "cancel";
        } else if (buttonText === "Delete Friendship") {
            action = "delete";
        }

        fetch(`/api/relation/${action}/${id}`, { method: "POST" })
            .then((res) => res.json())
            .then((res) => {
                console.log("🌅 res: ", res);
                getRelation();
            });
    }

    useEffect(() => {
        getRelation();
        return () => {};
    }, [buttonText]);

    return (
        <>
            <button onClick={onClick} disabled={!buttonText}>
                {buttonText}
            </button>
        </>
    );
};
export default FriendButton;
