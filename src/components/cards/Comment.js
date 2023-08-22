import React from "react";
import "./../../styles/Comment.css";

const Comment = ({ body, user, onClick }) => {
  return (
    <div
      className="rounded-lg border ml-10 border-gray-300 p-4 m-4 w-80 mx-auto md:w-4/5 rounded-lg shadow-sm bg-white transition duration-300 transform hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">
            {" "}
            {user.firstname?.[0].toUpperCase() +
              user.lastname?.[0].toUpperCase()}
          </span>
          <div>
            <div className="card-name">
              {user.firstname + " " + user.lastname}
            </div>
            <div>{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
