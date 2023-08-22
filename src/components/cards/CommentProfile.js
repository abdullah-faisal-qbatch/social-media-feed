import React from "react";
import Avatar from "../Avatar";

const CommentProfile = ({ body, user, onClick }) => {
  return (
    <div
      className="mt-4 rounded-xl sm:p-5 dark:bg-gray-900 dark:text-gray-100"
      onClick={onClick}
    >
      <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-4 md:flex-row">
        <Avatar
          initials={
            user.firstname?.[0].toUpperCase() + user.lastname?.[0].toUpperCase()
          }
          type="user"
          size="sm" // You can add a size prop to Avatar component if needed
        />
        <div className="flex flex-col">
          <h4 className="text-base mt-6 font-semibold md:text-left">
            {user.firstname + " " + user.lastname}
          </h4>
          <p className="dark:text-gray-400 text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentProfile;
