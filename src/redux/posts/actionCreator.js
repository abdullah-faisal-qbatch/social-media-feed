import actions from "./actions";
import axios from "axios";
import _ from "lodash";

const fetchAllPosts = (userId = null) => {
  return async (dispatch) => {
    dispatch(actions.fetchPostsBegin());
    axios
      .all([
        axios.get("https://dummyjson.com/posts", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/comments", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/users", { params: { limit: 0 } }),
        axios.get(
          "https://image.dummyjson.com/750x200/008080/ffffff?text=Random+Post!&fontSize=20"
        ),
      ])
      .then(
        axios.spread(
          async (postsData, commentsData, usersData, pictureData) => {
            //getting data from browser
            const existingCommentsJSON = localStorage.getItem("comments");
            const existingComments = existingCommentsJSON
              ? JSON.parse(existingCommentsJSON)
              : [];
            commentsData.data.comments.push(...existingComments);
            const postIdsComments = _.groupBy(
              commentsData.data.comments,
              "postId"
            );
            const currentUsers = usersData.data.users.reduce((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {});
            const existingPostsJSON = localStorage.getItem("posts");
            const existingPosts = existingPostsJSON
              ? JSON.parse(existingPostsJSON)
              : [];
            postsData.data.posts.push(...existingPosts);
            const finalData = postsData.data.posts.reduce((acc, post) => {
              let finalComments = [];
              if (postIdsComments[post.id]) {
                finalComments = postIdsComments[post.id]?.map((comment) => {
                  comment.user["firstname"] =
                    currentUsers[comment.user.id].firstName;
                  comment.user["lastname"] =
                    currentUsers[comment.user.id].lastName;
                  return comment;
                });
              }
              if (
                (!userId && postIdsComments[post.id]) ||
                post.userId === Number(userId)
              ) {
                const postInfo = {
                  id: post.id,
                  title: post.title,
                  body: post.body,
                  reactions: post.reactions,
                  imageURL: post.imageURL || pictureData.request.responseURL,
                  comments: finalComments,
                  email: currentUsers[post.userId].email,
                  alias:
                    currentUsers[post.userId].firstName[0].toUpperCase() +
                    currentUsers[post.userId].lastName[0].toUpperCase(),
                  name:
                    currentUsers[post.userId].firstName +
                    " " +
                    (currentUsers[post.userId].lastName || ""),
                };
                acc.push(postInfo);
              }
              return acc;
            }, []);
            dispatch(actions.fetchPostsSuccess(finalData));
          }
        )
      )
      .catch((err) => {
        dispatch(err);
      });
  };
};

const deleteUserPost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deletePostBegin());
      const existingPostsJSON = localStorage.getItem("posts");
      const existingPosts = existingPostsJSON
        ? JSON.parse(existingPostsJSON)
        : [];
      const newPosts = existingPosts.filter((post) => postId !== post.id);
      const updatedPostsJSON = JSON.stringify(newPosts);
      localStorage.setItem("posts", updatedPostsJSON);
      dispatch(actions.deletePostSuccess(postId));
    } catch (err) {
      dispatch(err);
    }
  };
};

const updateUserPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(actions.updatePostBegin());
      dispatch(actions.updatePostSuccess(post));
    } catch (err) {
      dispatch(err);
    }
  };
};

export { fetchAllPosts, deleteUserPost, updateUserPost };
