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

// import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { isEmptyArray } from "formik";
import { CardImg, CardSubtitle, CardTitle,Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, Table } from "reactstrap";
import { AiFillFile } from "react-icons/ai";
// import { Carousel } from "@material-tailwind/react";
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
  const token = localStorage.getItem("token");
  const order = props.orders.find((ord) => ord.order_id === props.order_id);
  //  const formattedDate = new Date(order.order_Date);
  const [showJustificatif, setShowJustificatif] = useState(false);
  const handleShowJustificatif = () => {
    setShowJustificatif(true);
  };
  const [activeIndex, setActiveIndex] = useState(0);
   const [animating, setAnimating] = useState(false);

 const next = () => {
   if (animating) return;
   const nextIndex =
     activeIndex === order.facture.justificatifURIs.length - 1
       ? 0
       : activeIndex + 1;
   setActiveIndex(nextIndex);
 };

 const previous = () => {
   if (animating) return;
   const nextIndex =
     activeIndex === 0
       ? order.facture.justificatifURIs.length - 1
       : activeIndex - 1;
   setActiveIndex(nextIndex);
 };

 const goToIndex = (newIndex) => {
   if (animating) return;
   setActiveIndex(newIndex);
 };

  console.log(order);

  let nbTonnes = 0;

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
                  <h4> Commande #{order.order_id}</h4>
                  {/* <button className="btn-close" aria-label="Close" type="button"></button> */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="card-body">
                <Row className="flex gap-6">
                  <Col className="">
                    <div className="d-flex items-center"></div>
                    <h1 className="text-xl font-bold">Client</h1>
                    <div className="pl-4">
                      {" "}
                      <div>
                        <span className="uppercase">{order.customer.name}</span>{" "}
                        &nbsp;
                        <span className="uppercase">
                          {order.customer.surname}
                        </span>
                      </div>
                      <div>{order.customer.phoneNumber}</div>
                      <div>{order.customer.address}</div>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    {order.delivery !== null && (
                      <div className="">
                        <h1 className=" text-xl font-bold">Livraison</h1>
                        <div className="pl-4">
                          {" "}
                          <div>{order.delivery.destination.nom} &nbsp;</div>
                          <div>{order.delivery.delivery_address}</div>
                          <div>
                            <b>Statut: </b> &nbsp;{order.order_status}
                          </div>
                          {order.order_status == "LIVREE" ||
                            (order.order_status == "PARTIELLEMENT_LIVREE" && (
                              <div>
                                {" "}
                                <div>
                                  <b>Conducteur</b> : {order.delivery.driver}
                                </div>
                                <div>
                                  <b>Immatriculation</b> :{" "}
                                  {order.delivery.truckIM}
                                </div>
                                <div>
                                  <b> Date de livraison</b> :{" "}
                                  {order.delivery.deliverDate}
                                </div>
                                <div>
                                  <b> Quantité livrée </b> :{" "}
                                  {order.delivery.deliveredQuantity}
                                </div>
                              </div>
                            ))}
                          {order.delivery.decharged && (
                            <div>
                              <b>Déchargement :</b>OUI
                            </div>
                          )}
                          {order.delivery.delivery_comment !== "" && (
                            <div>
                              <b>Commentaire :</b>
                              {order.delivery.delivery_comment}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>

                <Row className="flex gap-8 pt-5">
                  {" "}
                  <Col>
                    {" "}
                    <div className="text-xl font-bold">Détails Commande</div>
                    <div>
                      <b>Statut: </b>
                      {order.order_status}
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
                  </Col>
                  <Col>
                    <div className="">
                      <h1 className="text-xl font-bold">Réglement</h1>
                    </div>
                    <div>
                      <b>Type: </b>
                      {order.facture.paymenType.libelle}
                    </div>
                    <div>
                      <b>Statut : </b>
                      {order.facture.paymentStatus}
                    </div>
                    <div>
                      <b>Reference: </b>
                      {order.facture.payment_reference}
                    </div>

                    <div>
                      <b>{order.facture.paymentModes.type.toLowerCase()} : </b>
                      {order.facture.paymentModes.name}
                    </div>
                  </Col>
                </Row>

                <div className="pt-5">
                  <h1 className=" text-xl p-2 font-bold">Produits commandés</h1>
                  <Table>
                    <thead>
                      <tr>
                        <th>&nbsp;</th> <th>#</th>
                        <th>Nom</th>
                        <th>Prix Unitaire</th>
                        <th>
                          Quantité &nbsp;(<i>TON</i>)
                        </th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item) => {
                        {
                          nbTonnes += item.quantity;
                        }
                        return (
                          <tr key={item.id}>
                            <td></td>
                            <td>{item.product.id}</td>
                            <td>{item.product.product_label}</td>
                            <td>
                              {formatPrice(item.product.tarification.montant)}
                            </td>
                            <td>{item.quantity}</td>
                            <td>
                              {formatPrice(
                                item.quantity * item.tarification.montant
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {order.delivery !== null && (
                        <tr>
                          <th>Livraison</th> <td></td>
                          <td>{order.delivery.destination.nom}</td>
                          <td>
                            {formatPrice(
                              order.delivery.destination.tarification.montant
                            )}{" "}
                            / TON
                          </td>
                          <td>{nbTonnes}</td>
                          <td>
                            {formatPrice(
                              order.delivery.destination.tarification.montant *
                                nbTonnes
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div>
                  <button
                    className=" 
                    group rounded-2xl h-12 w-48  text-lg relative overflow-hidden
                    
                    bg-green-400 text-white showJusttificatif flex hover:text-black hover:border-2"
                    onClick={() => handleShowJustificatif()}
                  >
                    <AiFillFile />
                    <b>Voir justificatif : </b>
                  </button>
                </div>
                <Modal
                  show={showJustificatif}
                  onHide={() => setShowJustificatif(false)}
                  className=" modal-xl"
                >
                  <Modal.Header closeButton className="bg-slate-800 text-white">
                    <Modal.Title>Justificatif de paiement</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* {order.factyre.justificatifURIs.length} */}
                    <Carousel
                      activeIndex={activeIndex}
                      next={next}
                      className="rounded-full"
                      previous={previous}
                      // {...args}
                    >
                      <CarouselIndicators
                        items={order.facture.justificatifURIs}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                      />
                      {order.facture.justificatifURIs.map(
                        (justificatifURI, index) => (
                          <CarouselItem
                            // className="w-100 d-block"
                            key={index}
                            onExiting={() => setAnimating(true)}
                            onExited={() => setAnimating(false)}
                          >
                            <img
                              src={justificatifURI}
                              headers={{ Authorization: `Bearer ${token}` }}
                              alt={`Justificatif ${index + 1}`}
                            />
                            <CarouselCaption
                              captionText={index + 1}
                              captionHeader={"item.caption"}
                            />
                            {/* <div>{justificatifURI}</div>
                            <div>{order.facture.justificatifURIs[1]}</div> */}
                          </CarouselItem>
                        )
                      )}

                      <CarouselControl
                        direction="prev"
                        directionText="Précédent"
                        onClickHandler={previous}
                        className="bg-slate-600 border-2 rounded-full w-5"
                      />
                      <CarouselControl
                        direction="next"
                        directionText="Suivant"
                        onClickHandler={next}
                        className="bg-slate-600 border-2 rounded-full w-5"
                      />
                    </Carousel>
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
              </Modal.Body>
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
