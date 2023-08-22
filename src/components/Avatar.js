import React from "react";

const Avatar = ({ initials, type }) => {
  // Style for the avatar container
  const PROFILE = "profile";
  const avatarStyle = {
    backgroundColor: "blue",
    width: type === PROFILE ? "150px" : "100px", // Adjust the width to make the avatar larger
    height: type === PROFILE ? "150px" : "100px", // Adjust the height to make the avatar larger

    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: type === PROFILE ? "48px" : "36px",
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  return <div style={avatarStyle}>{initials}</div>;
};

export default Avatar;
