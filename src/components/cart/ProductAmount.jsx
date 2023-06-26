import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { FaTrash } from "react-icons/fa";

const ProductAmount = ({ product }) => {
  const dispatch = useDispatch();
  const [amnt, setAmnt] = useState(product.quantity);

  // const decrease = () => {
  //     dispatch(cartActions.removeItemFromCart(id));
  // };

  // console.log(
  //   "code in ProductAmount for prod " + JSON.stringify(product)
  // );
  const dropItemFromCart = (itemId) => {
    const payload = {
      ...product,
    };
    dispatch(cartActions.dropItemFromCart(payload));
  };
  const increase = (event) => {
    // console.log(event.target.value);
    // console.log(Number(event.target.value) - 1);
    setAmnt(Number(event.target.value));
    // console.log(amnt);
    // console.log(
    //   "---------------" +
    //     product.product_price * event.target.value +
    //     "^^^^^^^^^^"
    // );
    // alert(amnt)
    const quantity = event.target.value;

    const totalPrice = product.tarification.montant * event.target.value;
    // console.log(totalPrice);
    const payload = {
      ...product,
      quantity,
      totalPrice,
    };
    dispatch(cartActions.addItemToCart(payload));
    // setAmnt(event.target.value);
    // setAmnt((prevAmount) => {
    //     return prevAmount + 1;
    // })
  };

  return (
    <div>
      <span className="flex gap-5">
        <div>
          <b>Nb Tonnes:</b> {product.quantity} TON
        </div>
        <FaTrash
          onClick={() => {
            dropItemFromCart(product.id);
          }}
          color="#E7B84E"
        />
      </span>
    </div>
  );
};

export default ProductAmount;
