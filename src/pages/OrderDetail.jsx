import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../layout/PageHero";
import { formatPrice } from "../utils/helpers";
import TheSpinner from "../layout/TheSpinner";
import { getOrdersById } from "../store/actions/oder-action";

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

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.orderDetailLoading);

  useEffect(() => {
    dispatch(getOrdersById(orderId));
  }, [dispatch, orderId]);

  const order = useSelector((state) => state.orders.ordersDetails);
  // console.log(order)

  // const { idAccount, login, password, role, dateOuverture, userRefID } = account;

  const {
    order_id,
    order_Date,
    order_Amount,
    order_status,
    deliverRef,
    customerRef,
    customer,
    facture,
    orderItems,
  } = order;
  // const { id, quantity, product } = order.orderItems;
  console.log("ORDER ITEM");
  console.log(orderItems);
  // const {
  //   product_id,
  //   product_price,
  //   product_label,
  //   product_type,
  //   product_description,
  //   product_image,
  // } = product;
  // const { facture_id, justificatif, payment_date, paymentStatus } = facture;
  // const {
  //   customerID,
  //   customerFirstName,
  //   customerLastName,
  //   customerAddress,
  //   customerPhoneNumber,
  //   account
  // } = customer;
  // console.log(order)
  return (
    <motion.div
      className="mb-48"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title={order_id} order />
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
            {/* <ProductImages order_image={order_image} /> */}
            <h1>ivosff</h1>
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
                {/* <p className="text-lg font-semibold text-secondary-100 tracking-widest italic my-4"> */}
                <b>Montant TTC </b> {formatPrice(order_Amount)}
              </p>
              <hr className="my-6" />
              <p className="text-lg  tracking-wider text-gray-600">
                {/* <p className="max-w-3xl tracking-wider leading-8 text-gray-500 mb-6"> */}
                <b> Domaines d’utilisation :</b>
              </p>
              <ul>
                <li>ded</li>
                <li>dede</li>
                <li>dedeee</li>
                <li>{orderItems.length}</li>
              </ul>
              <div>
                {orderItems.map((item) => {
                  <div key={item.id}>wepfepuep
                    <div>{item.quantity}</div>
                    <div>{item.product}</div>
                  </div>;
                })}
              </div>
              <hr className="my-6" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderDetails;
