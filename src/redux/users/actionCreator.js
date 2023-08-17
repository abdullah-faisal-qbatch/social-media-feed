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
        dispatch(actions.fetchUsersSuccess(response.data));
        // console.log(response);
      }
    } catch (err) {
      dispatch(err);
    }
  };
};
export { fetchAllUsers };
