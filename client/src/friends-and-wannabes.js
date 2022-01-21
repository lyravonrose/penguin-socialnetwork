import { useDispatch, useSelector } from "react-redux";
import {
    makeFriend,
    receiveFriendsAndWannabees,
    cancelFriend,
} from "./redux/friends-and-wannabees/slice.js";
import { useEffect } from "react";

export function FriendsAndWannabees() {
    // Get access to the dispatch function
    const dispatch = useDispatch();
    // Select the Wannabees from the state
    const wannabees = useSelector((state) => {
        state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => !friendship.accepted
            );
    });
    // Select the Friends from the state
    const friends = useSelector((state) => {
        state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendship) => friendship.accepted
            );
    });
    // Get all friends and wannabees when the component mounts
    useEffect((id) => {
        // STEP 1: Make GET request to fetch friends and wannabees
        // STEP 2: dispatch action to populate the redux state
        console.log("🎂🍥🥟");
        fetch(`/api/friends-and-wannabes`)
            .then((res) => res.json())
            .then((res) => {
                console.log("🌅 res: ", res.data);
                if (res.data) {
                    dispatch(receiveFriendsAndWannabees(id));
                }
            });
    }, []);

    const handleAccept = (id) => {
        // Step 1: Make a POST request to update the DB
        fetch(`/api/relation/accept/${id}`, { method: "POST" })
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.data);
                //Step 2: Dispatch an action to update the Redux store
                dispatch(makeFriend(id));
            });
    };

    return (
        <>
            <div>
                <h2>These people want to be your friends!😮</h2>
                {wannabees.map((wannabee) => {
                    return (
                        <div key={wannabee.id}>
                            <button onClick={() => handleAccept(wannabee.id)}>
                                Accept Friendship
                            </button>
                        </div>
                    );
                })}
            </div>
            {/* {Display Friends} */}
            <div>
                <h2>These people are already your friends 🌰</h2>
                {friends.map((friend) => {
                    return (
                        <div key={friend.id}>
                            <button onClick={() => handleAccept(friend.id)}>
                                Cancel Friendship
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
