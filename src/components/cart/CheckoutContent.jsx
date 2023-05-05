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
import { Col, Row } from "reactstrap";

const CheckoutContent = ({ totalPrice, name }) => {
  // alert("hello")
  const dispatchOrders = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // operatorsLoading;

  const loading = useSelector((state) => state.ui.opratorsLoading);
  const totalQuantity = useSelector((state) =>
    state.cart.totalQuantity.toFixed(2)
  );
  const [dechargement, setDechargement] = useState(0);
  const transport = totalQuantity * 200;
  const cartContent = useSelector((state) => state.cart);
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
  const tva = ((18 * totalPrice) / 100).toFixed();
  const [finalTotal, setTotal] = useState(tc + rh + Number(tva) + totalPrice);
  const items = cartContent.items.map((item) => {
    return { productId: item.product_id, quantity: item.quantity };
  });

  const handleRendu = () => {
    // alert(isRenduChecked)
    //  if (!isRenduChecked) {
    console.log("Rendu unchecked");
    console.log("decharge doit etre annuler car rendu " + isDechargeChecked);
    setDechargeChecked(false);
    setDechargement(0);
    console.log(
      "la vakeur de la decharrge too doit etre set a 0 cause it is tralala " +
        isDechargeChecked +
        " ett val = " +
        dechargement
    );

    setTotal(finalTotal - transport - dechargement);
    //  } else {
    //    console.log("Rendu checked");
    //    setTotal(finalTotal + transport);
    //  }
  };
  const handleDecharg = (e) => {
    // setRenduChecked(e.target.checked);
    // if (isDechargeChecked) {
    //   finalTotal += dechargement;
    // } else {
    setTotal(finalTotal - dechargement);
    // }
    // console.log(" rendu " + e.target.checked);
  };
  const handleFileChange = async (event) => {
   
    const delivery = {
       delivery_address: event.adresse,
       delivery_destination : event.destination,
       delivery_comment : event.comm,
       isRendu: isRenduChecked,
       isDecharged: isDechargeChecked
    };
    const facture = {
      payment_reference: event.reference,
      operator: event.payment_operator,
      payment_bank: event.bank,
      payment_type: event.payment_type,
      payment_date: event.payment_date,
    };
    console.log(event)
    const formData = new FormData();
    formData.append("order_Amount", finalTotal);

    formData.append("deliverRef", 1);

    formData.append("customerRef", 1);

    formData.append("customerID", 2);

    formData.append("items", JSON.stringify(items));

    formData.append("justificatif", event.payment_justification[0]);
    formData.append("facture", JSON.stringify(facture));
    formData.append("delivery", JSON.stringify(delivery));
    // formData.append("facture.payment_reference", event.reference);
    // formData.append("facture.operator", event.payment_operator);
    // formData.append("facture.payment_bank", event.bank);
    // formData.append("facture.payment_type", event.payment_date);

    // -------------
    ///TRYING TO ADD ORDER
    const payload = {
      orderRequest: formData,
      itemList: items,
    };

    try {
      dispatchOrders(addOrder(payload));
      swal({
        title: "Commande enregistrée!",
        text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
        icon: "success",
        button: "OK!",
      });
      dispatchOrders(cartActions.clearCart());
    } catch (error) {
      console.log("%c" + error, "color:purple");
    }
  };
  const changeHandler = (event) => {
    console.log("😂 mo ki beuss nako di");
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <Row>
        {" "}
        <Col>
          {" "}
          <div className=" mx-auto mt-12 px-8 py-12 shadow-lg rounded-xl">
            <form onSubmit={handleSubmit(handleFileChange)}>
              <div className="">
                {/* <span className="text-3xl flex items-center justify-center rounded-l border border-gray-100 border-r-0 py-1 px-2 bg-gray-300  text-black">
              Payer par :
            </span> */}
                <fieldset>
                  <legend>Paiement</legend>
                  <hr />
                  <div className="form-group">
                    <label
                      className="form-label"
                      htmlFor="payment_justification"
                    >
                      Payer par:
                    </label>
                    <select
                      name="payment_type"
                      id="payment_type"
                      className={`form-select 
                    ${errors.payment_type ? "is-invalid" : ""}`}
                      {...register("payment_type", {
                        required: true,
                      })}
                      onChange={(e) => {
                        setSelectedPaymentOpt(e.target.value);
                      }}
                      required
                    >
                      <option value="">----</option>
                      <option value="1">Cheque</option>
                      <option value="2">Virement</option>
                      <option value="0">Transfert</option>
                    </select>
                    <div className="invalid-feedback">
                      Vous devez choisir le type de paiement effectué
                    </div>
                    {errors.payment_type && (
                      <div>
                        <hr />
                        <span className="text text-danger">
                          Vous devez choisir le type de paiement effectué
                        </span>
                        <hr />
                      </div>
                    )}
                  </div>
                  {selectedPaymentOpt === "0" ? (
                    <div className="form-group">
                      Operateur:{" "}
                      <select
                        name="payment_operator"
                        id=""
                        className={`form-select ${
                          errors.payment_operator ? "is-invalid" : ""
                        }`}
                        // required
                        {...register("payment_operator", {
                          required: true,
                        })}
                      >
                        <option value="">-----</option>
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
                      {errors.payment_operator && (
                        <div>
                          <span className="text text-danger">
                            Vous devez choisir l'opérateur de paiement
                          </span>
                        </div>
                      )}
                    </div>
                  ) : selectedPaymentOpt === "1" ||
                    selectedPaymentOpt === "2" ? (
                    <div className="form-group">
                      Banque:
                      <input
                        type="text"
                        className={`form-control ${
                          errors.bank ? "is-invalid" : ""
                        }`}
                        name="bank"
                        id="bank"
                        {...register("bank", {
                          required: true,
                          pattern: /^[a-zA-Z]+$/,
                        })}
                      />
                      {errors.bank && (
                        <div>
                          <hr />
                          <span className="text text-danger">
                            Saisie incorrecte
                          </span>
                          <hr />
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="form-group">
                    Reference:
                    <input
                      className={`form-control ${
                        errors.reference ? "is-invalid" : ""
                      }`}
                      type="text"
                      name="reference"
                      id="reference"
                      {...register("reference", {
                        required: true,
                        pattern: /^[a-zA-Z0-9]+$/,
                      })}
                    />
                    {errors.reference && (
                      <div>
                        <hr />
                        <span className="text text-danger">
                          Saisie incorrecte
                        </span>
                        <hr />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    Date:
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      className={`form-control 
                    ${errors.payment_date ? "is-invalid" : ""}`}
                      {...register("payment_date", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                  {errors.payment_date && (
                    <div>
                      <span className="text text-danger">Date invalide</span>
                    </div>
                  )}
                  <div className="form-group">
                    Montant:
                    <input
                      type="number"
                      name="montant"
                      id="montant"
                      className={`form-control ${
                        errors.montant ? "is-invalid" : ""
                      }`}
                      {...register("montant", {
                        required: true,
                        pattern: /^(\d*\.)?\d+$/,
                        validate: (value) => value == finalTotal,
                      })}
                    />
                    {errors.montant && (
                      <div>
                        <hr />
                        <span className="text text-danger">
                          Montant saisie invalide
                        </span>
                        <br />
                        <span className="text text-warning">
                          *** Doit etre egale au MontantTTC de la commande{" "}
                          {formatPrice(finalTotal)}
                        </span>
                        <hr />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      className="form-label"
                      htmlFor="payment_justification"
                    >
                      Justificatif de Paiement:
                    </label>
                    <input
                      type="file"
                      className="form-control w-full rounded-r"
                      name="payment_justification"
                      onChange={changeHandler}
                      {...register("payment_justification", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.payment_justification && (
                    <div>
                      <span className="text text-danger">
                        Vous devez joindre un justificatif de paiement
                      </span>
                    </div>
                  )}
                </fieldset>{" "}
                <br />
                <hr />
                <hr />
                <fieldset>
                  <legend>Livraison</legend>
                  <hr />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="rendu"
                      id="rendu"
                      className="form-check-input"
                      value="rendu"
                      onChange={(e) => {
                        {
                          setRenduChecked(e.target.checked);
                          setTotal(finalTotal + transport);
                          if (!e.target.checked) {
                            setDechargeChecked(false);
                            setDechargement(0);
                            setTotal(finalTotal - dechargement);
                            handleRendu();
                          }
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="rendu">
                      Rendu
                    </label>
                  </div>
                  {/* {!isRenduChecked && <div>{console.log("momkay")}</div>} */}
                  {isRenduChecked && (
                    <div>
                      {/* <h1>------{isRenduChecked}---------</h1>
                {console.log(isRenduChecked + "🥺🥺bi moy cocher🥺")} */}
                      <div className="form-group">
                        Destination: selectbox
                        <input
                          type="text"
                          name="destination"
                          id="destination"
                          className={`form-control ${
                            errors.destination ? "is-invalid" : ""
                          }`}
                          {...register("destination", {
                            required: true,
                            pattern: /^[a-zA-Z\s]+$/,
                          })}
                        />
                      </div>
                      {errors.destination && (
                        <div>
                          <span className="text text-danger">
                            Destination invalide
                          </span>
                        </div>
                      )}

                      <div className="form-group">
                        Adresse:
                        <input
                          type="text"
                          name="adresse"
                          id="adresse"
                          placeholder="Rue,villa,....."
                          className={`form-control ${
                            errors.adresse ? "is-invalid" : ""
                          }`}
                          {...register("adresse", {
                            required: true,
                            pattern: /^[a-zA-Z0-9\s,'-]*$/,
                          })}
                        />
                      </div>
                      {errors.adresse && (
                        <div>
                          <span className="text text-danger">
                            Adresse invalide
                          </span>
                        </div>
                      )}
                      <br />
                      <div className="input-group">
                        <span className="input-group-text">Commentaire</span>
                        <textarea
                          name="comm"
                          aria-label="With textarea"
                          className={`form-control ${
                            errors.comm ? "is-invalid" : ""
                          }`}
                          {...register("comm", {
                            pattern: /^[a-zA-Z0-9\s,'-]*$/,
                          })}
                        ></textarea>
                      </div>
                      {errors.comm && (
                        <div>
                          <span className="text text-danger">
                            Saisie invalide
                          </span>
                        </div>
                      )}
                      <br />
                      <div className="form-group">
                        <input
                          type="checkbox"
                          name="manu"
                          id="manu"
                          className="form-check-input"
                          onChange={(e) => {
                            {
                              setDechargeChecked(e.target.checked);
                              setDechargement(totalQuantity * 400);
                              setTotal(finalTotal + totalQuantity * 400);
                              if (!e.target.checked) {
                                setDechargement(0);
                                handleDecharg();
                              }

                              console.log("Decharg\t" + e.target.checked);
                            }
                          }}
                        />
                        <label className="form-check-label" htmlFor="manu">
                          Dechargement/ ManuTention:
                        </label>
                      </div>
                    </div>
                  )}
                </fieldset>
              </div>
              <div className="w-[80%] m-auto border rounded">
                <button
                  className="capitalize py-3 text-xl font-bold tracking-widest text-primary bg-secondary-100 w-full drop-shadow-2xl"
                  type="submit"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </Col>
        <Col>
          {" "}
          <div className="mx-auto px-8 py-12 shadow-lg rounded-xl">
            <h2 className="capitalize text-3xl font-bold tracking-wider mb-10 leading-relaxed">
              Hello, <b>Nom client </b>
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
              <p className="text-lg capitalize mb-4">
                Redevance Consommation:{" "}
              </p>
              <span className="italic font-semibold">{formatPrice(rh)}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg capitalize mb-4">TVA: </p>
              <span className="italic font-semibold">{formatPrice(tva)}</span>
            </div>

            {isRenduChecked && (
              <div className="flex justify-between items-center">
                <p className="text-lg capitalize mb-4">Transport </p>
                <span className="italic font-semibold">
                  {formatPrice(transport)}{" "}
                </span>
              </div>
            )}
            {isDechargeChecked && (
              <div className="flex justify-between items-center">
                <p className="text-lg capitalize mb-4">ManuTention </p>
                <span className="italic font-semibold">
                  {formatPrice(dechargement)}{" "}
                </span>
              </div>
            )}

            <hr className="my-6" />
            <div className="flex justify-between items-center">
              <p className="text-xl capitalize mb-4 font-bold">
                Montant TTC :{" "}
              </p>
              <span className="italic font-bold">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutContent;
