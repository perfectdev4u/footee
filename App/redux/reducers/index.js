import { combineReducers } from "redux";
import authReducers from "./authReducers";
import alertReducers from "./alertReducers";

const rootReducers = combineReducers({
  authReducers,
  alertReducers,
});

export default rootReducers;
