import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { cartActions } from "../../store/cart-slice";
import { useDispatch ,useSelector} from "react-redux";
const AddToCart = ({ product }) => {

  const existingItem = useSelector((state) =>
    state.cart.items.find((item) => item.product_id === product.product_id)
  );
  const [amount, setAmount] = useState(existingItem?.quantity || ""); // set initial value of amount to existingItem quantity if it exists, else to an empty string
  const dispatch = useDispatch();

const increase = (event) => {
  setAmount(Number(event.target.value));
};

  console.log("In addToCart, passed product stuff is ");
  console.log(product);

  const addItemsToCart = () => {
    const quantity = amount;
    const totalPrice = product.product_price * amount;
    const payload = {
      ...product,
      quantity,
      totalPrice,
    };
    // alert('hello'+payload)
    console.log("------------------------");
    console.log(payload);
    dispatch(cartActions.addItemsToCart(payload));
    console.log("------------------------");
  };

  return (
    <div className="flex flex-col space-y-6">
      <h5>AddToCart Component</h5>

      <div className="w-[140px] flex justify-between items-center">
        <input
          type="number"
          value={amount}
          onChange={increase}
          placeholder="Entrer la quantité que vous souhaitez commander"
        />
      </div>
      <Link
        to="/cart"
        className="w-[140px] uppercase text-primary bg-secondary-100 rounded-md px-4 py-3 shadow-md flex justify-center items-center"
        onClick={addItemsToCart}
      >
        add to cart
      </Link>
    </div>
  );
};

export default AddToCart;
