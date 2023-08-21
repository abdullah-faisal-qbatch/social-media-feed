import React from "react";
import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex flex-col ml-60 mt-60 text-center">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
