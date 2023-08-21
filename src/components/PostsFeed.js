import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import { fetchAllUsers } from "../redux/users/actionCreator";
import { updateUserComments } from "../redux/user-comments/actionCreator";
import { fetchUserPost } from "../redux/posts/actionCreator";
import Post from "./cards/Post";
import { useLocation } from "react-router-dom";

const PostsFeed = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);
  const usersData = useSelector((state) => state.Users);
  const location = useLocation();
  const { currentUser } = usersData;
  const { users } = usersData.users;
  // console.log(posts);
  let { comments } = useSelector((state) => state.Comments);
  console.log("Updated posts: ", posts);
  console.log("Comments: ", comments);

  useEffect(() => {
    console.log("use uffect called!");
    if (props.value === "my-posts") {
      dispatch(fetchUserPost(currentUser.id));
    } else if (props.value !== "user") {
      dispatch(fetchAllPosts());
      dispatch(fetchAllUsers());
    }
  }, [location]);

  const handlePostClick = (postId) => {
    console.log(`Clicked on post with ID: ${postId}`);
    //getAllComments
    const post = posts.posts.find((post) => {
      return post.id === postId;
    });
    // post.comments.map((comment) => comment.user.id===);
    console.log("Post Data: ", post);
    const finalComments = [...post.comments];
    dispatch(updateUserComments(finalComments));
  };

  const handleAddPost = () => {
    console.log("handle add post");
  };

  return (
    <>
      {props.value === "my-posts" ? <h1>MY POSTS</h1> : <h1>POSTS FEED</h1>}
      {posts.loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        posts.posts
          .slice(1, 5)
          .map((post) => (
            <Post
              key={post.id}
              {...post}
              onClick={() => handlePostClick(post.id)}
              finalComments={comments}
            />
          ))
      )}
    </>
  );
};

export default PostsFeed;
