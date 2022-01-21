export default function friendsAndWannabeesReducer(
    friendsAndWannabees = null,
    action
) {
    if (action.type === "friends-and-wannabees/accept") {
        const newFriendsAndWannabees = friendsAndWannabees.map(
            (friendAndWannabee) => {
                if (friendAndWannabee.id === action.payload.id) {
                    return {
                        ...friendAndWannabee,
                        accepted: true,
                    };
                }
                return friendAndWannabee;
            }
        );
        return newFriendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/receive") {
        friendsAndWannabees = action.payload.friendships;
        //         received: just set the state to the list of friends and wannabees
    } else if (action.type === "friends-and-wannabees/cancel") {
        const newFriendsAndWannabees = friendsAndWannabees.filter(
            (friendAndWannabee) => friendAndWannabee.id !== action.payload.id
        );
        return newFriendsAndWannabees;
        // end-friendship: (you may want to use .filter())
    }
    return friendsAndWannabees;
}

export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}
export function receiveFriendsAndWannabees(friendships) {
    return {
        type: "friends-and-wannabees/receive",
        payload: { friendships },
    };
}
export function cancelFriend(id) {
    return {
        type: "friends-and-wannabees/cancel",
        payload: { id },
    };
}
