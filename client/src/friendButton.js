import { useState, useEffect } from "react";

const FriendButton = (id) => {
    const [buttonText, setButton] = useState();
    const [clickButton, setClickButton] = useState(false);

    function getRelation(id) {
        fetch(``)
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.data);
                setButton(res.data);
            });
    }
    useEffect(() => {
        getRelation();
        return () => {};
    }, [id]);

    return (
        <>
            <button onClick={} onChange={}>
                {/* ---buttonText will go here */}
                {/* The text of the button changes depending on the status of the
                friendship */}
                {/* Make Friend Request */}
                {/* End Friendship */}
                {/* Accept Friend Request */}
                {/* Cancel Friend Request */}
            </button>
        </>
    );
};
export default FriendButton;
