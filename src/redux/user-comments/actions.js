const actions = {
  FETCH_COMMENTS_BEGIN: "FETCH_COMMENTS_BEGIN",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  // ADD_COMMENT_BEGIN: "ADD_COMMENT_BEGIN",
  // ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  // DELETE_COMMENT_BEGIN: "DELETE_COMMENT_BEGIN",
  // DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
  // FETCH_USER_COMMENTS_BEGIN: "FETCH_USER_COMMENT_BEGIN",
  // FETCH_USER_COMMENTS_SUCCESS: "FETCH_USER_COMMENT_SUCCESS",
  UPDATE_USER_COMMENTS_BEGIN: "UPDATE_USER_COMMENTS_BEGIN",
  UPDATE_USER_COMMENTS_SUCCESS: "UPDATE_USER_COMMENTS_SUCCESS",
  UPDATE_SINGLE_USER_COMMENTS_BEGIN: "UPDATE_SINGLE_USER_COMMENTS_BEGIN",
  UPDATE_SINGLE_USER_COMMENTS_SUCCESS: "UPDATE_SINGLE_USER_COMMENTS_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",

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

  // fetchUserCommentsBegin: () => {
  //   return {
  //     type: actions.FETCH_USER_COMMENTS_BEGIN,
  //   };
  // },

  // fetchUserCommentsSuccess: (commentId) => {
  //   return {
  //     type: actions.FETCH_USER_COMMENTS_SUCCESS,
  //     data: { commentId },
  //   };
  // },

  // addCommentBegin: () => {
  //   return {
  //     type: actions.ADD_COMMENT_BEGIN,
  //   };
  // },

  // addCommentSuccess: (comment) => {
  //   return {
  //     type: actions.ADD_COMMENT_SUCCESS,
  //     data: { comment },
  //   };
  // },

  // deleteCommentBegin: () => {
  //   return {
  //     type: actions.DELETE_COMMENT_BEGIN,
  //   };
  // },

  // deleteCommentSuccess: (commentId) => {
  //   return {
  //     type: actions.DELETE_COMMENT_SUCCESS,
  //     data: { commentId },
  //   };
  // },

  updateUserCommentsBegin: () => {
    return {
      type: actions.UPDATE_USER_COMMENTS_BEGIN,
    };
  },
  updateUserCommentsSuccess: (data) => {
    return {
      type: actions.UPDATE_USER_COMMENTS_SUCCESS,
      data,
    };
  },

  updateSingleUserCommentsBegin: () => {
    return {
      type: actions.UPDATE_SINGLE_USER_COMMENTS_BEGIN,
    };
  },
  updateSingleUserCommentsSuccess: (data) => {
    return {
      type: actions.UPDATE_SINGLE_USER_COMMENTS_SUCCESS,
      data,
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
