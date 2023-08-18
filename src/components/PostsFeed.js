import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./cards/Post";
import Spinner from "./Spinner";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import { fetchAllUsers } from "../redux/users/actionCreator";
import {
  fetchAllComments,
  updateUserComments,
} from "../redux/user-comments/actionCreator";
import Post from "./cards/Post";
import store from "../redux/store";

import actions from "../redux/posts/actions";

const PostsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const { users } = usersData.users;
  // console.log(posts);
  let { comments } = useSelector((state) => state.Comments);
  console.log("Updated posts: ", posts);
  console.log("Comments: ", comments);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllUsers());
  }, []);

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

  return (
    <>
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
