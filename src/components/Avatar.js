import React from "react";

const Avatar = ({ initials, type }) => {
  const PROFILE = "profile";
  const avatarStyle = {
    backgroundColor: "#ec4899",
    width: type === PROFILE ? "150px" : "80px",
    height: type === PROFILE ? "150px" : "80px",
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

export default React.memo(Avatar);
