import React from "react";

const DeleteConfirmation = ({ onClickDelete, onClickCancel }) => {
  return (
    <div
      id="confirmation-alert"
      className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <div className="ml-20">
            <button
              onClick={onClickDelete}
              className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={onClickCancel}
              className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
