import React, { useState } from "react";
import Heart from "react-heart";

const HeartComponent = () => {
  const [active, setActive] = useState(false);
  return (
    <div>
      <Heart
        className="w-8"
        isActive={active}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};
export default HeartComponent;
