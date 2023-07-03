import React, { useEffect } from "react";
import OrdersList from "../components/orders/OrdersList";



const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Orders = (props) => {

  return (
    <div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className=" mx-auto">

        <OrdersList {...props}/>
      </div>
    </div>
  );
};

export default Orders;
