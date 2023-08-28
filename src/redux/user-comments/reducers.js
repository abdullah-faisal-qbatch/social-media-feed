import actions from "./actions";
import _ from "lodash";

const initialState = {
  comments: [],
  loading: false,
  success: null,
  error: null,
};

const {
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  FETCH_USER_COMMENTS_BEGIN,
  FETCH_USER_COMMENTS_SUCCESS,
  UPDATE_USER_COMMENTS_BEGIN,
  UPDATE_USER_COMMENTS_SUCCESS,
  RE_INITIALIZE,
  UPDATE_SINGLE_USER_COMMENTS_BEGIN,
  UPDATE_SINGLE_USER_COMMENTS_SUCCESS,
  API_ERROR,
} = actions;

const Comments = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_COMMENTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: data, error: null };
    case ADD_COMMENT_BEGIN:
      return { ...state, loading: true };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Success: Comment added succesfully!",
        comments: _.concat(state.comments, data.comment),
        error: null,
      };
    case FETCH_USER_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // must be in same line
        comments: state.comments.filter(
          (comment) => comment.id === data.commentId
        ),
      };
    case UPDATE_USER_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Success: Comment added succesfully!",
        error: null,
        comments: [...data],
      };

    case UPDATE_SINGLE_USER_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SINGLE_USER_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        comments: [...data],
      };
    case DELETE_COMMENT_BEGIN:
      return { ...state, loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: "Success: Comment deleted succesfully!",
        posts: state.comments.filter(
          (comment) => comment.id !== data.commentId
        ),
      };
    case API_ERROR:
      return {
        ...state,
        error: data,
        success: false,
        loading: false,
      };
    case RE_INITIALIZE:
      return {
        ...state,
        success: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default Comments;
