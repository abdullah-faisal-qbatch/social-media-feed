import React from "react";
import "./../../styles/Post.css";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { deleteUserPost } from "../../redux/posts/actionCreator";

const Post = ({
  alias,
  name,
  title,
  body,
  reactions,
  comments,
  email,
  id,
  imageURL,
  onClick,
  finalComments,
}) => {
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(deleteUserPost(id));
    console.log("again");
  };
  const editPost = () => {};
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{alias}</span>
          <div className="card-name" title={email}>
            {name}
          </div>
        </div>
      </div>
      <button onClick={deletePost}>Delete Post</button>
      {/* <button onClick={editPost}>Edit Post</button> */}
      {console.log("IN CHILD I got:", finalComments)}
      <div className="card-title">{title}</div>
      <div style={{ textAlign: "center" }}>
        {" "}
        <img src={imageURL} alt="Fetched from API" />
      </div>
      <div className="card-body">{body}</div>
      <div className="card-info">
        <div className="card-likes">{reactions} Likes</div>
        <span className="card-comments" onClick={onClick}>
          {comments.length} Comments
        </span>
        <div>
          {finalComments &&
            finalComments
              .filter((comment) => comment.postId === id)
              .map((comment) => <Comment {...comment}></Comment>)}
        </div>
      </div>
    </div>
  );
};

export default Post;
