const actions = {
  FETCH_USERS_BEGIN: "FETCH_USERS_BEGIN",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  SEARCH_USER_BEGIN: "SEARCH_USER_BEGIN",
  SEARCH_USER_SUCCESS: "SEARCH_USER_SUCCESS",
  DELETE_USER_BEGIN: "DELETE_USER_BEGIN",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",
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

  searchUserBegin: () => {
    return {
      type: actions.SEARCH_USER_BEGIN,
    };
  },

  searchUserSuccess: (data) => {
    return {
      type: actions.SEARCH_USER_SUCCESS,
      data,
    };
  },

  deleteUserBegin: () => {
    return {
      type: actions.DELETE_USER_BEGIN,
    };
  },

  deleteUserSuccess: (userId) => {
    return {
      type: actions.DELETE_USER_SUCCESS,
      data: { userId },
    };
  },

  reInitialize: () => {
    return {
      type: actions.RE_INITIALIZE,
    };
  },

  apiError: (data) => {
    return {
      type: actions.API_ERROR,
      data,
    };
  },
};

export default actions;
