const actions = {
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  ADD_POST_BEGIN: "ADD_POST_BEGIN",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  DELETE_POST_BEGIN: "DELETE_POST_BEGIN",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",

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

  addPostBegin: () => {
    return {
      type: actions.ADD_POST_BEGIN,
    };
  },

  addPostSuccess: (post) => {
    return {
      type: actions.ADD_POST_SUCCESS,
      data: { post },
    };
  },

  deletePostBegin: () => {
    return {
      type: actions.DELETE_POST_BEGIN,
    };
  },

  deletePostSuccess: (postId) => {
    return {
      type: actions.DELETE_POST_SUCCESS,
      data: { postId },
    };
  },
};
export default actions;
