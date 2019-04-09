import { combineReducers } from "redux";
import UserStore from "../Authentication/reducer";

const rootReducer = combineReducers({
  UserStore: UserStore
});

export default rootReducer;
