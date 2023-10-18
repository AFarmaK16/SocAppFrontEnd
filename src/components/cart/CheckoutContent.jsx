import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import {
  addOrder,
  calculateTTc,
  // getBanks,
  getOperators,
  getPaymentModes,
} from "../../store/actions/oder-action";
import { formatPrice } from "../../utils/helpers";
import { cartActions } from "../../store/cart-slice";
import { formActions } from "../../store/form-slice";

const CheckoutContent = ({ totalPrice, name, deliveryData }) => {
  const token = localStorage.getItem("token");
  // alert("hello")
  // console.log(deliveryData);
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
  const cartContent = useSelector((state) => state.cart);
  useEffect(() => {
    dispatchOrders(getOperators());
  }, [dispatchOrders]);
  useEffect(() => {
    dispatchOrders(getPaymentModes());
  }, [dispatchOrders]);
  const payModes = useSelector((state) => state.orders.paymentMode);

  const operators = useSelector((state) => state.orders.operators);
  const [selectedPaymentOpt, setSelectedPaymentOpt] = useState(null);
  const tc = 3000 * totalQuantity;
  const rh = 2000 * totalQuantity;
  const tva = 18;
  // const [finalTotal, setTotal] = useState(tc + rh + Number(tva) + totalPrice);
  const items = cartContent.items.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity.toFixed(2),
    };
  });

  const delivery_address = useSelector(
    (state) => state.shippingForm.delivery_address
  );
  const ttc = useSelector((state) => state.shippingForm.ttc);
  const delivery_destination = useSelector(
    (state) => state.shippingForm.delivery_destination
  );
  const delivery_comment = useSelector(
    (state) => state.shippingForm.delivery_comment
  );
  const Montant_Tva = Number(
    useSelector((state) => state.shippingForm.Montant_Tva)
  );
  console.log(useSelector((state) => state.shippingForm));
  const isRendu = useSelector((state) => state.shippingForm.isRendu);
  const isDecharged = useSelector((state) => state.shippingForm.isDecharged);
  const maxFileSize = 1048576; // 1MB in bytes
  const maxFileCount = 2;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  const validateFiles = (files) => {
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }

    if (files.length > maxFileCount) {
      return "Vous ne pouvez joindre que  a maximum of 2 files";
    }

    if (totalSize > maxFileSize) {
      return "La taille maximale ne doit pas exéceder 1MB";
    }

    return true;
  };

  const delivery = {
    delivery_address: delivery_address,
    delivery_destination: delivery_destination,
    delivery_comment: delivery_comment,
    isRendu: isRendu,
    isDecharged: isDecharged,
  };
  
    const formData1 = new FormData();
    formData1.append("items", JSON.stringify(items));
    formData1.append("delivery", JSON.stringify(delivery));
    formData1.append("isDecharged", delivery.isDecharged);
    const payload1 = {
      ttcRequest: formData1,
    };

