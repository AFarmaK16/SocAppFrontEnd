import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import CartIcon from "./CartIcon";
import { FaCartArrowDown } from 'react-icons/fa';

const NavCartButton = () => {
    const totalQuantity = useSelector((state) =>
      state.cart.totalQuantity.toFixed(2)
    );

    const buttonVariants = {
        hover: {
          scale: 1.1,
          textShadow: "0px 0px 2px #ffffff",
          boxShadow: "0px 0px 4px #243E8B",
          transition: {
            duration: 0.3,
          },
        },
      };
    
    return (
      <motion.button
        className="rounded-3xl font-bold py-2 px-3 shadow-lg text-white  btn bg-green-600"
        variants={buttonVariants}
        whileHover="hover"
      >
        <Link
          to="/customer/c/checkout"
          className="flex justify-between items-center"
        >
          {/* <span className="w-[1.35rem] h-[1.35rem] mr-2"> */}
          <span className="w-4 h-2 mr-2">
            <CartIcon color="#E7B84E" />
            {/* <FaCartArrowDown color="#E7B84E" /> */}
          </span>
          <span className="text-white font-bold mr-2">Panier</span>

          {/* <span className="bg-orange-800 rounded-[50%]  px-2 font-bold">0</span> */}
          <span className="bg-white rounded-[50%]  px-2 font-bold text-green-600">
            {totalQuantity}
          </span>
        </Link>
      </motion.button>
    );
};

export default NavCartButton;