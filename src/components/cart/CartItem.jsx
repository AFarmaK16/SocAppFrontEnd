import React from "react";
import ProductAmount from "./ProductAmount";

import product_img from "../../assets/cemiib-ll32-5rce.jpg";

import { formatPrice } from "../../utils/helpers";


const CartItem = ({ cart }) => {
               console.log(
                 "In CartItem the cart passed in params is " +
                  JSON.stringify(cart)
                  //  Object.getOwnPropertyNames(cart).length
               );
  return (
    <>
      {cart.map((product) => {
        return (
          <div
            key={product.product_id}
            className="flex justify-between mb-6 pb-6 border-b-2 border-gray-200"
          >
            <div className="flex flex-2">
              <img src={product_img} width={100} height={100}/>
              {/* <img
                src={product.product_image[0]}
                alt=""
                className="w-[200px] h-[150px] object-contain"
              /> */}
              <div className="flex flex-col justify-around">
                <div>
                  <span className="font-bold">
                   ID Produit  : {product.product_id}{" "}
                  </span>
                  <span>{product.product_name}</span>
                </div>
                <div>
                  <span className="font-bold">Référence: </span>
                  <span className="uppercase">{product.product_label}</span>
                </div>
                <div>
                  <span className="font-bold">Prix: </span>
                  <span className="italic">
                    {formatPrice(product.product_price)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-auto">
             
              <ProductAmount product={product} />
              <div className="w-[150px] text-center mt-auto ml-auto">
                <span className="text-secondary-100 font-bold italic">
                  {formatPrice(product.totalPrice)}
                </span>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        );})}
    </>
  );
};

export default CartItem;
