import React from "react";
import loader from "../spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loader} alt="spinner" />
    </div>
  );
};

export default Spinner;
