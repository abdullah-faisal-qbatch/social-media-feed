import actions from "./actions"; // Import your action types

const initialState = {
  comments: [],
  loading: false,
  success: null,
  error: null,
};

const { FETCH_COMMENTS_BEGIN, FETCH_COMMENTS_SUCCESS } = actions;

const Comments = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_COMMENTS_BEGIN:
      return { ...state, loading: true, success: null, error: null };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: data };
    default:
      return state;
  }
};

export default Comments;
