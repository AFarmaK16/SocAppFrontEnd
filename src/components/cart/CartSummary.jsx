import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';


const CartSummary = ({ totalPrice }) => {
    const isAuthenticated = true;
    const totalQuantity = useSelector((state) =>
      state.cart.totalQuantity.toFixed(2)
    );
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
      <div className="flex flex-col border-2 border-solid border-green-700 rounded-xl text-center p-5">
        {/* <h2 className="uppercase text-2xl tracking-wide">order summary</h2> */}
        <div className="my-4 flex justify-between">
          <span className="capitalize text-xl font-bold">
            Totale quantité commandée :
          </span>
          <span className="italic">{totalQuantity} TON</span>
        </div>

        <div className="my-4 flex justify-between">
          <span className="capitalize text-xl font-bold">Sous total :</span>
          <span className="italic">{formatPrice(totalPrice)}</span>
        </div>
        {isAuthenticated && (
          <Link
            to="/checkout"
            className="block w-full uppercase p-3 text-white bg-black font-semibold btn"
          >
            Valider mon panier
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            to="/login"
            className="block w-full uppercase p-3 text-white bg-black font-semibold mt-auto"
          >
            Login
          </Link>
        )}
      </div>
    );
};


export default CartSummary;