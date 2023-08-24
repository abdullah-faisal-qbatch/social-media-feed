import React from "react";
import _ from "lodash";

const Avatar = ({ initials, type }) => {
  const PROFILE = "profile";
  const colors = [
    "bg-blueProfessional",
    "bg-indigoProfessional",
    "bg-purpleProfessional",
    "bg-pinkProfessional",
    "bg-redProfessional",
    "bg-orangeProfessional",
    "bg-yellowProfessional",
    "bg-greenProfessional",
    // "bg-tealProfessional",
    "bg-cyanProfessional",
  ];
  const avatarStyle = {
    width: type === PROFILE ? "150px" : "80px",
    height: type === PROFILE ? "150px" : "80px",
    fontSize: type === PROFILE ? "48px" : "36px",
  };

  return (
    <div
      className={`flex justify-center items-center font-bold uppercase rounded-full text-white ${_.sample(
        colors
      )}`}
      style={avatarStyle}
    >
      {initials}
    </div>
  );
};

export default React.memo(Avatar);
