import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TheSpinner from "../../layout/TheSpinner";
import PageHero from "../../layout/PageHero";
import { formatPrice } from "../../utils/helpers";
import CustomerOrderDetail from "../../pages/CustomerOrderDetail";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupText,
  Table,
} from "reactstrap";

import {
  getCustomerOrders,
  getOrders,
  getOrdersById,
} from "../../store/actions/oder-action";
import { FaSearch } from "react-icons/fa";
import { isEmptyArray } from "formik";

const OrderHistory = () => {
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
    dispatch(getCustomerOrders(1));
  }, [dispatch, 1]);
    
  const [modalShow, setModalShow] = useState(false);
  
  const [search, setSearch] = useState("");
  
  const [selectedOrder, setselectedOrder] = useState();
  const loading = useSelector((state) => state.ui.customerOrdersLoading);
  const orders = useSelector((state) => state.orders.filteredOrders);
  let count = 0;
  for (const order in orders) {
    if (orders[order].order_status === "ATTENTE") {
      count++;
    }
  }
  // alert(product)
  // console.log("ord:")
  console.log(loading);

  return (
    <div>
      <motion.div
        className="mb-48"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PageHero title={"Mes Commandes "} order alert={count} />
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
            <div>
              {/* {orders.map((order) => {
                const {
                  order_id,
                  order_Date,
                  order_Amount,
                  order_status,
                  customer,
                  orderItems,
                  facture,
                } = order;
                const formattedDate = new Date(order_Date); */}
                {/* return ( */}
                  <Card>
                    <CardHeader>
                      <InputGroup>
                        <InputGroupText>
                          <FaSearch />
                        </InputGroupText>
                        <Input
                          placeholder="Tapez le nom du client "
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </CardHeader>
                    <CardBody>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Nb produits</th>
                            <th>Statut</th>
                            <th>Montant TTC</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders
                            .filter((order) => {
                              return search.toLowerCase() === ""
                                ? order
                                : order.customer.customerFirstName
                                    .toLowerCase()
                                    .includes(search);
                            })
                            .map((order) => {
                              const {
                                order_id,
                                order_Date,
                                order_Amount,
                                order_status,
                                customer,
                                orderItems,
                                facture,
                              } = order;
                              const formattedDate = new Date(order_Date);
                              return (
                                <tr key={order_id}>
                                  <td>{order_id}</td>
                                  <td>
                                    {formattedDate.toLocaleString("fr-FR")}
                                  </td>
                                  <td>{orderItems.length}</td>
                                  <td>
                                    <Badge
                                      color={`${
                                        order_status === "VALIDEE"
                                          ? "success"
                                          : order_status === "ATTENTE"
                                          ? "warning"
                                          : order_status === "ANNULEE"
                                          ? "danger"
                                          : "primary"
                                      }`}
                                      className="text-white"
                                      pill
                                    >
                                      {order_status}
                                    </Badge>
                                  </td>
                                  <td>{formatPrice(order_Amount)}</td>
                                  {/* <footer className="flex mt-4 justify-between items-center">
                <img src={facture.justificatifURI} alt="justificatif" />
              </footer> */}
                                  <td>
                                    <button
                                      className="btn btn-success "
                                      onClick={() => {
                                        setModalShow(true);
                                        setselectedOrder(order_id);
                                      }}
                                    >
                                      Details
                                      {/* <BiDotsHorizontal color="white" /> */}
                                    </button>{" "}
                                  </td>
                                </tr>
                                // </CardBody>
                              );
                            })}
                        </tbody>
                      </Table>
                      <CustomerOrderDetail
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        orders={orders}
                        order_id={selectedOrder}
                      />
                    </CardBody>
                  </Card>
                {/* );
              })} */}
            </div>
          )}
        </div>{" "}
      </motion.div>
    </div>
  );
};

export default OrderHistory;
