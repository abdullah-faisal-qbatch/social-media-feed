import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./../styles/Header.css";
const Header = () => {
  return (
    <>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="/posts-feed">Posts Feed</NavLink>
          </li>
          <li>
            <NavLink to="/users-feed">Users Feed</NavLink>
          </li>
          <li>
            <NavLink to="/my-posts">My Posts</NavLink>
          </li>
          <li>
            <NavLink to="/add-post">Add Post</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
