import React, { useEffect } from "react";

import PageHero from "../layout/PageHero";
import OrdersList from "../components/orders/OrdersList";
import { motion } from "framer-motion";
import { getOrders } from "../store/actions/oder-action";
import { useDispatch, useSelector } from "react-redux";


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

const Orders = () => {
  const dispatchOrders = useDispatch();
  useEffect(() => {
    dispatchOrders(getOrders());
  }, [dispatchOrders]);

  const orders = useSelector((state) => state.orders.filteredOrders);
  let count = 0;
  for (const order in orders) {
    if (orders[order].order_status === "ATTENTE") {
      count++;
    }
  }
  return (
    <div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title="Commandes" alert={count} />
      <div className=" mx-auto">
        <OrdersList />
      </div>
    </div>
  );
};

export default Orders;
