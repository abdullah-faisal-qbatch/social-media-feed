import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AddPost = (props) => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const usersData = useSelector((state) => state.Users);
  const posts = useSelector((state) => state.Posts);
  const { currentUser } = usersData;
  const location = useLocation();
  let post;
  if (props.value === "edit") {
    console.log("in edit");
    console.log(location.state);
    post = location.state;
  }

  // console.log("I GOT VALUE FROM DIFFERENT:", value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.value === "edit") {
      //changed
      const newPost = {
        ...post,
        title: titleRef.current.value,
        body: bodyRef.current.value,
      };
      console.log("Your new post: ", newPost);
      const existingPostsJSON = localStorage.getItem("posts");
      const existingPosts = existingPostsJSON
        ? JSON.parse(existingPostsJSON)
        : [];
      existingPosts.filter((post) => post.id !== newPost.id);
      existingPosts.push(newPost);
      const updatedPostsJSON = JSON.stringify(existingPosts);
      localStorage.setItem("posts", updatedPostsJSON);
      // dispatch(fetchAllPosts());
      alert("Post Added!");
      titleRef.current.value = ""; // Clear input fields after submitting
      bodyRef.current.value = "";
    } else {
      //changed
      const newPost = {
        id: posts.posts.length,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        userId: currentUser.id,
        comments: [],
        reactions: 0,
        tags: [],
      };
      console.log("Your new post: ", newPost);
      const existingPostsJSON = localStorage.getItem("posts");
      const existingPosts = existingPostsJSON
        ? JSON.parse(existingPostsJSON)
        : [];
      existingPosts.push(newPost);
      const updatedPostsJSON = JSON.stringify(existingPosts);
      localStorage.setItem("posts", updatedPostsJSON);
      // dispatch(fetchAllPosts());
      alert("Post Added!");
      titleRef.current.value = ""; // Clear input fields after submitting
      bodyRef.current.value = "";
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div class="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {props.value === "edit" ? (
            <h1 className="text-2xl font-bold mb-4">Edit Post:</h1>
          ) : (
            <h1 className="text-2xl font-bold mb-4">Add Post:</h1>
          )}
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              ref={titleRef}
              required
              placeholder="Enter new Title"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
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
          <div class="flex items-center justify-between text-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              {props.value === "edit" ? <>Update Post</> : <>Add Post</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
