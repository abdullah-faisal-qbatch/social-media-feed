import actions from "./actions";
import axios from "axios";
import { fetchAllUsers } from "../users/actionCreator";
// import { fetchAllComments } from "../user-comments/actionCreator";

const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchPostsBegin());
      const response = await axios.get("https://dummyjson.com/posts");
      if (isSuccess(response)) {
        dispatch(actions.fetchPostsSuccess(response.data));
        // console.log("Posts");
        // console.log(response.data.posts);
      }
    } catch (err) {
      dispatch(err);
    }
  };
};
export { fetchAllPosts };
