const actions = {
  FETCH_COMMENTS_BEGIN: "FETCH_COMMENTS_BEGIN",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  API_ERROR: "API_ERROR",

  fetchCommentsBegin: () => {
    return {
      type: actions.FETCH_COMMENTS_BEGIN,
    };
  },

  fetchCommentsSuccess: (data) => {
    return {
      type: actions.FETCH_COMMENTS_SUCCESS,
      data,
    };
  },
};
export default actions;
