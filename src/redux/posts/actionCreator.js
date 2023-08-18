import actions from "./actions";
import axios from "axios";
import _ from "lodash";
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
            const postIdsComments = _.groupBy(
              commentsData.data.comments,
              "postId"
            );
            const currentUsers = usersData.data.users.reduce((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {});

            const finalData = postsData.data.posts.reduce((acc, post) => {
              const currentUser = currentUsers[post.userId];
              if (postIdsComments[post.id])
                acc.push({
                  id: post.id,
                  title: post.title,
                  body: post.body,
                  reactions: post.reactions,
                  imageURL: pictureData.request.responseURL,
                  comments: postIdsComments?.[post.id],
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
            const postIdsComments = _.groupBy(
              commentsData.data.comments,
              "postId"
            );
            const currentUsers = usersData.data.users.reduce((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {});
            const finalData = postsData.data.posts.reduce((acc, post) => {
              const currentUser = currentUsers[post.userId];
              if (postIdsComments[post.id] && post.userId === userId)
                acc.push({
                  id: post.id,
                  title: post.title,
                  body: post.body,
                  reactions: post.reactions,
                  imageURL: pictureData.request.responseURL,
                  comments: postIdsComments?.[post.id],
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

export { fetchAllPosts, fetchUserPost, deleteUserPost };
