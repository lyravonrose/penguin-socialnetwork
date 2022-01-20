import { useDispatch, useSelector } from "react-redux";
import { makeFriend } from "./redux/friends-and-wannabees/slice.js";

export function FriendsAndWannabees() {
    // Get access to the dispatch function
    const dispatch = useDispatch();
    // Select the Wannabees from the state
    const wannabees = useSelector((state) =>
        state.friendsAndWannabees.filter((friendship) => !friendship.accepted)
    );

    // Select the Friends from the state
    // ...

    // Get all friends and wannabees when the component mounts
    useEffect(() => {
        //STEP 1: fetch friends and wannabees
        //receive data back
        //STEP 2: dispatch action to populate the redux state
        dispatch(receiveFriendsAndWannabees(data));
    }, []);

    const handleAccept = (id) => {
        //Step 1: Make a POST request to update the DB
        //Step 2: Dispatch an action to update the Redux store
        dispatch(makeFriend(id));
    };

    return (
        <>
            {wannabees.map((wannabee) => {
                return (
                    <div key={wannabee.id}>
                        <button onClick={() => handleAccept(wannabee.id)}>
                            Accept Friendship
                        </button>
                    </div>
                );
            })}
            {/* {Display Friends} */}
        </>
    );
}
