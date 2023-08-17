import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import { fetchAllUsers } from "../redux/users/actionCreator";
import { fetchAllComments } from "../redux/user-comments/actionCreator";
import store from "../redux/store";

import actions from "../redux/posts/actions";

const NewsFeed = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.Post.posts);
  const users = useSelector((state) => state.User.users);
  const comments = useSelector((state) => state.Comment.comments);

  useEffect(() => {
    axios
      .all([
        fetchAllPosts()(dispatch),
        fetchAllComments()(dispatch),
        fetchAllUsers()(dispatch),
      ])
      .then(() => {
        const newPosts = [];
        console.log("users", users);
        console.log("posts", posts);
        console.log("comments", comments);

        dispatch(actions.fetchPostsSuccess(newPosts));

        // console.log("FINAL");
        // console.log(store.getState());
      });
  }, [dispatch]);

  return (
    <>
      {console.log("posts: ", posts)}
      {console.log("users: ", users)}
      {console.log("comments: ", comments)}
    </>
  );
};

export default NewsFeed;
