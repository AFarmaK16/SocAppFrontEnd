import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { cartActions } from "../../store/cart-slice";

const CartContent = ({ cart, totalPrice }) => {
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="mb-40">
      <h2 className="uppercase text-3xl tracking-wide text-center my-8">
        Mon Panier
      </h2>
      <div className="flex justify-between my-12">
        <div>
          <Link
            to="/products"
            className="text-white uppercase px-4 py-2 rounded-md shadow-lg btn btn-success"
          >
            Poursuivre Achat
          </Link>
        </div>
        <div>
          <button
            onClick={clearCart}
            className="text-white uppercase px-4 py-2 rounded-md shadow-lg btn btn-success"
          >
            Vider Panier
          </button>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-2 lg:pr-6">
          <CartItem cart={cart} />
        </div>
        <div className="lg:col-span-2 mb-10">
          <CartSummary totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
