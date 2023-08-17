import actions from "./actions"; // Import your action types

const initialState = {
  users: [],
  loading: false,
  success: null,
  error: null,
};

const { FETCH_USERS_BEGIN, FETCH_USERS_SUCCESS } = actions;

const Users = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_USERS_BEGIN:
      return { ...state, loading: true, success: null, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: data };
    default:
      return state;
  }
};

export default Users;
