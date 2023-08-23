import React from "react";
import { useDispatch } from "react-redux";
import { deleteAUser } from "../../redux/users/actionCreator";
import { useState } from "react";
import DeleteMessage from "../DeleteMessage";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { ToastContainer, toast } from "react-toastify";

const User = ({ id, firstName, lastName, gender }) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteAUser(id));
    toast("Success: User deleted Successfully!");
  };
  const handleOnClickCancel = () => {
    setAlert(false);
  };

  const handleNavigate = () => {
    navigate(`/posts-feed/user?userid=${id}`);
  };

  return (
    <div>
      <ToastContainer></ToastContainer>

      <div className="flex justify-center">
        <div className="w-full max-w-sm my-1 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10 pt-10">
            <Avatar
              initials={firstName[0] + lastName[0]}
              type="user-feed"
              size="sm"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {firstName + " " + lastName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {gender.toUpperCase()}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={deleteUser}
              >
                Delete User
              </button>
              <button
                onClick={handleNavigate}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                View User Posts
              </button>
            </div>
          </div>
        </div>
      </div>
      {alert && (
        <DeleteMessage
          onClickDelete={handleOnClickDelete}
          onClickCancel={handleOnClickCancel}
        ></DeleteMessage>
      )}
    </div>
  );
};

export default React.memo(User);
