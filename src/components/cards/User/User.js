import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ToastContext } from "../../../contexts/ToastContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import DeleteMessage from "../../DeleteMessage/DeleteMessage";
import Avatar from "../../Avatar/Avatar";

import { deleteAUser } from "../../../redux/users/actionCreator";
import { ReactComponent as DeleteIcon } from "./../../../assets/svgs/delete-icon.svg";
import { ReactComponent as ViewIcon } from "./../../../assets/svgs/view-icon.svg";

const User = ({ id, firstName, lastName, gender }) => {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteAUser(id));
    toast.success("Success: User deleted Successfully!");
  };
  const handleOnClickCancel = () => {
    setAlert(false);
  };

  const handleNavigate = () => {
    navigate(`/posts-feed/user?userid=${id}`);
  };

  return (
    <>
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
                className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={deleteUser}
              >
                <DeleteIcon className="h-5 w-5 mr-2" />
                Delete
              </button>
              <button
                className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                onClick={handleNavigate}
              >
                <ViewIcon />
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
    </>
  );
};

export default React.memo(User);
