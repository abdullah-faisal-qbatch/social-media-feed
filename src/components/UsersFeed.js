import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/users/actionCreator";
import { fetchUserPost } from "../redux/posts/actionCreator";
import User from "./cards/User";
const UsersFeed = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const { users } = usersData;
  const posts = useSelector((state) => state.Posts);
  // console.log("Final Users: ", usersData);
  // console.log("Users array: ", users);
  // console.log("Current User: ", currentUser);
  console.log("Posts rendered: ", posts);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleOnClick = (userId) => {
    console.log(`Clicked on userID :${userId}`);
    dispatch(fetchUserPost(userId));
    //update posts according to user Id
  };
  return (
    <>
      {users &&
        users
          .slice(0, 10)
          .map((user) => (
            <User
              key={user.id}
              {...user}
              onClick={() => handleOnClick(user.id)}
            />
          ))}
    </>
  );
};

export default UsersFeed;
