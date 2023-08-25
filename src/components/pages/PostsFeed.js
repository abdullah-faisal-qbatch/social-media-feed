import React from "react";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../../redux/posts/actionCreator";
import { fetchAllUsers } from "../../redux/users/actionCreator";
import { updateUserComments } from "../../redux/user-comments/actionCreator";
import { useLocation } from "react-router-dom";
import Post from "../cards/Post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../Alert";

const PostsFeed = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);
  const usersData = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userid");

  const { currentUser } = usersData;
  let { comments } = useSelector((state) => state.Comments);

  useEffect(() => {
    if (props.value === "my-posts") {
      dispatch(fetchAllPosts(currentUser.id));
    } else if (props.value !== "user") {
      dispatch(fetchAllPosts());
      dispatch(fetchAllUsers());
    } else {
      dispatch(fetchAllPosts(userId));
    }
  }, [location]);

  const handlePostClick = (postId) => {
    //getAllComments
    const post = posts.posts.find((post) => {
      return post.id === postId;
    });
    const finalComments = [...post.comments];
    !finalComments.length
      ? toast.error("Alert: No comments exists")
      : dispatch(updateUserComments(finalComments));
  };

  return (
    <div className="flex flex-col m-auto">
      {posts.loading ? (
        <Spinner />
      ) : (
        posts.posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            onClick={() => handlePostClick(post.id)}
            finalComments={comments}
          />
        ))
      )}
      <ToastContainer />
      {!posts.posts.length && (
        <Alert title="Alert: " message="No posts found!" />
      )}
    </div>
  );
};

export default PostsFeed;
