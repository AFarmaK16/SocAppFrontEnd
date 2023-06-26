import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import PageHero from "../layout/PageHero";
import CheckoutContent from "../components/cart/CheckoutContent";
import CartEmpty from "../components/cart/CartEmpty";
import CartContent from "../components/cart/CartContent";
import { Navigate } from "react-router-dom";

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

const Checkout = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cart = useSelector((state) => state.cart.items);
  const deliveryForm = useSelector(
    (state) => state.shippingForm.isDeliveryFormSubmitted
  );
  // console.log(deliveryForm);

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const { name } = "Farma";
  // const { name } = useSelector((state) => state.auth.user);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title="Valider Commande" />
      <div className="w-[80%] mx-auto mb-40 mt-24">
        {/* {cart.length < 1 && <CartEmpty />} */}
        {/* {cart.length > 0 && deliveryForm ? (
          <CheckoutContent totalPrice={totalPrice} name={name} />
        ) : cart.length < 1 ? (
          <CartEmpty />
        ) : (
          <CartContent
            message="Vous devez d'abord valider la commande"
            cart={cart}
            totalPrice={totalPrice}
            totalQuantity={quantity}
            deliveryData={null}
            setDeliveryData={null}
            handleSubmit={null}
          />
        )} */}
        {/* Cart is  not  empty and deliveryForm is true */}
        {cart.length > 0 && deliveryForm ? (
          <CheckoutContent totalPrice={totalPrice} name={name} />
        ) : cart.length > 0 && !deliveryForm ? (
          // <Navigate to="/cart" replace />
          <CartContent
            message="Vous devez d'abord valider la commande"
            cart={cart}
            totalPrice={totalPrice}
            totalQuantity={quantity}
            deliveryData={null}
            setDeliveryData={null}
            handleSubmit={null}
          />
        ) : (
          <CartEmpty />
        )}
        {/* Cart is  not  empty and deliveryForm is false */}
      </div>
    </motion.div>
  );
};

export default Checkout;
