import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProductImages from "../components/productDetail/ProductImages";
import Stars from "../components/productDetail/Stars";
import PageHero from "../layout/PageHero";
import AddToCart from "../components/productDetail/AddToCart";
import { getProductDetails } from "../store/actions/products-actions";
import { formatPrice } from "../utils/helpers";
import TheSpinner from "../layout/TheSpinner";
// -----------------JUST FOR TEST PURPOSE
import product_img from "../assets/cemiib-ll32-5rce.jpg";
import {
  getCustomerOrdersById,
  getOrders,
  getOrdersById,
} from "../store/actions/oder-action";
// import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { isEmptyArray } from "formik";
import { CardImg, CardSubtitle, CardTitle } from "reactstrap";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const CustomerOrderDetail = (props) => {
  const order = props.orders.find((ord) => ord.order_id === props.order_id);
  //  const formattedDate = new Date(order.order_Date);
  const[showJustificatif, setShowJustificatif] = useState(false);
  const handleShowJustificatif=()=>{
    setShowJustificatif(true)
  }

  // const {
  //   order_id,
  //   order_Date,
  //   order_Amount,
  //   order_status,
  //   deliverRef,
  //   customerRef,
  //   customer,
  //   facture,
  //   orderItems,
  // } = order;
  console.log(order);

  const nbTonnes = 0;

  return (
    <div>
      {order !== undefined ? (
        // {alert(order)}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // className="bg-green-200 "
        >
          <div className="">
            <div className="">
              {/* <div className=" card"> */}
              <Modal.Header
                className="bg-slate-800 modal-header card-header-tabs card-header-success bg-green-500"
                closeButton
              >
                {/* <button className="btn btn-danger">Fermer</button> */}
                <Modal.Title className="card-title text-white">
                  <h4>Details Commande #{order.order_id}</h4>
                  {/* <button className="btn-close" aria-label="Close" type="button"></button> */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="card-body">
                {/* <CardImg src={order.facture.justificatifURI} top alt="uiuiuh" /> */}
                <div className="">
                  <div className="d-flex items-center">
                    <div className="flex-grow border-t h-px mr-3"></div>

                    <span className="bg-green-400 text-white rounded-full p-1.5 uppercase ">
                      Informations du Client
                    </span>
                    <div className="flex-grow border-t h-px mr-3"></div>
                  </div>
                  <div>
                    <b>Client: </b>
                    <span className="uppercase">
                      {order.customer.customerFirstName}
                    </span>{" "}
                    --
                    <span className="uppercase">
                      {order.customer.customerLastName}
                    </span>
                  </div>
                  <div>
                    <b>Numéro: </b>
                    {order.customer.customerPhoneNumber}
                  </div>
                  <div>
                    <b>Addresse: </b>
                    {order.customer.customerAddress}
                  </div>
                </div>
                <br />
                <div className="">
                  {/* <div className="flex my-2 text-sm font-semibold items-center text-gray-800"> */}
                  <div className="d-flex items-center">
                    <div className="flex-grow border-t h-px mr-3"></div>
                    <span className="bg-green-400 text-white rounded-full p-1.5 uppercase ">
                      Details Commande
                    </span>

                    <div className="flex-grow border-t h-px mr-3"></div>
                  </div>

                  <div>
                    <b>Date: </b>
                    {order.order_Date}
                  </div>
                  <div>
                    <b>Montant TTC: </b>
                    <span className="uppercase">
                      {formatPrice(order.order_Amount)}
                    </span>
                  </div>
                  <div>
                    <b>Nombre d'articles: </b>
                    {order.orderItems.length}
                  </div>
  <br />
                  <div>
                    <div className="">
                    
                      <h1 className="border border-green-700   rounded-full p-1.5 shadow-md shadow-green-300">
                        Réglement
                      </h1>
                    </div>
                    <div>
                      <b>Type: </b>
                      {order.facture.payment_type}
                    </div>
                    <div>
                      <b>Statut : </b>
                      {order.facture.paymentStatus}
                    </div>
                    <div>
                      <b>Reference: </b>
                      {order.facture.payment_reference}
                    </div>
                    {order.facture.payment_type === "TRANSFERT" ? (
                      <div>
                        <b>Operateur: </b>
                        {order.facture.operator.operator_name}
                      </div>
                    ) : (
                      <div>
                        <b>Banque: </b>
                        {order.facture.payment_bank}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div className="border border-green-700 rounded-full shadow-md shadow-green-300 ">
                      <h1 className="  p-2">Produits commandés</h1>
                    </div>
                    <br />
                    {order.orderItems.map((item) => {
                      return (
                        <ol key={item.id}>
                          <li>
                            <b>Nom :</b>{item.product.product_label}
                          </li>
                          <li>
                            <b>PU:</b>
                            {formatPrice(item.product.product_price)}
                          </li>
                          <li>
                            <b>Quantité:</b> {item.quantity} <i>TON</i>
                          </li>
                          <li>
                            <br />
                          </li>
                          {/* <div className="deide-y devide-dashed"></div>
                          <div className=""></div>
                          <div className="hr hr-blurry"></div> */}
                          <div className="flex-grow border-t h-px mr-3"></div>
                        </ol>
                      );
                    })}
                  </div>
                  {order.delivery !== null && (
                    <div className="">
                      <div className="border border-green-700 rounded-full shadow-md shadow-green-300">
                        <h1 className=" p-1.5">Livraison</h1>
                      </div>
                      <div>
                        <b>Destination :</b>
                        {order.delivery.delivery_destination}
                      </div>
                      <div>
                        <b>Adresse :</b>
                        {order.delivery.delivery_address}
                      </div>
                      <div>
                        <b>Commentaire :</b> {order.delivery.delivery_comment}
                      </div>

                      {order.delivery.decharged && (
                        <div>
                          <b>Déchargement :</b>OUI
                        </div>
                      )}

                      <br />
                      <div className="hr hr-blurry"></div>
                    </div>
                  )}
                  <div>
                    <button
                      className="btn btn-success showJusttificatif"
                      onClick={() => handleShowJustificatif()}
                    >
                      <b>Voir justificatif: </b>
                      {/* <img src={order.facture.justificatifURI} /> */}
                    </button>
                  </div>
                  <Modal
                    show={showJustificatif}
                    onHide={() => setShowJustificatif(false)}
                    className=" modal-xl"
                  >
                    <Modal.Header
                      closeButton
                      className="bg-slate-800 text-white"
                    >
                      <Modal.Title>Justificatif de paiement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img
                        src={order.facture.justificatifURI}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Modal.Body>
                  </Modal>
                </div>
              </Modal.Body>
              {/* </div> */}
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomerOrderDetail;
