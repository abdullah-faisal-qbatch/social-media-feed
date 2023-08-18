import React, { useEffect } from "react";
import "./../../styles/Comment.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/users/actionCreator";

const Comment = ({ body, user, onClick }) => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const { users } = usersData.users;
  console.log("end user: ", usersData);

  useEffect(() => {
    // dispatch(fetchUser(user.id));
  }, []);
  return (
    <div
      className="card"
      style={{
        marginLeft: "45px",
      }}
      onClick={onClick}
    >
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">
            {" "}
            {user.username[0].toUpperCase() +
              user.username[user.username.length - 1].toUpperCase()}
          </span>
          <div>
            <div className="card-name">{user.username}</div>
            <div className="card-name">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
