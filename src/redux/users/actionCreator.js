import actions from "./actions";
import axios from "axios";

const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

const fetchUsers = (limit = 0, skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUsersBegin());
      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      if (isSuccess(response)) {
        dispatch(actions.fetchUsersSuccess(response.data.users));
      }
    } catch (err) {
      dispatch(actions.API_ERROR(err));
    }
  };
};

const searchAllUsers = (data) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchUserBegin());
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${data}`
      );
      dispatch(actions.searchUserSuccess(response.data.users));
    } catch (err) {
      dispatch(actions.API_ERROR(err));
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
      dispatch(actions.API_ERROR(err));
    }
  };
};

const deleteAUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteUserBegin());
      dispatch(actions.deleteUserSuccess(userId));
    } catch (err) {
      dispatch(actions.API_ERROR(err));
    }
  };
};
const reInitializeUsers = () => {
  return async (dispatch) => {
    dispatch(actions.reInitialize());
  };
};

export {
  reInitializeUsers,
  fetchUsers,
  fetchUser,
  deleteAUser,
  searchAllUsers,
};
