import actions from "./actions";

const initialState = {
  posts: [],
  loading: false,
  success: null,
  error: null,
};

const { FETCH_POSTS_BEGIN, FETCH_POSTS_SUCCESS } = actions;

const Posts = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_POSTS_BEGIN:
      return { ...state, loading: true, success: null, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: data };
    default:
      return state;
  }
};

export default Posts;
