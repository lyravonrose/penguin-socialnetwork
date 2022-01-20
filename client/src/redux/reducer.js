import { combineReducers } from "redux";
import friendsAndWannabeesReducer from "./friends-and-wannabees/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabeesReducer,
});

export default rootReducer;
