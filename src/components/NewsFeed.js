import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./cards/Post";
import Spinner from "./Spinner";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import { fetchAllUsers } from "../redux/users/actionCreator";
import { fetchAllComments } from "../redux/user-comments/actionCreator";
import Post from "./cards/Post";
import store from "../redux/store";

import actions from "../redux/posts/actions";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.Posts);
  console.log("Updated posts: ", posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return <>{posts && posts.map((post) => <Post key={post.id} {...post} />)}</>;
};

export default NewsFeed;
