import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, searchAllUsers } from "../../redux/users/actionCreator";
import { fetchAllPosts } from "../../redux/posts/actionCreator";
import User from "../cards/User";
import Alert from "../Alert";
import { useRef } from "react";
const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const UsersFeed = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const searchRef = useRef();
  const { users } = usersData;
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleOnClick = (userId) => {
    //update posts according to user Id
    dispatch(fetchAllPosts(userId));
  };
  const updateDebounceText = debounce((text) => {
    searchRef.current.value = text;
    dispatch(searchAllUsers(text));
    if (text === "") {
      dispatch(fetchAllUsers());
    }
  });
  return (
    <>
      <div className="flex justify-center w-full mt-4">
        <input
          type="search"
          id="default-search"
          className="block w-1/4 p-4 text-center pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Search Users"
          ref={searchRef}
          onChange={(event) => updateDebounceText(event.target.value)}
        ></input>
      </div>
      <div className="grid grid-cols-4 gap-4 ml-4 mr-4 mt-3">
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
        {!users.length && <Alert title="Alert: " message="No users exist!" />}
      </div>
    </>
  );
};

export default UsersFeed;
