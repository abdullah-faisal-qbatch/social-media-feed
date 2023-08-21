import actions from "./actions";
import axios from "axios";
import _, { cloneWith } from "lodash";
import { fetchAllUsers } from "../users/actionCreator";
// import store from "./../store";
// import { fetchAllComments } from "../user-comments/actionCreator";

const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};

const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchPostsBegin());
      axios
        .all([
          axios.get("https://dummyjson.com/posts", { params: { limit: 0 } }),
          axios.get("https://dummyjson.com/comments", { params: { limit: 0 } }),
          axios.get("https://dummyjson.com/users", { params: { limit: 0 } }),
          axios.get(
            "https://image.dummyjson.com/250x200/008080/ffffff?text=Random+Post!&fontSize=20"
          ),
        ])
        .then(
          axios.spread((postsData, commentsData, usersData, pictureData) => {
            const existingCommentsJSON = localStorage.getItem("comments");
            const existingComments = existingCommentsJSON
              ? JSON.parse(existingCommentsJSON)
              : [];
            console.log("I got exisiting comments: ", existingComments);
            commentsData.data.comments.push(...existingComments);

            console.log("comments", commentsData);

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
            console.log("I got existing posts: ", existingPosts);
            postsData.data.posts.push(...existingPosts);

            const finalData = postsData.data.posts.reduce((acc, post) => {
              const currentUser = currentUsers[post.userId];
              let finalComments = [];
              if (postIdsComments[post.id]) {
                finalComments = postIdsComments[post.id].map((comment) => {
                  comment.user["firstname"] =
                    currentUsers[comment.user.id].firstName;
                  comment.user["lastname"] =
                    currentUsers[comment.user.id].lastName;
                  return comment;
                });
              }

              if (postIdsComments[post.id])
                acc.push({
                  id: post.id,
                  title: post.title,
                  body: post.body,
                  reactions: post.reactions,
                  imageURL: pictureData.request.responseURL,
                  comments: finalComments,
                  email: currentUser.email,
                  alias:
                    currentUser.firstName[0].toUpperCase() +
                    currentUser.lastName[0].toUpperCase(),
                  name: currentUser.firstName + " " + currentUser?.lastName,
                });
              return acc;
            }, []);
            console.log("Final data: ", finalData);
            dispatch(actions.fetchPostsSuccess(finalData));
          })
        );
    } catch (err) {
      dispatch(err);
    }
  };
};

const fetchUserPost = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchPostsBegin());
      axios
        .all([
          axios.get("https://dummyjson.com/posts", { params: { limit: 0 } }),
          axios.get("https://dummyjson.com/comments", { params: { limit: 0 } }),
          axios.get("https://dummyjson.com/users", { params: { limit: 0 } }),
          axios.get(
            "https://image.dummyjson.com/250x200/008080/ffffff?text=Random+Post!&fontSize=20"
          ),
        ])
        .then(
          axios.spread((postsData, commentsData, usersData, pictureData) => {
            const existingCommentsJSON = localStorage.getItem("comments");
            const existingComments = existingCommentsJSON
              ? JSON.parse(existingCommentsJSON)
              : [];
            commentsData.data.comments.push(existingComments);
            const postIdsComments = _.groupBy(
              commentsData.data.comments,
              "postId"
            );

            console.log("Post ID comments: ", postIdsComments);

            const currentUsers = usersData.data.users.reduce((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {});

            const existingPostsJSON = localStorage.getItem("posts");
            const existingPosts = existingPostsJSON
              ? JSON.parse(existingPostsJSON)
              : [];
            console.log("I got existing posts: ", existingPosts);
            postsData.data.posts.push(...existingPosts);
            const finalData = postsData.data.posts.reduce((acc, post) => {
              const currentUser = currentUsers[post.userId];
              let finalComments = [];
              if (postIdsComments[post.id]) {
                finalComments = postIdsComments[post.id].map((comment) => {
                  comment.user["firstname"] =
                    currentUsers[comment.user.id].firstName;
                  comment.user["lastname"] =
                    currentUsers[comment.user.id].lastName;
                  return comment;
                });
              }

              if (post.userId === userId)
                acc.push({
                  id: post.id,
                  title: post.title,
                  body: post.body,
                  reactions: post.reactions,
                  imageURL: pictureData.request.responseURL,
                  comments: finalComments,
                  email: currentUser.email,
                  alias:
                    currentUser.firstName[0].toUpperCase() +
                    currentUser.lastName[0].toUpperCase(),
                  name: currentUser.firstName + " " + currentUser?.lastName,
                });
              return acc;
            }, []);
            console.log("Final data: ", finalData);
            dispatch(actions.fetchPostsSuccess(finalData));
          })
        );
    } catch (err) {
      dispatch(err);
    }
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
      console.log("old posts: ", existingPosts);
      const newPosts = existingPosts.filter((post) => postId !== post.id);
      // postsData.data.posts.push(...existingPosts);
      console.log("new posts:", newPosts);

      // const existingPostsJSON = localStorage.getItem("posts");
      // const existingPosts = existingPostsJSON
      //   ? JSON.parse(existingPostsJSON)
      //   : [];
      // existingPosts.push(newPost);
      const updatedPostsJSON = JSON.stringify(newPosts);
      localStorage.setItem("posts", updatedPostsJSON);

      // const response = await axios.delete(
      //   `https://dummyjson.com/posts/${postId}`
      // );
      // if (isSuccess(response)) {
      // }
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
      // const response = await axios.delete(
      //   `https://dummyjson.com/posts/${postId}`
      // );
      // if (isSuccess(response)) {
      // }
      dispatch(actions.updatePostSuccess(post));
    } catch (err) {
      dispatch(err);
    }
  };
};

export { fetchAllPosts, fetchUserPost, deleteUserPost, updateUserPost };
