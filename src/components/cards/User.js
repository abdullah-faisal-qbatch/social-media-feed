import React from "react";
import "./../../styles/User.css"; // Import the CSS file for styling
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteAUser } from "../../redux/users/actionCreator";

const User = ({ id, firstName, lastName, gender, onClick }) => {
  const dispatch = useDispatch();
  // console.log("user id: ", id);
  const deleteUser = () => {
    dispatch(deleteAUser(id));
    // console.log("again");
  };

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{firstName[0] + lastName[0]}</span>
          <div>
            <div className="card-name">{firstName + " " + lastName}</div>
            <div className="card-name">{gender}</div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={deleteUser}>Delete User</button>
        <NavLink to="/posts-feed/user">
          <button>View User Posts</button>
        </NavLink>
      </div>
    </div>
  );
};

export default User;
