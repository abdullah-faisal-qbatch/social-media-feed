import actions from "./actions";
import axios from "axios";

const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

const fetchAllComments = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchCommentsBegin());
      const response = await axios.get("https://dummyjson.com/comments");
      if (isSuccess(response)) {
        dispatch(actions.fetchCommentsSuccess(response.data));
      }
    } catch (err) {
      dispatch(err);
    }
  };
};

const updateUserComments = (comments) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.updateUserCommentsBegin());
      dispatch(actions.updateUserCommentsSuccess(comments));
    } catch (err) {
      dispatch(err);
    }
  };
};

export { fetchAllComments, updateUserComments };
