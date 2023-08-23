import React from "react";

const Avatar = ({ initials, type }) => {
  const PROFILE = "profile";
  const avatarStyle = {
    backgroundColor: "#139df2",
    width: type === PROFILE ? "150px" : "80px", // Adjust the width to make the avatar larger
    height: type === PROFILE ? "150px" : "80px", // Adjust the height to make the avatar larger
    fontSize: type === PROFILE ? "48px" : "36px",
  };

  return (
    <div
      className="flex justify-center items-center font-bold uppercase rounded-full text-white"
      style={avatarStyle}
    >
      {initials}
    </div>
  );
};

export default Avatar;
