import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProductImages from "../components/productDetail/ProductImages";
import Stars from "../components/productDetail/Stars";
import PageHero from "../layout/PageHero";
import AddToCart from "../components/productDetail/AddToCart";
import { getProductDetails } from "../store/actions/products-actions";
import { formatPrice } from "../utils/helpers";
import TheSpinner from "../layout/TheSpinner";
// -----------------JUST FOR TEST PURPOSE
import product_img from "../assets/cemiib-ll32-5rce.jpg";
import {
  getCustomerOrdersById,
  getOrders,
  getOrdersById,
} from "../store/actions/oder-action";
import { Col, Row } from "reactstrap";

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
const CustomerOrderDetail = () => {
  const { customerId } = useParams();
  const { orderId } = useParams();
  const dispatchOrders = useDispatch();
  const loading = useSelector((state) => state.ui.orderDetailLoading);

  const payload = {
    customerId: customerId,
    orderId: orderId,
  };
  const [order, setOrder] = useState();
  // useEffect(() => {
  //   dispatchOrders(getCustomerOrdersById(payload));
  // }, [dispatchOrders, payload]);
  const x = getCustomerOrdersById(payload);
  console.log(JSON.stringify(x));
  //  const order=useSelector((state) => state.orders.customerOrderDetails.map(order =>({
  //     order_id :       order_id ,
  //     order_Date :       order_Date ,
  //     order_Amount :       order_Amount ,
  //     order_status :       order_status ,
  //     deliverRef :       deliverRef ,
  //     customerRef :       customerRef ,
  //     customer :       customer ,
  //     facture :       facture ,
  //     orderItems :       orderItems ,
  //   }
  //  )));
  // //    console.log(orders);
  //    console.log(order);

  // const {
  //   order_id,
  //   order_Date,
  //   order_Amount,
  //   order_status,
  //   deliverRef,
  //   customerRef,
  //   customer,
  //   facture,
  //   orderItems,
  // } = order;

  // const {
  //   order_id,
  //   order_Date,
  //   order_Amount,
  //   order_status,
  //   deliverRef,
  //   customerRef,
  //   customer,
  //   facture,
  //   orderItems,
  // } = orders;
  // const { id, quantity, product } = order.orderItems;

  const nbTonnes = 0;
  // <CardBody >
  {
    /* <div className="relative rounded-md">
                     <Link
                  to={`/orders/${order_id}`}
                  className="flex items-center justify-center absolute bg-[#222] w-full h-[175px] rounded-md opacity-0 hover:opacity-70 transition-all duration-300"
                >
                  <span className="flex items-center justify-center bg-secondary-100 w-10 h-10 rounded-full">
                    <FaSearch />
                  </span>
                </Link> 
                  </div>*/
  }
  // const { id, justificatif, payment_date, paymentStatus } = facture;
  // const {
  //   customerID,
  //   name,
  //   surname,
  //   address,
  //   phoneNumber,
  //   account
  // } = customer;
  //   const formattedDate = new Date(order_Date);
  return (
    <div>
      <motion.div
        className="mb-48"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PageHero title={"Commande #" + orderId} order />
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
              <h1>CUSTOMER INFORMATION</h1>
              <hr />
              {/* <div>
                    <div key={orders.customer.customerID}>
                      {orders.customer.customerID}
                    </div>
                    <div>{orders.customer.name}</div>
                    <div>{orders.customer.surname}</div>
                    <div>{orders.customer.address}</div>
                    <div>{orders.customer.phoneNumber}</div>
                  </div> */}

              <div>
                <h2 className="font-bold text-5xl tracking-wide mb-5">
                  {/* {order_Amount} */}
                </h2>
                <p className="text-lg  tracking-wider text-gray-600">
                  <b> Order ID:</b>
                  {/* {order_id} */}
                </p>
                <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 space-y-5">
                  <div className=" ">
                    <p className="text-lg  tracking-wider text-gray-600">
                      <b>Reférence :</b>
                      {/* {order_status} */}
                    </p>
                  </div>
                </div>
                <p className="text-lg  tracking-wider text-gray-600">
                  {/* <p className="text-lg font-semibold text-secondary-100 tracking-widest italic my-4"> */}
                  <b>Montant TTC </b>
                  {/* {formatPrice(order_Amount)} */}
                </p>
                <p className="text-lg  tracking-wider text-gray-600">
                  {/* <p className="text-lg font-semibold text-secondary-100 tracking-widest italic my-4"> */}
                  <b>Nombre de produits: </b>
                  {/* {orderItems.length} */}
                </p>

                <hr className="my-6" />
                <p className="text-lg  tracking-wider text-gray-600">
                  {/* <p className="max-w-3xl tracking-wider leading-8 text-gray-500 mb-6"> */}
                  <b> Details Commandes:</b>
                </p>
                <hr />
                <div>
                  {/* {console.log(orders.orderItems)} */}
                  {/* {orderItems.map((item) => {
                  nbTonnes += item.quantity;
                  return (
                    <ol key={item.id}>
                      <h1>{item.product.product_label}</h1>
                      <li>{item.product.product_price}</li>
                      <li>Quantity: {item.quantity}</li>
                      <li>{item.product.product_type}</li>
                      <li>{item.product.product_description}</li>
                      <li>{item.product.product_imag}</li>
                    </ol>
                  );
                })} */}
                </div>
                <p className="text-lg  tracking-wider text-gray-600">
                  <b>Nombre total de tonnes: </b> {nbTonnes}
                </p>
                <hr />
                <hr className="my-6" />
              </div>
            </div>
          )}
        </div>{" "}
      </motion.div>
      );
    </div>
  );
};

export default CustomerOrderDetail;
