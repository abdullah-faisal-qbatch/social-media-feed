import { combineReducers } from "redux";
import Post from "./posts/reducers";

const appReducer = combineReducers({ Post });
const rootReducer = (state, action) => {};

export default rootReducer;
