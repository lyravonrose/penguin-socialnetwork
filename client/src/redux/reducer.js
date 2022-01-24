import { combineReducers } from "redux";
import friendsAndWannabeesReducer from "./friends-and-wannabees/slice.js";
import chatMessagesReducer from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabeesReducer,
    chatMessages: chatMessagesReducer,
});

export default rootReducer;
