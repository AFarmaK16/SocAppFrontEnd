import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { cartActions } from '../../store/cart-slice';


const CartSummary = ({ totalPrice, transport,dechargement }) => {
  const tva= 18/100;
  const dispatch = useDispatch();
  const isAuthenticated = true;
  // console.log("lii dh mofi eksi "+transport)
  const totalQuantity = useSelector((state) =>
    state.cart.totalQuantity.toFixed(2)
  );
     const payload = {

       totalPrice,
     };
  //  dispatch(cartActions.setTotalPrice(payload));
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalRedevance = totalQuantity * 2000
    const totalTaxeCons = 3000 * totalQuantity;
const Montant_Tva = totalPrice * tva + transport * tva + dechargement * tva +(totalRedevance * tva )+(totalTaxeCons * tva);
  return (
    <div className="flex flex-col border-2 border-solid border-green-700 rounded-xl text-center p-5 ">
      {/* <h2 className="uppercase text-2xl tracking-wide">order summary</h2> */}
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Quantité :</span>
        <span className="italic">{totalQuantity} TON</span>
      </div>

      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Redevance Habitat:</span>
        <span className="italic">{formatPrice(totalRedevance)} </span>
      </div>
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Taxe Consommation:</span>
        <span className="italic">{formatPrice(totalTaxeCons)} </span>
      </div>
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Transport HT:</span>
        <span className="italic">{formatPrice(transport)} </span>
      </div>
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Dechargement HT:</span>
        <span className="italic">{formatPrice(dechargement)} </span>
      </div>
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">TVA:</span>
        <span className="italic">{formatPrice(Montant_Tva)}</span>
      </div>
      <div className="my-4 flex justify-between">
        <span className="capitalize text-sm font-bold">Total HT:</span>
        <span className="italic">{formatPrice(totalPrice)}</span>
      </div>
      <hr />
      <div className="my-4 flex justify-between">
        <span className="capitalize text-xl font-bold">Total TTC:</span>
        <span className="italic">
          {formatPrice(totalPrice + Montant_Tva + transport + dechargement+totalTaxeCons+totalRedevance)}
        </span>
      </div>

      {/* {isAuthenticated && (
        <Link
          to="/checkout"
          className="block w-full uppercase p-3 text-white bg-black font-semibold btn"
        >
          .
        </Link>
      )} */}
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