import React from "react";
import { useLocation } from "react-router-dom";

const Selected = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h2>
        Year:{location.state.year}, Make:{location.state.make}, Model:
        {location.state.model}, Sub-Model: {location.state.submodel}, Engine:
        {location.state.engine}
      </h2>
    </div>
  );
};

export default Selected;
