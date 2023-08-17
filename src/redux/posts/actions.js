const actions = {
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  API_ERROR: "API_ERROR",

  fetchPostsBegin: () => {
    return {
      type: actions.FETCH_POSTS_BEGIN,
    };
  },

  fetchPostsSuccess: (data) => {
    return {
      type: actions.FETCH_POSTS_SUCCESS,
      data,
    };
  },
};
export default actions;
