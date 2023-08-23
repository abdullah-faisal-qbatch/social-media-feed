import actions from "./actions";
import axios from "axios";

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
    }
  };
};

const searchAllUsers = (data) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchUserBegin());
      dispatch(actions.searchUserSuccess(data));
    } catch (err) {
      dispatch(err);
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
    }
  };
};

export { fetchAllUsers, fetchUser, deleteAUser, searchAllUsers };
