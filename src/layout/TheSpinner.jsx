import React from "react";
import soc_logo from "../assets/soc_logo.png";
// import product_img from "../assets/cemiib-ll32-5rce.jpg";

const TheSpinner = () => {
  return (
    <div className="w-full py-20 mx-auto">
      <div className="w-20 h-20 rounded-full mx-auto border-2 border-solid border-[#f3f3f3] border-t-2 border-t-[#1cee2d] animate-spin">
        <img src={soc_logo} />
      </div>
    </div>
  );
};

export default TheSpinner;
