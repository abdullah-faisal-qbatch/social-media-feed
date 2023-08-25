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
        <div className="w-full bg-white-400 max-w-sm my-1 text-center border-[1px] shadow-lg border-white rounded-lg bg-gray-200 ">
          <div className="flex flex-col items-center py-10 ">
            <Avatar
              initials={firstName[0] + lastName[0]}
              type="user-feed"
              size="sm"
            />
            <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-black">
              {firstName + " " + lastName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {gender.toUpperCase()}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className=" mt-auto mb-auto inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blueProfessional dark:focus:ring-blueProfessional font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-20"
                type="button"
                onClick={deleteUser}
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
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
              <button
                className=" mt-auto mb-auto inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center mr-2 mb-20"
                onClick={handleNavigate}
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
                View Posts{" "}
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
