import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUserPost } from "../redux/posts/actionCreator";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import { deleteUserPost } from "../redux/posts/actionCreator";
import DeleteMessage from "./DeleteMessage";
import Comment from "./cards/Comment";
import Avatar from "./Avatar";
// import "./../styles/Post.css";
import "./../styles/Comment.css";
import CommentProfile from "./cards/CommentProfile";

const ProfilePost = (post) => {
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
    <div>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('${post.imageURL}')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative" style={{ marginTop: "-80px" }}>
                      <Avatar initials={post.alias} type="profile"></Avatar>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={deletePost}
                      >
                        Delete
                      </button>
                      {like ? (
                        <button
                          className="inline-flex ml-2 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={handlePostLike}
                        >
                          Like
                        </button>
                      ) : (
                        <button
                          className="inline-flex ml-2 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={handlePostDislike}
                        >
                          Dislike
                        </button>
                      )}
                    </div>
                  </div>
                  {alert && (
                    <DeleteMessage
                      onClickDelete={handleOnClickDelete}
                      onClickCancel={handleOnClickCancel}
                    ></DeleteMessage>
                  )}
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {post.reactions}
                        </span>
                        <span className="text-sm text-blueGray-400">Likes</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span
                          onClick={post.onClick}
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                          {post.comments.length}
                        </span>
                        <span
                          className="text-sm text-blueGray-400"
                          onClick={post.onClick}
                        >
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {post.name}
                  </h3>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-envelope-open mr-2 text-lg text-blueGray-400"></i>
                    {post.title}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {post.body}
                      </p>
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
                        <button
                          className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={post.onClick}
                        >
                          View Comments{" "}
                        </button>
                        <div>
                          {/* {console.log("Final Comments: ", post.finalComments)} */}
                          {post.finalComments &&
                            post.finalComments
                              .filter((comment) => comment.postId === post.id)
                              .map((comment) => (
                                <CommentProfile {...comment}></CommentProfile>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePost;
