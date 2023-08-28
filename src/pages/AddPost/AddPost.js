/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReactComponent as AddIcon } from "../../assets/svgs/add-icon.svg";

import slackNotification from "../../utils/SlackNotification";
import Button from "../../components/Button/Button";

import { fetchPosts, addUserPost } from "../../redux/posts/actionCreator";
import { getDataFromLocalStorage } from "../../redux/posts/api-data";

const validationSchema = Yup.object({
  title: Yup.string().required("*Title is required"),
  post: Yup.string().required("*Post content is required"),
  image: Yup.string().required("*Image is required"),
});

const AddPost = ({ pageLink }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.Posts);
  const { currentUser } = useSelector((state) => state.Users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const existingPosts = getDataFromLocalStorage("posts");
    const maxId = posts.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    const newPost = {
      id: maxId + existingPosts.length + 1,
      title: values.title,
      body: values.post,
      userId: currentUser.id,
      imageURL: values.image,
      alias:
        currentUser.firstName[0].toUpperCase() +
        currentUser.lastName[0].toUpperCase(),
      email: currentUser.email,
      name: currentUser.firstName + " " + currentUser.lastName,
      comments: [],
      reactions: 0,
      tags: [],
    };
    dispatch(addUserPost(newPost));
    existingPosts.push(newPost);
    const updatedPostsJSON = JSON.stringify(existingPosts);
    localStorage.setItem("posts", updatedPostsJSON);
    var raw = `{"text": "New Post have been added"}`;
    slackNotification(raw);
    setSubmitting(false);
    navigate("/my-posts");
  };
  return (
    <div className="flex justify-center items-center mt-28 w-screen">
      <div className="w-full flex justify-center items-center ">
        <Formik
          initialValues={{ title: "", post: "", image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="block text-gray-700 text-2xl font-bold mb-2">
                Create Post:
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Image:
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFieldValue("image", imageUrl);
                    } else {
                      setFieldValue("image", null);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Post:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  id="post"
                  name="post"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="post"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex ml-24 mt-3">
                <Button type="submit">
                  <AddIcon className="h-5 w-5 mr-2" />
                  {pageLink === "edit" ? <>Update Post</> : <>Add Post</>}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default React.memo(AddPost);
