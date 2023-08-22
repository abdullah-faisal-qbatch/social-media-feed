import React from "react";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../../redux/posts/actionCreator";
import { fetchAllUsers } from "../../redux/users/actionCreator";
import { updateUserComments } from "../../redux/user-comments/actionCreator";
import Post from "../cards/Post";
import { useLocation } from "react-router-dom";
import ProfilePost from "../ProfilePost";

const PostsFeed = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);
  const usersData = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userid"); // Retrieve the value from the query parameter

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
    console.log(`Clicked on post with ID: ${postId}`);
    //getAllComments
    const post = posts.posts.find((post) => {
      return post.id === postId;
    });
    const finalComments = [...post.comments];
    dispatch(updateUserComments(finalComments));
  };

  return (
    <div className="flex flex-col m-auto">
      {posts.loading ? (
        <Spinner />
      ) : (
        posts.posts
          // .slice(1, 5)
          .map((post) => (
            <ProfilePost
              key={post.id}
              {...post}
              onClick={() => handlePostClick(post.id)}
              finalComments={comments}
            />
          ))
      )}
    </div>
  );
};

export default PostsFeed;
