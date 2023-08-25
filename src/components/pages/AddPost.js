import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../redux/posts/actionCreator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slackError from "../../utils/SlackError";
import { useNavigate } from "react-router-dom";

const AddPost = (props) => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const usersData = useSelector((state) => state.Users);
  const posts = useSelector((state) => state.Posts);
  const { currentUser } = usersData;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  const handleSubmit = (e) => {
    if (titleRef.current.value !== "" && bodyRef.current.value !== "") {
      e.preventDefault();
      const existingPostsJSON = localStorage.getItem("posts");
      const existingPosts = existingPostsJSON
        ? JSON.parse(existingPostsJSON)
        : [];

      const maxId = posts.posts.reduce(
        (acc, { id }) => (id > acc ? id : acc),
        0
      );

      const newPost = {
        id: maxId + existingPosts.length + 1,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        userId: currentUser.id,
        comments: [],
        reactions: 0,
        tags: [],
      };
      existingPosts.push(newPost);
      const updatedPostsJSON = JSON.stringify(existingPosts);
      localStorage.setItem("posts", updatedPostsJSON);
      toast("Success: Post Added Successfully");
      navigate("/my-posts");
      var raw = `{"text": "New Post have been added"}`;
      slackError(raw);
      titleRef.current.value = "";
      bodyRef.current.value = "";
    } else {
      toast("Error: Please enter both title and post");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-28">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {props.value === "edit" ? (
              <h1 className="text-2xl font-bold mb-4">Edit Post:</h1>
            ) : (
              <h1 className="text-2xl font-bold mb-4">Create Post:</h1>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title:
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Post:
              </label>
              <input
                id="body"
                type="text"
                ref={bodyRef}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter new Post"
              />
            </div>
            <div className="flex items-center justify-between text-center">
              <button
                className=" mt-auto mb-auto inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center mr-2 mb-20 ml-20"
                type="submit"
                onClick={handleSubmit}
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
                {props.value === "edit" ? <>Update Post</> : <>Add Post</>}
              </button>
              <ToastContainer></ToastContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddPost);
