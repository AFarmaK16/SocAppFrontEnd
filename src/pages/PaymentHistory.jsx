import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TheSpinner from "../layout/TheSpinner";
import PageHero from "../layout/PageHero";
import { formatPrice } from "../utils/helpers";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {
  getCustomerOrders,
  getOrders,
  getOrdersById,
} from "../store/actions/oder-action";
import { FaSearch } from "react-icons/fa";
import { isEmptyArray } from "formik";
import { GiCardKingHearts } from "react-icons/gi";
import { MdDetails } from "react-icons/md";

const PaymentHistory = () => {
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
  const { productId } = useParams();
  const nbTonnes = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrders(4));
  }, [dispatch, 4]);

  const loading = useSelector((state) => state.ui.customerOrdersLoading);
  const orders = useSelector((state) => state.orders.filteredOrders);
  // alert(product)
  // console.log("ord:")
  console.log(orders);

  return (
    <div>
      <motion.div
        className="mb-48"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PageHero title={"Mes Factures "} order />
        <div className="mt-16 space-y-16 w-[80vw] mx-auto">
          {isEmptyArray(orders) ? (
            <div>
              <h4>Il semble que vous n'ayez pas encore passé de commande</h4>{" "}
              <Link
                to="/products"
                className="uppercase  px-4 py-2 rounded text-green font-semibold shadow-lg"
              >
                Passer une commande
              </Link>
              <TheSpinner />
            </div>
          ) : (
            <Card>
              <CardHeader>Impayee/10 ECHUES/ 12 ENCOURS/57</CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <b>Facture N°</b>
                      </td>
                      <td>
                        <b>Date Facture</b>
                      </td>
                      <td>
                        <b>Réference paiement</b>
                      </td>
                      <td>
                        <b>Type de paiement</b>
                      </td>
                      <td>
                        <b>Statut</b>
                      </td>
                      <td>
                        <b>Commande concernée</b>
                      </td>
                      <td>
                        <b>Montant TTC </b>
                      </td>
                      <td>
                        <b>Actions </b>
                      </td>
                    </tr>
                    {orders.map((order) => {
                      const {
                        order_id,
                        order_Date,
                        order_Amount,
                        order_status,
                        customer,
                        orderItems,
                        facture,
                      } = order;
                      const formattedPayDate = new Date(facture.payment_date);
                      // console.log(facture)
                      return (
                        <tr key={facture.id}>
                          <td>
                            {" "}
                            <h1>{facture.id}</h1>
                          </td>
                          <td>
                            <h4 className="mb-0 font-normal">
                              {formattedPayDate.toLocaleString("fr-FR")}
                            </h4>
                          </td>
                          <td>
                            <h4>{facture.payment_reference}</h4>
                          </td>
                          <td>
                            {" "}
                            <h4>{facture.paymentModes.libelle}</h4>
                          </td>
                          <td>
                            <Badge
                              color={`${
                                facture.paymentStatus === "PAYEE"
                                  ? "success"
                                  : facture.paymentStatus === "IMPAYEE"
                                  ? "warning"
                                  : facture.paymentStatus === "ECHUE"
                                  ? "danger"
                                  : "primary"
                              }`}
                              className="text-white"
                              
                            >
                              {facture.paymentStatus}
                            </Badge>
                          </td>
                          <td>
                            <h4 className="mb-0 font-normal">N°{order_id}</h4>
                          </td>
                          <td>
                            {" "}
                            <h4 className="mb-0 font-normal">
                              {formatPrice(order_Amount)}
                            </h4>
                          </td>
                          {/* <footer className="flex mt-4 justify-between items-center">
                      <img src={facture.justificatifURI} alt="justificatif" />
                    </footer> */}
                          <td>
                            {" "}
                            <Link to="#" className="btn btn-success">
                              {/* Voir details */}
                              Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </div>{" "}
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
