import React, { useState } from "react";

import swal from "sweetalert";

import { FaCcVisa, FaFile, FaPrayingHands } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CheckoutContent = ({ totalPrice, name }) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPaymentOpt, setSelectedPaymentOpt] = useState(null);

  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    // setSelectedFile(event.target.files[0]);
    //A faire que si la commande a bien ete enregistree ❌❌❌❌❌❌❌❌❌
    dispatch(cartActions.clearCart());
    //A faire que si la commande a bien ete enregistree ❌❌❌❌❌❌❌❌❌

    swal({
      title: "Commande payée!",
      text: `Vous avez payée ${formatPrice(totalPrice)} joint ${selectedFile}`,
      // html: `<h1>hey</h1>`,
      icon: "success",
      button: "OK!",
    });
  };
  const changeHandler = (event) => {
    console.log("😂 mo ki beuss nako di");
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  //  console.log(selectedPaymentOpt);
  return (
    <div>
      <div className="w-[95%] sm:w-[80%] lg:w-[50%] mx-auto px-8 py-12 shadow-lg rounded-xl">
        <h2 className="capitalize text-3xl font-bold tracking-wider mb-10 leading-relaxed">
          Hello, <b>Nom client</b>
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Sous total : </p>
          <span className="italic font-semibold">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Quantité commandée: </p>
          <span className="italic font-semibold">{totalQuantity} TON</span>
        </div>
        {/* <div className="flex justify-between items-center">
            <p className="text-lg capitalize mb-4">shipping discount : </p>
            <span className="italic font-semibold">{formatPrice(-5.99)}</span>
          </div> */}
        <hr className="my-6" />
        <div className="flex justify-between items-center">
          <p className="text-xl capitalize mb-4 font-bold">Total : </p>
          <span className="italic font-bold">{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <div className="w-[95%] sm:w-[80%] lg:w-[50%] mx-auto mt-12 px-8 py-12 shadow-lg rounded-xl">
        <div className="w-[80%] m-auto border rounded">
          <div className="flex">
            <span className="text-3xl flex items-center justify-center rounded-l border border-gray-100 border-r-0 py-1 px-2 bg-gray-300  text-black">
              Payer par :
            </span>
            <select
              name="payment_type"
              id=""
              className="form-control"
              onChange={(e) => {
                setSelectedPaymentOpt(e.target.value);
              }}
            >
              <option value="">----</option>
              <option value="c">Cheque</option>
              <option value="v">Virement</option>
              <option value="t">Transfert</option>
            </select>
          </div>
          <br /> <br />
          {selectedPaymentOpt == "t" ? (
            <div className="form-group">
              Operateur:
              <select name="payment_operator" id="" className="form-control">
                <option value="">----</option>
                <option value="orange_money" id="om">
                  Orange Money
                </option>
                <option value="wave" id="wave">Wave</option>
                <option value="free_money" id="free">Free Money</option>
              </select>
            </div>
          ) : selectedPaymentOpt == "v" || selectedPaymentOpt == "c" ? (
            <div className="form-group">
              Banque:
              <input type="text" name="ref" id="ref" className="form-control" />
            </div>
          ) : (
            ""
          )}
          {/* <div className="form-group">
            Reference:
            <input type="text" name="ref" id="ref" className="form-control" />
          </div>
          <div className="form-group">
            Banque:
            <input type="text" name="ref" id="ref" className="form-control" />
          </div> */}
          <div className="form-group">
            Reference:
            <input type="text" name="ref" id="ref" className="form-control" />
          </div>
          <div className="form-group">
            Date:
            <input type="date" name="ref" id="ref" className="form-control" />
          </div>
          <div className="form-group">
            Montant:
            <input type="number" name="ref" id="ref" className="form-control" />
          </div>
        </div>
        <div className="w-[80%] m-auto border rounded">
          <div className="flex">
            <span className="text-3xl flex items-center justify-center rounded-l border border-gray-100 border-r-0 py-1 px-2 bg-gray-300  text-black">
              <FaFile />
            </span>
            <input
              type="file"
              className="form-input w-full rounded-r"
              name="payment_justification"
              onChange={changeHandler}
            />
          </div>

          <button
            className="capitalize py-3 text-xl font-bold tracking-widest text-primary bg-secondary-100 w-full drop-shadow-2xl"
            onClick={handleFileChange}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;
