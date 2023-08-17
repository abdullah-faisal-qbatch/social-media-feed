const actions = {
  FETCH_USERS_BEGIN: "FETCH_USERS_BEGIN",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",

  API_ERROR: "API_ERROR",

  fetchUsersBegin: () => {
    return {
      type: actions.FETCH_USERS_BEGIN,
    };
  },

  fetchUsersSuccess: (data) => {
    return {
      type: actions.FETCH_USERS_SUCCESS,
      data,
    };
  },
};

export default actions;
