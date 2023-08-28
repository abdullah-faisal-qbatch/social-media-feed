const actions = {
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  UPDATE_POST_BEGIN: "UPDATE_POST_BEGIN",
  UPDATE_POST_SUCCESS: "UPDATE_POST_SUCCESS",
  ADD_POST_BEGIN: "ADD_POST_BEGIN",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  DELETE_POST_BEGIN: "DELETE_POST_BEGIN",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  FETCH_POST_COMMENTS_BEGIN: "FETCH_POST_COMMENTS_BEGIN",
  FETCH_POST_COMMENTS_SUCCESS: "FETCH_POST_COMMENTS_SUCCESS",
  FETCH_USER_POSTS_BEGIN: "FETCH_USER_POSTS_BEGIN",
  FETCH_USER_POSTS_SUCCESS: "FETCH_USER_POSTS_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",
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

  updatePostBegin: () => {
    return {
      type: actions.UPDATE_POST_BEGIN,
    };
  },
  updatePostSuccess: (post) => {
    return {
      type: actions.UPDATE_POST_SUCCESS,
      data: post,
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
