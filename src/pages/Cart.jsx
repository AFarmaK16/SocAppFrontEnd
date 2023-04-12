import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import PageHero from '../layout/PageHero';
import CartContent from '../components/cart/CartContent';
import CartEmpty from '../components/cart/CartEmpty';


const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: { duration: .3 }
    },
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' }
    }
};


const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
  // console.log(
  //   "%c Current cart content " + JSON.stringify(cart),
  //   "color: cyan"
  // );
  // console.log("%c " + Object.getOwnPropertyNames(cart).length, "color: yellow");
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <PageHero title='Panier' />
            <div className='w-[90%] mx-auto'>
                {cart.length < 1 && <CartEmpty />}
                {cart.length > 0 && <CartContent cart={cart} totalPrice={totalPrice} />}
            </div>
        </motion.div>
    );
};

export default Cart;