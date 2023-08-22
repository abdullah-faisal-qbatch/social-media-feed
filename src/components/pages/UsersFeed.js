import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, searchAllUsers } from "../../redux/users/actionCreator";
import { fetchAllPosts } from "../../redux/posts/actionCreator";
import User from "../cards/User";
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
  const updateDebounceText = debounce((text) => {
    searchRef.current.value = text;
    dispatch(searchAllUsers(text));
    if (text === "") {
      dispatch(fetchAllUsers());
    }
  });
  return (
    <>
      <div className="flex justify-center w-full mt-1">
        <input
          type="search"
          id="default-search"
          className="block w-1/4 p-4 text-center pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Users"
          ref={searchRef}
          onChange={(event) => updateDebounceText(event.target.value)}
        ></input>
      </div>
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
