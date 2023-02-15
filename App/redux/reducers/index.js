import { combineReducers } from "redux";
import authReducers from "./authReducers";

const rootReducers = combineReducers({
  authReducers,
});

export default rootReducers;
