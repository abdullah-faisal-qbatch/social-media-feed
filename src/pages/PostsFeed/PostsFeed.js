import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import Post from "../../components/cards/Post/Post";

import { fetchAllPosts } from "../../redux/posts/actionCreator";
import { fetchAllUsers } from "../../redux/users/actionCreator";
import { updateUserComments } from "../../redux/user-comments/actionCreator";
import { ToastContext } from "../../contexts/ToastContext";

const PostsFeed = ({ value }) => {
  const toast = useContext(ToastContext);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);
  const usersData = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userid");

  const { currentUser } = usersData;
  let { comments } = useSelector((state) => state.Comments);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    if (value === "my-posts") {
      dispatch(fetchAllPosts(currentUser.id));
    } else if (value !== "user") {
      dispatch(fetchAllPosts());
      dispatch(fetchAllUsers());
    } else {
      dispatch(fetchAllPosts(userId));
    }
  }, [location, dispatch, value, userId, currentUser.id]);

  const handlePostClick = (postId) => {
    //getAllComments
    const post = posts.posts.find((post) => {
      return post.id === postId;
    });
    const finalComments = [...post.comments];
    !finalComments.length && toast.error("Alert: No comments exists");
    setUserComments(finalComments);
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
            // finalComments={userComments}
          />
        ))
      )}
      {!posts.posts.length && (
        <Alert title="Alert: " message="No posts found!" />
      )}
    </div>
  );
};

export default PostsFeed;
