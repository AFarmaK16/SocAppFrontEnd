import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import { cartActions } from "../../store/cart-slice";
import { useDispatch ,useSelector} from "react-redux";
import { formatPrice } from "../../utils/helpers";
import { useForm } from "react-hook-form";
const AddToCart = ({ product }) => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const existingItem = useSelector((state) =>
    state.cart.items.find((item) => item.product_id === product.product_id)
  );
  const [amount, setAmount] = useState(existingItem?.quantity || ""); // set initial value of amount to existingItem quantity if it exists, else to an empty string
  const dispatch = useDispatch();

  const [subTotal, setsubTotal] = useState(product.product_price * amount);
const increase = (event) => {
  setAmount(Number(event.target.value));
  setsubTotal(Number(event.target.value) * product.product_price);
};

  // console.log("In addToCart, passed product stuff is ");
  // console.log(product);


      const tc = 3000 * amount;
       const rh = 2000 * amount ;
    const tva =  ( 18 * subTotal) / 100;
    const subTot1 = tc + rh + tva+ subTotal;
  const addItemsToCart = () => {
    const quantity = amount;
     const totalPrice = subTotal;
    const payload = {
      ...product,
      quantity,
      totalPrice,
    };
    // alert('hello'+payload)
    // console.log("------------------------");
    // console.log(payload);
    dispatch(cartActions.addItemsToCart(payload));
    // console.log("------------------------");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-[140px] flex justify-between items-center">
        <b>Quantité: </b> ||
        <input
          name="amount"
          type="number"
          value={amount}
          onChange={increase}
          placeholder="Entrer la quantité que vous souhaitez commander"
        />{" "}
        {/* <input
          className={`form-control ${errors.amount ? "is-invalid" : ""}`}
          type="number"
          value={amount}
          onChange={increase}
          name="amount"
          placeholder="Entrer la quantité que vous souhaitez commander"
          {...register("amount", {
            required: true,
            pattern: /^[0-9]+$/
          })}
        /> */}
        {errors.amount && (
          <div>
            <hr />
            <span className="text text-danger">
              La quantité saisie incorrecte(max 2 chiffres aprés la virgule)
            </span>
            <hr />
          </div>
        )}
      </div>
      <hr />
      <b>Montant HT: {formatPrice(subTotal)}</b>
      <b>Taxe Consommation: {formatPrice(tc)}</b>
      <b>Redevance Habitat: {formatPrice(rh)} </b>
      <b>TVA : {formatPrice(tva)}</b>

      <hr />
      <hr />
      <b>Montant TTC : {formatPrice(subTot1)}</b>
      <hr />
      <hr />
      <Link
        to="/cart"
        className="w-[200px] uppercase text-primary bg-secondary-100 rounded-md px-4 py-3 shadow-md flex justify-center items-center"
        onClick={addItemsToCart}
        // onClick={handleSubmit(addItemsToCart)}
      >
        Ajouter au panier <FaCartPlus color="#E7B84E" />
      </Link>
    </div>
  );
};

export default AddToCart;
//TODO : veillez ace que l'utilisateur ne puisse saisir qu'une qantite positive et de precision 2 