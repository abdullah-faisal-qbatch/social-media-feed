import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/users/actionCreator";
import User from "./cards/User";
const UsersFeed = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const { currentUser } = usersData;
  const { users } = usersData.users;
  console.log("Final Users: ", usersData);
  console.log("Users array: ", users);
  console.log("Current User: ", currentUser);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return <>{users && users.map((user) => <User key={user.id} {...user} />)}</>;
};

export default UsersFeed;
