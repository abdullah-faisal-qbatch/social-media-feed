const actions = {
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  ADD_POST_BEGIN: "ADD_POST_BEGIN",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  DELETE_POST_BEGIN: "DELETE_POST_BEGIN",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  FETCH_POST_COMMENTS_BEGIN: "FETCH_POST_COMMENTS_BEGIN",
  FETCH_POST_COMMENTS_SUCCESS: "FETCH_POST_COMMENTS_SUCCESS",
  FETCH_USER_POSTS_BEGIN: "FETCH_USER_POSTS_BEGIN",
  FETCH_USER_POSTS_SUCCESS: "FETCH_USER_POSTS_SUCCESS",

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

  fetchPostCommentsBegin: () => {
    return {
      type: actions.FETCH_POST_COMMENTS_BEGIN,
    };
  },
  fetchPostCommentsSuccess: (postId) => {
    return {
      type: actions.FETCH_POST_COMMENTS_SUCCESS,
      data: postId,
    };
  },

  addPostBegin: () => {
    return {
      type: actions.ADD_POST_BEGIN,
    };
  },

  fetchUserPostBegin: () => {
    return {
      type: actions.FETCH_USER_POSTS_BEGIN,
    };
  },

  fetchUserPostSuccess: (userId) => {
    return {
      type: actions.FETCH_USER_POSTS_SUCCESS,
      data: { userId },
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
