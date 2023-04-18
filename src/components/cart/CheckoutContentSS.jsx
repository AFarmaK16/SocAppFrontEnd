import React, { useEffect, useState } from "react";

import swal from "sweetalert";

import {
  FaCcVisa,
  FaCheckDouble,
  FaFile,
  FaPrayingHands,
} from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { addOrder, getOperators } from "../../store/actions/oder-action";
import { type } from "@testing-library/user-event/dist/type";
import Dropzone from "react-dropzone";
import { set, useForm } from "react-hook-form";

const CheckoutContent = ({ totalPrice, name }) => {
  const dispatchOrders = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // operatorsLoading;

  const loading = useSelector((state) => state.ui.opratorsLoading);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dechargement = totalQuantity * 400;
  const transport = totalQuantity * 200;
  const cartContent = useSelector((state) => state.cart);
  // console.log(cartContent);
  useEffect(() => {
    dispatchOrders(getOperators());
  }, [dispatchOrders]);

  const operators = useSelector((state) => state.orders.operators);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRenduChecked, setRenduChecked] = useState(false);
  const [isDechargeChecked, setDechargeChecked] = useState(false);
  const [selectedPaymentOpt, setSelectedPaymentOpt] = useState(null);
  const tc = 3000 * totalQuantity;
  const rh = 2000 * totalQuantity;
  const tva = (18 * totalPrice) / 100;
  const finalTotal = tc + rh + tva + totalPrice;
  const items = cartContent.items.map((item) => {
    return { productId: item.product_id, quantity: item.quantity };
  });
  // if (!isRenduChecked) {
  //   setDechargeChecked(false)
  // }
  const [order_data, setOrderData] = useState(() => ({
    order_Amount: totalPrice,
    order_status: 1,
    deliverRef: 1,
    customerRef: 1,
    customerID: 2,
    items: items,
    facture: {
      justificatif: selectedFile,
    },
  }));
  {
    /*todo:  */
  }
  const handleRendu = (e) => {
    setRenduChecked(e.target.checked);
    if (!isRenduChecked) {
      setDechargeChecked(false);
      console.log("decharge doit etre annuler car rendu " + isDechargeChecked);
    }

    console.log(" rendu " + e.target.checked);
  };

  const handleFileChange = async (event) => {
    // alert(selectedFile)
    order_data.facture.justificatif = selectedFile;
    const formData = new FormData();
    formData.append("order_Amount", totalPrice);

    formData.append("deliverRef", 1);

    formData.append("customerRef", 1);

    formData.append("customerID", 2);

    // formData.append("items", items);
    items.forEach((item, index) => {
      // formData.append(`items[]`, JSON.stringify(item));
      formData.append(`items[${index}].productId`, item.productId);
      formData.append(`items[${index}].quantity`, item.quantity);
    });

    formData.append("justificatif", selectedFile);
    formData.append("facture.paymentStatus", 1);
    console.log("%c order_data", "color:green");
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
    console.log("-------------------", "color:green");
    // console.log(formData.get("items[]"));
    console.log("-------------------", "color:green");
    // console.log(selectedFile)
    // console.log(event.target.files[0]);
    // setSelectedFile(event.target.files[0]);
    //A faire que si la commande a bien ete enregistree ❌❌❌❌❌❌❌❌❌
    // dispatchOrders(cartActions.clearCart());
    // If u have the answer i'd be glad to know it🥺🥺🥺
    swal({
      title: "Commande payée!",
      text: `Vous avez payée ${formatPrice(totalPrice)} joint ${selectedFile}`,
      // html: `<h1>hey</h1>`,
      icon: "success",
      button: "OK!",
    });
    // -------------
    ///TRYING TO ADD ORDER
    const payload = {
      orderRequest: order_data,
    };

    try {
      // console.log("JSON.stringify(payload.orderRequest)");
      // console.log(payload.orderRequest);
      dispatchOrders(addOrder(payload));
      swal({
        title: "Order Added!",
        text: `Order: CREATED!`,
        icon: "success",
        button: "OK!",
      });
      // dispatchOrders(cartActions.clearCart());
    } catch (error) {
      console.log("%c" + error, "color:purple");
    }
  };
  const orderAmount = cartContent.totalQuantity;
  // const productId = null;
  // const quantity= null;

  const changeHandler = (event) => {
    console.log("😂 mo ki beuss nako di");
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  /////end up trying

  return (
    <div>
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
          {selectedPaymentOpt === "t" ? (
            <div className="form-group">
              Operateur:{" "}
              <select name="payment_operator" id="" className="form-control">
                <option value="null">-----</option>
                {operators.map((operator) => {
                  return (
                    <option
                      key={operator.operator_id}
                      value={operator.operator_id}
                    >
                      {operator.operator_name}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : selectedPaymentOpt === "v" || selectedPaymentOpt === "c" ? (
            <div className="form-group">
              Banque:
              <input
                type="text"
                className={`form-control ${errors.ref ? "is-invalid" : ""}`}
                name="ref"
                id="ref"
                {...register("ref", {
                  required: true,
                  pattern: /^[a-zA-Z]+$/,
                })}
              />
              {errors.ref && (
                <div>
                  <hr />
                  <span className="text text-danger">Saisie incorrect</span>
                  <hr />
                </div>
              )}
            </div>
          ) : (
            ""
          )}
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
          <div className="form-check">
            <input
              type="checkbox"
              name="rendu"
              id="rendu"
              className="form-control"
              value="rendu"
              onChange={(e) => {
                {
                  handleRendu(e);
                }
              }}
            />
            Rendu
          </div>
          {isRenduChecked && (
            <div>
              <div className="form-group">
                Destination: selectbox
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                Commentaire
                <textarea></textarea>
              </div>
              <div className="form-group">
                Adresse:
                <input
                  type="number"
                  name="ref"
                  id="ref"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="ref"
                  id="ref"
                  className="form-control"
                  onChange={(e) => {
                    {
                      setDechargeChecked(e.target.checked);
                      console.log("Decharg" + e.target.checked);
                    }
                  }}
                />{" "}
                Dechargement/ ManuTention:
              </div>
            </div>
          )}
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
            onClick={handleSubmit(handleFileChange)}
          >
            Valider
          </button>
        </div>
      </div>
      <div className="w-[95%] sm:w-[80%] lg:w-[50%] mx-auto px-8 py-12 shadow-lg rounded-xl">
        <h2 className="capitalize text-3xl font-bold tracking-wider mb-10 leading-relaxed">
          Hello, <b>Nom client desactivel manuTention si rendu unchecked:</b>
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Quantité commandée:</p>
          <span className="italic font-semibold">{totalQuantity} TON</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Montant HT: </p>
          <span className="italic font-semibold">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Taxe Consommation: </p>
          <span className="italic font-semibold">{formatPrice(tc)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">Redevance Consommation: </p>
          <span className="italic font-semibold">{formatPrice(rh)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg capitalize mb-4">TVA: </p>
          <span className="italic font-semibold">{formatPrice(tva)}</span>
        </div>

        {isRenduChecked && (
          <div className="flex justify-between items-center">
            <p className="text-lg capitalize mb-4">Transport </p>
            <span>{formatPrice(transport)} </span>
          </div>
        )}
        {isDechargeChecked && (
          <div className="flex justify-between items-center">
            <p className="text-lg capitalize mb-4">ManuTention </p>
            <span>{formatPrice(dechargement)} </span>
          </div>
        )}

        <hr className="my-6" />
        <div className="flex justify-between items-center">
          <p className="text-xl capitalize mb-4 font-bold">Montant TTC : </p>
          <span className="italic font-bold">{formatPrice(finalTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;
