import React from "react";

import Avatar from "../Avatar/Avatar";

const Comment = ({ body, user, onClick }) => {
  return (
    <div className="mt-4 rounded-xl sm:p-5 bg-grayColour" onClick={onClick}>
      <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-4 md:flex-row">
        <Avatar
          initials={
            user.firstname?.[0].toUpperCase() + user.lastname?.[0].toUpperCase()
          }
          type="user"
          size="sm"
        />
        <div className="flex flex-col ">
          <h4 className="text-base mt-6 font-semibold md:text-left">
            {user.firstname + " " + user.lastname}
          </h4>
          <p className="text-sm md:text-left">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
