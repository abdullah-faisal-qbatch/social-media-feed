import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
// import "./../styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        visible={true}
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default Spinner;