const [ttcResult,setTTc] = useState(0);
    const  calculateTTcResult = dispatchOrders(calculateTTc(payload1))
  .then((total) => {
   setTTc(total) ;
    console.log(total); // This should log the value returned by the API call.
  })
  .catch((error) => {
    console.log(error); // Handle any errors that might occur during the API call.
  });

    // const total = JSON.stringify(dispatchOrders(calculateTTc(payload1)));
    console.log("The total os " + typeof ttcResult);
    console.log("The total os "+ttcResult)
  const handleFileChange = async (event) => {
  const facture = {
    payment_reference: event.reference,
    operator: event.payment_operator,
    payment_mode: event.payment_type,
    payment_date: event.payment_date,
  };

     
    const formData = new FormData();
    formData.append("order_Amount", ttcResult);

    formData.append("customerID", 4);

    formData.append("items", JSON.stringify(items));
    console.log("FILE😍😍");
    console.log(event.payment_justification);
  
    const justificatifFiles = [];


    for (let i = 0; i < event.payment_justification.length; i++) {
      formData.append("justificatif", event.payment_justification[i]);
    }
    formData.append("facture", JSON.stringify(facture));
    formData.append("delivery", JSON.stringify(delivery));
    formData.append("justificatif", JSON.stringify(justificatifFiles));

    // -------------
    ///TRYING TO ADD ORDER
    const payload = {
      orderRequest: formData,
      token: token,
    };

    try {
      dispatchOrders(addOrder(payload));
      dispatchOrders(cartActions.clearCart());
      dispatchOrders(formActions.reinitializeShippingInfos());

      Swal.fire({
        title: "Commande enregistrée!",
        width: 300,
        text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
        icon: "success",
        button: "OK!",
      });
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        timer: 1000,
        timerProgressBar: true,
        customClass: {
          popup: "bg-green-600",
        },
        showConfirmButton: false,
      });
      Toast.fire(
        "Une erreur a été rencontrée, veuillez réessayer!",
        "",
        // text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
        "error"
      );
    }
  };
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
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
                <fieldset>
                  <legend>Paiement</legend>
                  <legend></legend>
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
                      {payModes.map((pay) => {
                        return (
                          <option key={pay.id} value={pay.id}>
                            {pay.libelle}
                          </option>
                        );
                      })}
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
                  {selectedPaymentOpt === "1" ? (
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
                        {operators
                          .filter((operator) => {
                            return operator.type === "OPERATEUR";
                          })
                          .map((operator) => {
                            return (
                              <option
                                key={operator.id}
                                value={operator.id}
                                // onChange={()=>setpayM(oper)}
                              >
                                {operator.name}
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
                  ) : selectedPaymentOpt === "2" ||
                    selectedPaymentOpt === "3" ? (
                    // TODO : TEST WITH OPERATOR ID RATHER THAN WRITING DOWN MANUALLY IT
                    <div className="form-group">
                      Banque :{" "}
                      <select
                        className={`form-select ${
                          errors.payment_operator ? "is-invalid" : ""
                        }`}
                        // required
                        {...register("payment_operator", {
                          required: true,
                        })}
                      >
                        <option value="">-----</option>
                        {operators
                          .filter((operator) => {
                            return operator.type === "BANQUE";
                          })
                          .map((operator) => {
                            return (
                              <option
                                key={operator.id}
                                value={operator.id}
                                // onChange={()=>setpayM(oper)}
                              >
                                {operator.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.payment_operator && (
                        <div>
                          <span className="text text-danger">
                            Vous devez choisir une banque
                          </span>
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
                    <label>Date:</label>
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      className={`form-control 
                    ${errors.payment_date ? "is-invalid" : ""}`}
                      // {...register("payment_date", {
                      //   required: true,
                      // })}
                      // required
                      {...register("payment_date", {
                        required: "La date est requise",
                        max: {
                          value: currentDate,
                          message:
                            "Veuillez sélectionner une date antérieure ou égale à la date courante",
                        },
                      })}
                    />
                  </div>
                  {errors.payment_date && (
                    <span className="text text-danger">
                      {errors.payment_date.message}
                    </span>
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
                        validate: (value) => value == ttcResult,
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
                          {/* {formatPrice(ttcResult)} */}
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
                      onChange={handleFileSelect}
                      // onChange={changeHandler}
                      {...register("payment_justification", {
                        validate: validateFiles,
                        required: true,
                      })}
                      multiple
                    />
                  </div>
                  {errors.payment_justification && (
                    <div>
                      <span className="text text-danger">
                        {errors.payment_justification.message}
                      </span>
                    </div>
                  )}
                </fieldset>{" "}
                <br />
                <hr />
                <hr />
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
            {/* <h2 className="capitalize text-3xl font-bold tracking-wider mb-10 leading-relaxed">
              Bo {name}, <b>Nom client </b>
            </h2> */}
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
              <p className="text-lg capitalize mb-4">Redevance Habitat: </p>
              <span className="italic font-semibold">{formatPrice(rh)}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg capitalize mb-4">TVA: ({tva}%) </p>
              <span className="italic font-semibold">
                {formatPrice(Montant_Tva)}
              </span>
            </div>

            <hr className="my-6" />
            <div className="flex justify-between items-center">
              <p className="text-xl capitalize mb-4 font-bold">
                Montant TTC :{" "}
              </p>
              <span className="italic font-bold">{formatPrice(ttcResult)}</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutContent;
