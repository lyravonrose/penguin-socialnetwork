// 3 functions
//refer to action creators note
export function friendsAndWannabeesReducer(friendsAndWannabees, action) {
    if (action.type === "friends-and-wannabees/accept") {
        const newFriendsAndWannabees = friendsAndWannabees.map();
        // (...);

        return newFriendsAndWannabees;
    }
    return friendsAndWannabees;
}

export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}
