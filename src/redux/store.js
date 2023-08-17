import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import reducer from "./reducer";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
// import rootReducer from "./rootReducers";
import Post from "./posts/reducers";
import Comment from "./user-comments/reducers";
import User from "./users/reducers";

const rootReducers = combineReducers({ Post, User, Comment });
const store = createStore(
  rootReducers,
  compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))
);

export default store;
