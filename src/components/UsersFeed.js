import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/users/actionCreator";
import { fetchAllPosts } from "../redux/posts/actionCreator";
import User from "./cards/User";
const UsersFeed = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const { users } = usersData;
  const posts = useSelector((state) => state.Posts);
  console.log("Posts rendered: ", posts);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleOnClick = (userId) => {
    //update posts according to user Id
    console.log(`Clicked on userID :${userId}`);
    console.log("User id: ", userId);
    dispatch(fetchAllPosts(userId));
  };
  return (
    <>
      {users &&
        users
          // .slice(0, 10)
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
