import actions from "./actions";
import axios from "axios";
import _ from "lodash";
import slackError from "../../utils/SlackError";

const fetchAllPosts = (userId = null) => {
  return async (dispatch) => {
    try {
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
              // console.log("image URL: ", imageURL);
              // console.log("pictures DATA URL : ", pictureData);

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
                // const imageURL = async () => {
                //   const imageData = await axios.get(
                //     "https://image.dummyjson.com/750x200/008080/ffffff?text=Random+Post!&fontSize=20"
                //   );
                //   return imageData;
                // };
                // // const imageURL = async () =>
                // console.log("image URL: ");
                // console.log("Picture Data : ", pictureData);
                if (
                  (!userId && postIdsComments[post.id]) ||
                  post.userId == userId
                ) {
                  const postInfo = {
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
                    name:
                      currentUser.firstName +
                      " " +
                      (currentUser.lastName || ""),
                  };

                  acc.push(postInfo);
                }
                return acc;
              }, []);
              console.log("Final data: ", finalData);
              dispatch(actions.fetchPostsSuccess(finalData));
            }
          )
        );
    } catch (err) {
      dispatch(err);
      var raw = `{"text": "There\'s error during updating data"}`;
      slackError(raw);
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
      const newPosts = existingPosts.filter((post) => postId !== post.id);
      const updatedPostsJSON = JSON.stringify(newPosts);
      localStorage.setItem("posts", updatedPostsJSON);
      dispatch(actions.deletePostSuccess(postId));
    } catch (err) {
      dispatch(err);
      var raw = `{"text": "There\'s error during updating data"}`;
      slackError(raw);
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
      var raw = `{"text": "There\'s error during updating data"}`;
      slackError(raw);
    }
  };
};

export { fetchAllPosts, deleteUserPost, updateUserPost };
