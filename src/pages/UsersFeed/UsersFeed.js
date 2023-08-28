import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import User from "../../components/cards/User/User";
import Alert from "../../components/Alert/Alert";
import Pagination from "../../components/Pagination/Pagination";

import {
  fetchUsers,
  searchAllUsers,
  reInitializeUsers,
} from "../../redux/users/actionCreator";
import { fetchPosts } from "../../redux/posts/actionCreator";

const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
const limit = 10;
const UsersFeed = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const { users, success } = useSelector((state) => state.Users);
  const posts = useSelector((state) => state.Posts);
  const [page, onPageChange] = useState(1);
  useEffect(() => {
    dispatch(fetchUsers(limit, page * limit - limit));
  }, [dispatch, page]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(reInitializeUsers());
    }
  }, [success]);

  useEffect(() => {
    if (posts.success) {
      toast.success(posts.success);
      dispatch(reInitializeUsers());
    }
  }, [posts.success]);

  const handleOnClick = (userId) => {
    //update posts according to user Id
    dispatch(fetchPosts(userId));
  };
  const updateDebounceText = debounce((text) => {
    searchRef.current.value = text;
    dispatch(searchAllUsers(text));
    if (text === "") {
      dispatch(fetchUsers(limit, page * limit - limit));
    }
  });
  return (
    <>
      <div className="flex justify-center w-full mt-4">
        <input
          type="search"
          id="default-search"
          className="w-1/3 block lg:w-1/4 p-4 text-center pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Search Users"
          ref={searchRef}
          onChange={(event) => updateDebounceText(event.target.value)}
        ></input>
      </div>
      <div className="grid grid-cols-1 gap-2 mx-2 mt-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users &&
          users.map((user) => (
            <User
              key={user.id}
              {...user}
              onClick={() => handleOnClick(user.id)}
            />
          ))}
        {!users.length && <Alert title="Alert: " message="No users exist!" />}
      </div>
      <div>
        <Pagination
          currentPage={page}
          onPageChange={onPageChange}
          totalPages={10}
        />
      </div>
    </>
  );
};

export default UsersFeed;
