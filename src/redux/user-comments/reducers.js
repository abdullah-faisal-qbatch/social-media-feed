import actions from "./actions"; // Import your action types

const initialState = {
  comments: [],
  loading: false,
  success: null,
};

const {
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
} = actions;

const Comments = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_COMMENTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: data };
    case ADD_COMMENT_BEGIN:
      return { ...state, loading: true };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, data.comment],
      };
    case DELETE_COMMENT_BEGIN:
      return { ...state, loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.comments.filter((comment) => {
          return comment.id !== data.commentId;
        }),
      };

    default:
      return state;
  }
};

export default Comments;
