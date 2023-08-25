import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserPost,
  deleteUserPost,
} from "../../redux/posts/actionCreator";
import { updateUserComments } from "../../redux/user-comments/actionCreator";
import DeleteMessage from "../DeleteMessage";
import Avatar from "../Avatar";
import Comment from "./Comment";
import { ToastContainer, toast } from "react-toastify";
import Heart from "react-heart";

const Post = (post) => {
  const [like, setLike] = useState(false);
  const userCommentInput = useRef();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const handlePostLike = () => {
    setLike(!like);
    const newPost = { ...post };
    if (like) {
      newPost.reactions = newPost.reactions - 1;
    } else {
      newPost.reactions = newPost.reactions + 1;
    }
    dispatch(updateUserPost(newPost));
  };

  const handleUserComment = (e) => {
    e.preventDefault();
    if (userCommentInput.current.value !== "") {
      let comment = {
        body: userCommentInput.current.value,
        postId: post.id,
        user: {
          firstname: currentUser.firstName,
          lastname: currentUser.lastName,
          id: currentUser.id,
          username: currentUser.username,
        },
      };
      const newComments = [comment, ...post.comments];
      const newPost = { ...post, comments: newComments };

      const existingCommentsJSON = localStorage.getItem("comments");
      const existingComments = existingCommentsJSON
        ? JSON.parse(existingCommentsJSON)
        : [];
      existingComments.push(comment);

      // const existingPostsJSON = localStorage.getItem("posts");
      // const existingPosts = existingPostsJSON
      //   ? JSON.parse(existingPostsJSON)
      //   : [];
      // const currentPost = existingPosts.find(
      //   (currentPost) => currentPost.id === post.id
      // );
      // currentPost.comments.push()
      // existingPosts.comments();

      // finalData.push(...existingPosts);

      const updatedCommentsJSON = JSON.stringify(existingComments);
      localStorage.setItem("comments", updatedCommentsJSON);
      dispatch(updateUserPost(newPost));
      dispatch(updateUserComments(newComments));
      userCommentInput.current.value = "";
    } else {
      toast("Alert: Please enter comment");
    }
  };
  const deletePost = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteUserPost(post.id));
    toast("Success: Post Deleted Successfully");
  };

  const handleOnClickCancel = () => {
    setAlert(false);
  };

  return (
    <div className="w-3/4 m-auto mt-10 ">
      <ToastContainer></ToastContainer>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('${post.imageURL}')`,
            }}
          >
            {console.log(post.imageURL)}
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
                    <div className="flex flex-row py-6 px-3 sm:mt-0 ml-24 h-10 mb-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                        fill="none"
                        scale=""
                        width="50"
                        height="40"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={deletePost}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <div>
                        <Heart
                          className="w-8 ml-3 mt-1"
                          isActive={like}
                          onClick={handlePostLike}
                        />
                      </div>
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
                        <div className="flex flex-row">
                          <div className="w-9/12 mb-1">
                            <form onSubmit={handleUserComment}>
                              <input
                                className="shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                ref={userCommentInput}
                                required
                                placeholder="Enter your comment"
                              />
                              <button
                                className="mt-0 inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center ml-16 "
                                onClick={handleUserComment}
                                type="submit"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  {" "}
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />{" "}
                                </svg>
                                Add Comment
                              </button>
                            </form>
                          </div>
                          <div>
                            <button
                              className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
                              onClick={post.onClick}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              View Comments{" "}
                            </button>
                          </div>
                        </div>
                        <div>
                          {post.finalComments &&
                            post.finalComments.map((comment, id) => {
                              if (comment.postId === post.id) {
                                return (
                                  <Comment {...comment} key={id}></Comment>
                                );
                              }
                            })}
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

export default React.memo(Post);
