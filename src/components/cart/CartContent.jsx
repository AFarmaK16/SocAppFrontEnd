import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { cartActions } from "../../store/cart-slice";
import { formatPrice } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import {
  //  getBanks, 
   getDestinations } from "../../store/actions/oder-action";
import { formActions } from "../../store/form-slice";
import { Alert, Card, CardBody } from "reactstrap";

const CartContent = ({
  message,
  setDeliveryData,
  deliveryData,
  cart,
  handleDelivery,
  totalPrice,
  totalQuantity,
}) => {
  const tva = 18 / 100;
    const totalRedevance = totalQuantity * 2000;
    const totalTaxeCons = 3000 * totalQuantity;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  const destinations = useSelector((state) => state.orders.destinations);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isRenduChecked, setRenduChecked] = useState(false);
  const [dechargement, setDechargement] = useState(0);
  const [transport, setTransport] = useState(0);

  const [totalP, setTotalP] = useState(totalPrice);
  const [isDechargeChecked, setDechargeChecked] = useState(false);

  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };
      console.log("tot bi " + totalPrice);
  const handleRendu = (tarif) => {
    // alert(isRenduChecked)
    //  if (!isRenduChecked) {

    setTotalP(totalPrice + tarif * totalQuantity.toFixed(2));

    setTransport(tarif * totalQuantity.toFixed(2));

    // alert(dest);

    // setTotal(finalTotal - transport - dechargement);
    //  } else {
    //    console.log("Rendu checked");
    //    setTotal(finalTotal + transport);
    //  }
  };
  // const [dest, setDestination] = useState(0);
  // console.log(dest);
  const handleDecharg = (e) => {
    //if rendu is unchecked
    //  dechargement = 400 * totalQuantity.toFixed(2);
    setTotalP(totalP - totalQuantity.toFixed(2) * 400);
    // setTotalP(totalP + totalQuantity.toFixed(2) * 400);
    //    const payload = {

    //      totalPrice,
    //    };
    //  dispatch(cartActions.addDecharg());
    // setRenduChecked(e.target.checked);
    // if (isDechargeChecked) {
    //   finalTotal += dechargement;
    // } else {
    // 😀
    // setTotal(finalTotal - dechargement);
    //  += ;
    console.log(totalPrice + " ehh manla");
    // }
    // console.log(" rendu " + e.target.checked);
  };
      const Montant_Tva =
        totalP * tva + transport * tva + dechargement * tva + totalRedevance*tva+totalTaxeCons*tva;
      const ttc = totalP + Montant_Tva + transport + dechargement+totalRedevance+totalTaxeCons;
  const handleFormSubmit = async (event) => {
    //  const { name, value } = event.target;
    // setDeliveryData((deliveryData)=>({
    //   ...deliveryData,
    //    [name]: value,
    // }));
    // const formData = new FormData(event.target);
    // const formValues = Object.fromEntries(formData.entries());



    console.log("CONTENU");
    console.log(event);
    // alert("youpiii" + totalQuantity.toFixed(2));
    // console.log(JSON.stringify(cart) + "'😀");
    const payload = {
      delivery_address: event.adresse,
      delivery_destination: event.destination,
      delivery_comment: event.comm,
      isRendu: isRenduChecked,
      isDecharged: isDechargeChecked,
      ttc: ttc,
      Montant_Tva: Montant_Tva,
    };
    dispatch(formActions.saveShippingInfos(payload));
  };
  return (
    <div className="mb-40 ">
      <h2 className="uppercase text-3xl tracking-wide text-center my-8">
        Mon Panier
      </h2>
      <div className="flex justify-between my-12">
        <div>
          <Link
            to="/products"
            className="text-white uppercase px-4 py-2 rounded-md shadow-lg btn btn-success"
          >
            Poursuivre Achat
          </Link>
        </div>
        {/* {message != undefined && (
          <div>
            <Alert color="warning">{message}</Alert>
          </div>
        )} */}
        <div>
          <button
            onClick={clearCart}
            className="text-white uppercase px-4 py-2 rounded-md shadow-lg btn btn-success"
          >
            Vider Panier
          </button>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-2 lg:pr-6">
          <Card>
            <CardBody>
              <CartItem cart={cart} />
            </CardBody>
          </Card>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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

                      // setTotal(finalTotal + transport);
                      if (!e.target.checked) {
                        setTotalP(totalP - transport - dechargement);
                        console.log(
                          totalP -
                            transport -
                            dechargement +
                            " cAUSE DECHARGEM " +
                            dechargement
                        );
                        setTransport(0);
                        setDechargement(0);
                        // setDechargeChecked(false);
                        // setDechargement(0);
                        // // setTotal(finalTotal - dechargement);
                        // handleRendu();
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
                    Destination :{" "}
                    <select
                      name="destination"
                      id=""
                      className={`form-select ${
                        errors.destination ? "is-invalid" : ""
                      }`}
                      // required
                      {...register("destination", {
                        required: true,
                        min: 1,
                      })}
                      onChange={(e) => {
                        console.log(" MIGUI " + e.target.value);
                        let tarif = 0;
                        if (Number(e.target.value) !== 0) {
                          tarif = destinations.find(
                            (des) => des.id === Number(e.target.value)
                          ).tarification.montant;
                        }
                        //se charge
                        handleRendu(tarif);
                        //  console.log(e.target.value===0+" 😀")
                        // console.log(
                        //   destinations.find(
                        //     (dest) => dest.id === e.target.value
                        //   ) +
                        //     "😂😁" +
                        //     typeof (e.target.value) +
                        //     " de ladone "
                        // );
                      }}
                    >
                      <option value="0">-----</option>
                      {destinations.map((destination) => {
                        return (
                          <option key={destination.id} value={destination.id}>
                            {destination.nom} &raquo;{" "}
                            {destination.tarification.montant} / TON
                          </option>
                        );
                      })}
                    </select>
                    {errors.destination && (
                      <div>
                        <span className="text text-danger">
                          Destination invalide
                        </span>
                      </div>
                    )}
                  </div>

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
                      <span className="text text-danger">Adresse invalide</span>
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
                      <span className="text text-danger">Saisie invalide</span>
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
                          // setDechargement(totalQuantity.toFixed(2) * 400);
                          // setTotal(finalTotal + totalQuantity.toFixed(2) * 400);
                          setTotalP(totalP + totalQuantity.toFixed(2) * 400);
                          setDechargement(totalQuantity.toFixed(2) * 400);
                          console.log(dechargement);

                          if (!e.target.checked) {
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
            <div className="w-[80%] m-auto border rounded">
              <button
                className="capitalize py-3 text-xl font-bold tracking-widest text-primary bg-secondary-100 w-full drop-shadow-2xl"
                type="submit"
              >
                Valider mon panier
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 mb-10">
          <CartSummary
            totalPrice={totalP}
            transport={transport}
            dechargement={dechargement}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
