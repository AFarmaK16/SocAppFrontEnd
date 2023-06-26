import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import PageHero from "../layout/PageHero";
import CartContent from "../components/cart/CartContent";
import CartEmpty from "../components/cart/CartEmpty";

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

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
    const deliveryForm = useSelector(
      (state) => state.shippingForm.isDeliveryFormSubmitted
    );
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const [formData, setFormData] = useState({
    delivery_address: null,
    delivery_destination: null,
    delivery_comment: null,
    isRendu: null,
    isDecharged: null,
  });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [deliveryData, setDeliveryData] = useState({
      delivery_address: null,
      delivery_destination: null,
      delivery_comment: null,
      isRendu: null,
      isDecharged: null,
    });
    console.log(deliveryData);
    const handleDelivery = (event) => {
      event.preventDefault();
      setIsFormSubmitted(true);
    };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the action to add the order with the form data
    // dispatch(addOrder(formData));
    setIsFormSubmitted(true);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title="Panier" />
      <div className="w-[90%] mx-auto">
        {/* Cart is empty */}
        {cart.length < 1 && <CartEmpty />}
{/* Cart not empty */}
        {cart.length > 0 && (
          <CartContent
            cart={cart}
            totalPrice={totalPrice}
            totalQuantity={quantity}
            deliveryData={deliveryData}
            setDeliveryData={setDeliveryData}
            handleSubmit={handleDelivery}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
