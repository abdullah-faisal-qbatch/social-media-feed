import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Alert from "../Alert";
import { fetchAllPosts } from "../../redux/posts/actionCreator";

const AddPost = (props) => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const usersData = useSelector((state) => state.Users);
  const posts = useSelector((state) => state.Posts);
  const [postAdded, setPostAdded] = useState(false);
  const { currentUser } = usersData;

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPostsJSON = localStorage.getItem("posts");
    const existingPosts = existingPostsJSON
      ? JSON.parse(existingPostsJSON)
      : [];
    const newPost = {
      id: posts.posts.length + existingPosts.length + 4,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      userId: currentUser.id,
      comments: [],
      finalComments: [],
      reactions: 0,
      tags: [],
    };
    console.log("Your new post: ", newPost);
    existingPosts.push(newPost);
    const updatedPostsJSON = JSON.stringify(existingPosts);
    localStorage.setItem("posts", updatedPostsJSON);
    setPostAdded(true);
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };
  return (
    <div>
      {postAdded && (
        <Alert
          title="Success: "
          message="Post added successfully!"
          onClickTitle={() => setPostAdded(!alert)}
        ></Alert>
      )}
      <div className="flex justify-center items-center mt-28">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {props.value === "edit" ? (
              <h1 className="text-2xl font-bold mb-4">Edit Post:</h1>
            ) : (
              <h1 className="text-2xl font-bold mb-4">Add Post:</h1>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                ref={titleRef}
                required
                placeholder="Enter new Title"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Body
              </label>
              <textarea
                id="body"
                ref={bodyRef}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex items-center justify-between text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                {props.value === "edit" ? <>Update Post</> : <>Add Post</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddPost);
