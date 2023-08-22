import React from "react";
import "./../../styles/Post.css";
import Comment from "./Comment";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { deleteUserPost, fetchAllPosts } from "../../redux/posts/actionCreator";
import { useState } from "react";
import { updateUserPost } from "../../redux/posts/actionCreator";
import { useRef } from "react";
import { useSelector } from "react-redux";
import DeleteMessage from "../DeleteMessage";

const Post = (post) => {
  const [like, setLike] = useState(true);
  const userCommentInput = useRef();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const handlePostLike = () => {
    const newPost = { ...post };
    newPost.reactions = newPost.reactions + 1;
    dispatch(updateUserPost(newPost));
    setLike(false);
  };
  const handlePostDislike = () => {
    const newPost = { ...post };
    newPost.reactions = newPost.reactions - 1;
    dispatch(updateUserPost(newPost));
    setLike(true);
  };

  const handleUserComment = () => {
    const newPost = { ...post };
    let comment = {
      body: userCommentInput.current.value,
      postId: newPost.id,
      user: {
        firstname: currentUser.firstName,
        lastname: currentUser.lastName,
        id: currentUser.id,
        username: currentUser.username,
      },
    };
    const existingCommentsJSON = localStorage.getItem("comments");
    const existingComments = existingCommentsJSON
      ? JSON.parse(existingCommentsJSON)
      : [];
    existingComments.push(comment);
    const updatedCommentsJSON = JSON.stringify(existingComments);
    localStorage.setItem("comments", updatedCommentsJSON);
    dispatch(fetchAllPosts());
  };
  const deletePost = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteUserPost(post.id));
  };
  const handleOnClickCancel = () => {
    setAlert(false);
  };

  return (
    <div className="rounded-lg card-container">
      <button
        className="inline-flex margin-class ml-4 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={deletePost}
      >
        Delete
      </button>
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{post.alias}</span>
          <div className="card-name" title={post.email}>
            {post.name}
          </div>
        </div>
      </div>
      {alert && (
        <DeleteMessage
          onClickDelete={handleOnClickDelete}
          onClickCancel={handleOnClickCancel}
        ></DeleteMessage>
      )}
      <div className="card-title">{post.title}</div>
      <div className="text-center">
        <img src={post.imageURL} alt="Fetched from API" className="mx-auto" />
      </div>
      <div className="card-body">{post.body}</div>
      <div className="card-info">
        {like ? (
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePostLike}
          >
            Like
          </button>
        ) : (
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePostDislike}
          >
            Dislike
          </button>
        )}
        <span className="text-base text-gray-700 ml-2">
          {post.reactions} Likes
        </span>
        <div className="text-center">
          <input
            className="shadow appearance-none border mr-4 rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={userCommentInput}
            required
            placeholder="Enter your comment"
          />
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleUserComment}
          >
            Add Comment{" "}
          </button>
          <p className="card-comments" onClick={post.onClick}>
            {post.comments.length} Comments
          </p>
        </div>
        <div>
          {console.log("Final Comments: ", post.finalComments)}
          {post.finalComments &&
            post.finalComments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => <Comment {...comment}></Comment>)}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
