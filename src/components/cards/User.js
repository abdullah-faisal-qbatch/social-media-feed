import React from "react";
import "./../../styles/User.css"; // Import the CSS file for styling

const User = ({ firstName, lastName, gender }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{firstName[0] + lastName[0]}</span>
          <div>
            <div className="card-name">{firstName + " " + lastName}</div>
            <div className="card-name">Gender: {gender}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
