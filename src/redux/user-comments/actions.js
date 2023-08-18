const actions = {
  FETCH_COMMENTS_BEGIN: "FETCH_COMMENTS_BEGIN",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  ADD_COMMENT_BEGIN: "ADD_COMMENT_BEGIN",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  DELETE_COMMENT_BEGIN: "DELETE_COMMENT_BEGIN",
  DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",

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

  addCommentBegin: () => {
    return {
      type: actions.ADD_COMMENT_BEGIN,
    };
  },

  addCommentSuccess: (comment) => {
    return {
      type: actions.ADD_COMMENT_SUCCESS,
      data: { comment },
    };
  },

  deleteCommentBegin: () => {
    return {
      type: actions.DELETE_COMMENT_BEGIN,
    };
  },

  deleteCommentSuccess: (commentId) => {
    return {
      type: actions.DELETE_COMMENT_SUCCESS,
      data: { commentId },
    };
  },
};
export default actions;
