import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import Heart from "react-heart";

import DeleteMessage from "../../DeleteMessage/DeleteMessage";
import Comment from "../Comment/Comment";
import Avatar from "../../Avatar/Avatar";

import { ToastContext } from "../../../contexts/ToastContext";
import { updateUserComments } from "../../../redux/user-comments/actionCreator";
import {
  updateUserPost,
  deleteUserPost,
} from "../../../redux/posts/actionCreator";
import { ReactComponent as AddIcon } from "./../../../assets/svgs/add-icon.svg";
import { ReactComponent as ViewIcon } from "./../../../assets/svgs/view-icon.svg";
import { ReactComponent as CurveIcon } from "./../../../assets/svgs/curve-icon.svg";
import { ReactComponent as DeleteIcon } from "./../../../assets/svgs/delete-icon.svg";

const Post = (post) => {
  const toast = useContext(ToastContext);
  const userCommentInput = useRef();
  const usersData = useSelector((state) => state.Users);
  const [like, setLike] = useState(false);
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
    if (userCommentInput.current.value !== "") {
      e.preventDefault();
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
      const updatedCommentsJSON = JSON.stringify(existingComments);
      localStorage.setItem("comments", updatedCommentsJSON);
      dispatch(updateUserPost(newPost));
      dispatch(updateUserComments(newComments));
      userCommentInput.current.value = "";
      toast.success("Success: Comment added successfully!");
    } else {
      toast.error("Alert: Please enter comment");
    }
  };
  const deletePost = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteUserPost(post.id));
    toast.success("Success: Post Deleted Successfully");
  };

  const handleOnClickCancel = () => {
    setAlert(false);
  };

  return (
    <div className="w-3/4 m-auto mt-10 ">
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
            <CurveIcon />
          </div>{" "}
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
                    <div
                      className="flex flex-row py-6 px-3 sm:mt-0 ml-24 h-10 mb-14"
                      onClick={deletePost}
                    >
                      <DeleteIcon
                        height="40"
                        width="50"
                        strokeWidth="1.5"
                        className="mr-4 cursor-pointer"
                      />
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
                        <div className="flex xl:flex-row flex-col">
                          <div className="xl:w-9/12 xl:mx-1 xl:my-0 mb-1">
                            <form onSubmit={handleUserComment}>
                              <input
                                className="shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                ref={userCommentInput}
                                required
                                placeholder="Enter your comment"
                              />
                              <button
                                className="xl:mt-0 mt-2 inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-2.5 py-2.5 text-center xl:ml-16 ml-0"
                                onClick={handleUserComment}
                                type="submit"
                              >
                                <AddIcon className="h-5 w-5 mr-2" />
                                Add Comment
                              </button>
                            </form>
                          </div>
                          <div>
                            <button
                              className="mt-auto xl:ml-0 ml-4 mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-2.5 py-2.5 text-center "
                              onClick={post.onClick}
                            >
                              <ViewIcon />
                              View Comments{" "}
                            </button>
                          </div>
                        </div>
                        <div>
                          {post.finalComments &&
                            post.finalComments.map(
                              (comment, id) =>
                                comment.postId === post.id && (
                                  <Comment {...comment} key={id}></Comment>
                                )
                            )}
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
