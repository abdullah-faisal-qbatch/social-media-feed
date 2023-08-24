import React from "react";

const Alert = ({ title, message, onClickTitle }) => {
  return (
    <div
      style={{
        height: "56vh",
      }}
    >
      <section
        className="bg-yellow-100 mt-4 ml-4 mr-4 border border-yellow-700 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">{title}</strong>
        <span className="block sm:inline">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-yellow-700"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          ></svg>
        </span>
      </section>
    </div>
  );
};

export default React.memo(Alert);
