import React from "react";
import "./../../styles/Post.css";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { deleteUserPost, fetchAllPosts } from "../../redux/posts/actionCreator";
import { useState } from "react";
import { updateUserPost } from "../../redux/posts/actionCreator";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
let commentId = 1;

const Post = (post) => {
  const [like, setLike] = useState(true);
  const navigate = useNavigate();
  const userCommentInput = useRef();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const { users } = usersData.users;
  const posts = useSelector((state) => state.Posts);
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(deleteUserPost(post.id));
    console.log("again");
  };
  const handlePostLike = () => {
    //here update the like
    // post.reactions = post.reactions + 1;
    const newPost = { ...post };
    console.log("Old reactions: ", post.reactions);
    newPost.reactions = newPost.reactions + 1;
    console.log("New POST: ", newPost);
    dispatch(updateUserPost(newPost));
    setLike(false);
  };
  const handlePostDislike = () => {
    //here update the dislike
    const newPost = { ...post };
    newPost.reactions = newPost.reactions - 1;
    dispatch(updateUserPost(newPost));
    setLike(true);
  };

  const handleEditPost = () => {
    const newPost = { ...post };
    delete newPost.onClick;
    console.log("clicked on edit post");
    // console.log(post);
    navigate("/edit-post", { state: newPost });
  };

  const handleUserComment = () => {
    const newPost = { ...post };
    console.log("current user: ");
    console.log(currentUser);
    console.log("new post: ");
    console.log(newPost);
    // console.log("You commented!");
    console.log(userCommentInput.current.value);
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
    console.log("Your new comment: ", comment);
    const existingCommentsJSON = localStorage.getItem("comments");
    const existingComments = existingCommentsJSON
      ? JSON.parse(existingCommentsJSON)
      : [];
    existingComments.push(comment);
    const updatedCommentsJSON = JSON.stringify(existingComments);
    localStorage.setItem("comments", updatedCommentsJSON);
    dispatch(fetchAllPosts());
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
      <button onClick={deletePost}>Delete Post</button>
      {console.log("IN CHILD I got:", post.finalComments)}
      <div className="card-title">{post.title}</div>
      <div style={{ textAlign: "center" }}>
        {" "}
        <img src={post.imageURL} alt="Fetched from API" />
      </div>
      <div className="card-body">{post.body}</div>
      <div className="card-info">
        {like ? (
          <button onClick={handlePostLike}>Like</button>
        ) : (
          <button onClick={handlePostDislike}>Dislike</button>
        )}
        <div className="card-likes">{post.reactions} Likes</div>
        <span className="card-comments" onClick={post.onClick}>
          {post.comments.length} Comments
        </span>
        <input
          type="text"
          placeholder="Enter your comment"
          ref={userCommentInput}
        ></input>
        <button onClick={handleUserComment}>Add Comment</button>
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

export default Post;
