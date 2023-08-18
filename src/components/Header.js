import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <li>
            <NavLink to="/posts-feed">Posts Feed</NavLink>
          </li>
          <li>
            <NavLink to="/users-feed">Users Feed</NavLink>
          </li>
          {/* /posts-feed/user */}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
