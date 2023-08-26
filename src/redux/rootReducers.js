import { combineReducers } from "redux";

import Posts from "./posts/reducers";
import Comments from "./user-comments/reducers";
import Users from "./users/reducers";

const rootReducers = combineReducers({ Posts, Users, Comments });

export default rootReducers;
