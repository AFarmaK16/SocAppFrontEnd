import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { FaTrash } from "react-icons/fa";

const ProductAmount = ({ product}) => {
    const dispatch = useDispatch();
    const [amnt, setAmnt] = useState(product.quantity);
    

    // const decrease = () => {
    //     dispatch(cartActions.removeItemFromCart(id));
    // };

console.log(
  "code in ProductAmount for prod " +
   JSON.stringify( product) 
  //  +
  //   " hay quantitty " +
  //   product.quantity +
  //   " <<quantity and then product id is " +
  //   product.product_id
);
      const increase = (event) => {
        console.log(event.target.value);
        console.log(Number(event.target.value)-1);
        setAmnt(Number(event.target.value));
        console.log(amnt);
        console.log(
          "---------------" +
            product.product_price * event.target.value +
            "^^^^^^^^^^"
        );
        // alert(amnt)
      const quantity = event.target.value;
        
    const totalPrice = product.product_price * event.target.value ;
      console.log(totalPrice);
        const payload = {
          ...product,
          quantity,
          totalPrice
        };
            dispatch(
              cartActions.addItemToCart(
               payload
              )
            );
        // setAmnt(event.target.value);
        // setAmnt((prevAmount) => {
        //     return prevAmount + 1;
        // })
      };

    return (
      <div
      //  className="w-[70px] lg:w-[100px] xl:w-[150px] grid grid-cols-3 justify-center items-center ml-auto"
      >
        {/* <button type='button' onClick={decrease} className='lg:w-4 lg:h-3 xl:py-2 xl:w-6 xl:h-3 flex justify-center items-center'>
                <FaMinus />
            </button> */}
        {/* product.Quantity:  <input
          // className="text-sm lg:text-lg xl:text-2xl font-bold text-gray-700"
          // className="text-sm lg:text-lg xl:text-2xl font-bold text-gray-700"
          type="number"
          value={amnt}
          onChange={increase}
        /> */}
        <div>
          <span>
            <b>Nb Tonnes:</b> {product.quantity} Tonnes{" "}
          </span>
          <FaTrash />
        </div>
        {/* <button type='button' onClick={increase} className='lg:w-4 lg:h-3 xl:py-2 xl:w-6 xl:h-3 flex justify-center items-center'>
                <FaPlus />
            </button> */}
      </div>
    );
};


export default ProductAmount;