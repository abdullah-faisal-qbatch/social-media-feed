import actions from "./actions";
import axios from "axios";
import slackError from "../../utils/SlackError";

const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUsersBegin());
      const response = await axios.get("https://dummyjson.com/users");
      if (isSuccess(response)) {
        dispatch(actions.fetchUsersSuccess(response.data.users));
      }
    } catch (err) {
      dispatch(err);
      var raw = `{"text": "There\'s error during fetching users data"}`;
      slackError(raw);
    }
  };
};

const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUserBegin());
      const response = await axios.get(`https://dummyjson.com/users/${userId}`);
      if (isSuccess(response)) {
        dispatch(actions.fetchUserSuccess(response.data));
      }
    } catch (err) {
      dispatch(err);
      var raw = `{"text": "There\'s error during fetching users data"}`;
      slackError(raw);
    }
  };
};

const deleteAUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteUserBegin());
      dispatch(actions.deleteUserSuccess(userId));
    } catch (err) {
      dispatch(err);
      var raw = `{"text": "There\'s error during deleting users data"}`;
      slackError(raw);
    }
  };
};

export { fetchAllUsers, fetchUser, deleteAUser };
