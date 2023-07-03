import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../layout/PageHero";
import { formatPrice } from "../utils/helpers";
import TheSpinner from "../layout/TheSpinner";
import { getOrdersById } from "../store/actions/oder-action";
import { getProductDetails } from "../store/actions/products-actions";

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

const OrderDetail = () => {
  const token = localStorage.getItem("token");
  const { orderId } = useParams();
  const dispatchOrders = useDispatch();
  const loading = useSelector((state) => state.ui.orderDetailLoading);

  useEffect(() => {
    dispatchOrders(getOrdersById(orderId, token));
  }, [dispatchOrders, orderId]);

  // const product = useSelector((state) => state.products.productDetails);
  const order = useSelector((state) => state.orders.orderDetails);

  console.log(order);

  const {
    order_id,
    order_Date,
    order_Amount,
    order_status,
    deliverRef,
    customerRef,
    customer,
    facture,
    // orderItems,
  } = order;


  const nbTonnes = 0;

  return (
    <div>
      {order === undefined ? (
        <TheSpinner />
      ) : (
        <motion.div
          className="mb-48"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <PageHero title={"Commande #" + order.order_id} order />
          <div className="mt-16 space-y-16 w-[80vw] mx-auto">
            <Link
              to="/orders"
              className="uppercase bg-primary px-4 py-2 rounded text-white font-semibold shadow-lg"
            >
              Retour
            </Link>
            {loading ? (
              <TheSpinner />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <h1>CUSTOMER INFORMATION</h1>
                <hr />
                <div>
                  <h1>hey</h1>
                  <div>{customer.name}</div>
                  <div>{customer.surname}</div>
                  <div>{customer.address}</div>
                  <div>{customer.phoneNumber}</div>
                
                </div>

                <div>
                  <h2 className="font-bold text-5xl tracking-wide mb-5">
                    {order_Amount}
                  </h2>
                  <p className="text-lg  tracking-wider text-gray-600">
                    <b> Order ID:</b> {order_id}
                  </p>
                  <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 space-y-5">
                    <div className=" ">
                      <p className="text-lg  tracking-wider text-gray-600">
                        <b>Reférence :</b>
                        {order_status}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg  tracking-wider text-gray-600">
                    <b>Montant TTC </b> {formatPrice(order_Amount)}
                  </p>
                  <p className="text-lg  tracking-wider text-gray-600">
                  </p>

                  <hr className="my-6" />
                  <p className="text-lg  tracking-wider text-gray-600">
                    <b> Details Commandes:</b>
                  </p>
                  <hr />
                
                  <p className="text-lg  tracking-wider text-gray-600">
                    <b>Nombre total de tonnes: </b> {nbTonnes}
                  </p>
                  <hr />
                  <hr className="my-6" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrderDetail;
