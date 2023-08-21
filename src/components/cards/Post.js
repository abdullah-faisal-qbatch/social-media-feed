import React from "react";
import "./../../styles/Post.css";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { deleteUserPost, fetchAllPosts } from "../../redux/posts/actionCreator";
import { useState } from "react";
import { updateUserPost } from "../../redux/posts/actionCreator";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmAction from "../ConfirmAction";
let commentId = 1;

const Post = (post) => {
  const [like, setLike] = useState(true);
  const navigate = useNavigate();
  const userCommentInput = useRef();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const [alert, setAlert] = useState(false);
  // const { users } = usersData.users;
  // const posts = useSelector((state) => state.Posts);
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

  // const handleEditPost = () => {
  //   const newPost = { ...post };
  //   delete newPost.onClick;
  //   console.log("clicked on edit post");
  //   // console.log(post);
  //   navigate("/edit-post", { state: newPost });
  // };

  const handleUserComment = () => {
    const newPost = { ...post };
    // console.log("You commented!");
    let comment = {
      body: userCommentInput.current.value,
      postId: newPost.id,
      id: commentId++,
      user: {
        firstname: currentUser.firstName,
        lastname: currentUser.lastName,
        id: currentUser.id,
        username: currentUser.username,
      },
    };
    // console.log("Your new comment: ", comment);
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
    // console.log("again");
  };
  const handleOnClickCancel = () => {
    setAlert(false);
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{post.alias}</span>
          <div className="card-name" title={post.email}>
            {post.name}
          </div>
        </div>
      </div>
      <button
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={deletePost}
      >
        Delete Post{" "}
      </button>
      {alert && (
        <ConfirmAction
          onClickDelete={handleOnClickDelete}
          onClickCancel={handleOnClickCancel}
        ></ConfirmAction>
      )}

      {console.log("IN CHILD I got:", post.finalComments)}
      <div className="card-title">{post.title}</div>
      <div className="text-center">
        <img src={post.imageURL} alt="Fetched from API" className="mx-auto" />
      </div>
      <div className="card-body">{post.body}</div>
      <div className="card-info">
        {like ? (
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePostLike}
          >
            Like
          </button>
        ) : (
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePostDislike}
          >
            Dislike
          </button>
        )}
        <div className="card-likes">{post.reactions} Likes</div>
        <div className="text-center">
          <input
            class="shadow appearance-none border mr-4 rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={userCommentInput}
            required
            placeholder="Enter your comment"
          />
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
