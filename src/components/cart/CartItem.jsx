import React from "react";
import ProductAmount from "./ProductAmount";

import product_img from "../../assets/cemiib-ll32-5rce.jpg";

import { formatPrice } from "../../utils/helpers";
import { Card, CardBody, CardImg } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = ({ cart }) => {
  //  console.log(
  //    "In CartItem the cart passed in params is " +
  //     JSON.stringify(cart)
  //     //  Object.getOwnPropertyNames(cart).length
  //  );
  const dispatch = useDispatch();
  const dropItemFromCart = (itemId,product) => {
    const payload = {
      ...product,
    };
    dispatch(cartActions.dropItemFromCart(payload));
  };
  return (
    <>
      {cart.map((product) => {
        console.log("mogui "+product)
        return (
          <div
            key={product.id}
            className="flex justify-between mb-6 pb-6 border-b-2 border-gray-200 text-black  text-sm"
          >
            <div className=" flex flex-2 mt-3 w-fit mx-auto">
              {/* <div className="flex flex-2"> */}
              <div className="overflow-x-hidden rounded-2xl">
                <img
                  src={product_img}
                  width={85}
                  height={8}
                  className="rounded-full w-28 "
                />
              </div>
              {/* <img
                src={product.product_image[0]}
                alt=""
                className="w-[200px] h-[150px] object-contain"
              /> */}
              <div className="flex flex-col justify-around">
                <div>
                  <span className="font-bold">ID Produit : {product.id} </span>
                  <span>{product.product_name}</span>
                </div>
                <div>
                  <span className="font-bold">Référence: </span>
                  <span className="uppercase">{product.product_label}</span>
                </div>
                <div>
                  <span className="font-bold">P.U: </span>
                  <span className="italic">
                    {formatPrice(product.tarification.montant)}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <ProductAmount product={product} />
              <div className=" text-center mt-auto ml-auto font-bold">
                Sous-total HT:
                <span className="text-secondary-100 font-bold italic">
                  {formatPrice(product.totalPrice)}
                </span>
                {/* <FaTrash
                  onClick={() => {
                    dropItemFromCart(product.id,product);
                  }}
                  color="#E7B84E"
                /> */}
              </div>
            </div>
            <hr className="my-4" />
          </div>
        );
      })}
    </>
  );
};

export default CartItem;
