import React from "react";

import { ReactComponent as DeleteIcon } from "../../assets/svgs/delete-icon.svg";
import { ReactComponent as CancelIcon } from "../../assets/svgs/cancel-icon.svg";

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
              <DeleteIcon className="h-5 w-5 mr-2" strokeWidth="2" />
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={onClickCancel}
              className="mt-auto mb-auto inline-flex mr-4 text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            >
              <CancelIcon />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
