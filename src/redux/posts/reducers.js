import actions from "./actions";
const initialState = {
  posts: [],
  loading: false,
  success: null,
};

const {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  ADD_POST_BEGIN,
  ADD_POST_SUCCESS,
  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  FETCH_USER_POSTS_BEGIN,
  FETCH_USER_POSTS_SUCCESS,
  UPDATE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
} = actions;

const Posts = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_POSTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: data };
    case FETCH_USER_POSTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_USER_POSTS_SUCCESS:
      return { ...state, loading: false, posts: [...state.posts, data.post] };
    case ADD_POST_BEGIN:
      return { ...state, loading: true };
    case ADD_POST_SUCCESS:
      return { ...state, loading: false, posts: [...state.posts, data.post] };
    case UPDATE_POST_BEGIN:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => (post.id === data.id ? data : post)),
      };
    case DELETE_POST_BEGIN:
      return { ...state, loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => {
          return post.id !== data.postId;
        }),
      };
    default:
      return state;
  }
};

export default Posts;
