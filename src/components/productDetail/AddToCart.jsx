import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaCartPlus, FaEyeDropper } from "react-icons/fa";
import { cartActions } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

const AddToCart = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const { code, montant } = product.tarification || {};
  const existingItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const [amount, setAmount] = useState(existingItem?.quantity || ""); // set initial value of amount to existingItem quantity if it exists, else to an empty string
  const dispatch = useDispatch();

  const [subTotal, setsubTotal] = useState(
 montant * amount
    // product.tarification.montant * amount
  );
  const [showAlert, setShowAlert] = useState(false);
  const increase = (event) => {
    setAmount(Number(event.target.value));
    setsubTotal(Number(event.target.value) * product.tarification.montant);
    // console.log(amount)
  };
  const tva = 18 / 100;
  const tc = 3000 * amount;
  const rh = 2000 * amount;
  //montant avec tva
  const Montant_Tva = montant * amount * tva;
  // const Montant_Tva = montant * amount * tva + subTotal;
  // const Montant_Tva = product.tarification.montant * amount * tva + subTotal;
  //Montant tva to add to total
  const tva_M = (montant * amount * tva) + (tc * tva) + (rh * tva);
  // const tva_M = product.product_price * amount.toFixed(2) * tva;
  const subTot1 = tc + rh + tva_M + subTotal;
  const addItemsToCart = () => {
    const quantity = amount;
    const totalPrice = subTotal;
    const payload = {
      ...product,
      montant,
      quantity,
      totalPrice,
    };
    dispatch(cartActions.addItemsToCart(payload));
    setShowAlert(true);
    return <Navigate to="/cart" />;
  };

  return (
    <div className="flex flex-col space-y-6">
      {showAlert && (
        <Alert color="success">
          Votre produit a été ajouté au panier avec succés !!
        </Alert>
      )}
      <div className="form-group">
        {/* <label htmlFor="amount"> */}
        <b>Quantié: </b>
        {/* </label> */}
        <input
          type="number"
          name="amount"
          id="amount"
          // step="0.1"
          min="0.01"
          pattern="\d+(\.\d)?"
          className={`form-control ${errors.amount ? "is-invalid" : ""}`}
          {...register("amount", {
            required: true,
            pattern: {
              value: /^\d+(\.\d+)?$/,

              message: "Veuillez entrer une quantité valide",
            },
            min: {
              value: 0.01,
              message: "Veuillez entrer une quantité positive",
            },
          })}
          defaultValue={amount}
          onChange={(e) => increase(e)}
        />
        {errors.amount && (
          <div>
            <hr />
            <span className="text-red-500">{errors.amount.message}</span>
            <br />
            <span>***max 2 chiffres aprés la virgule</span>
          </div>
        )}
      </div>

      <hr />

      <b>% TVA : {tva * 100}%</b>
      <b>Taxe Consommation: {formatPrice(tc)}</b>
      <b>Redevance Habitat: {formatPrice(rh)} </b>
      <b>
        TVA(<span className="text-sm">sur prixHT</span>): {formatPrice(Montant_Tva)}
        </b>

   <b>
        Total TVA : {formatPrice(tva_M)}
      </b>
      <b>Montant HT: {formatPrice(subTotal)}</b>

      <hr />
      <hr />
      <b>Total TTC : {formatPrice(subTot1)}</b>
      <hr />
      <hr />
      {/* <Link
    
        // className="w-[210px] uppercase text-primary bg-secondary-100 rounded-md px-4 py-3 shadow-md flex justify-center items-center"
        // onClick={addItemsToCart}
       
to="/cart"
        // onClick={handleSubmit(addItemsToCart)}
      > */}
      <button
        className=" btn btn-success uppercase text text-white  shadow-md flex justify-center items-center"
        onClick={handleSubmit(addItemsToCart)}
      >
        {" "}
        <FaCartPlus color="#E7B84E" /> Ajouter au panier
      </button>
      {/* </Link> */}
    </div>
  );
};

export default AddToCart;
// TODO : veillez ace que l'utilisateur ne puisse saisir qu'une qantite positive et de precision 2
