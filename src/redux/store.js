import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import reducer from "./reducer";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
// import rootReducer from "./rootReducers";
import Posts from "./posts/reducers";
import Comments from "./user-comments/reducers";
import Users from "./users/reducers";

const rootReducers = combineReducers({ Posts, Users, Comments });
const store = createStore(
  rootReducers,
  compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))
);

export default store;
