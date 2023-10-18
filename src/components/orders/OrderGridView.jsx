import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaPlus, FaSearch } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
// import product_img from "../assets/CEMIIB-LL32-5RCE.jpg";
import product_img from "../../assets/cemiib-ll32-5rce.jpg";
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
  Toast,
  ToastBody,
  ToastHeader,
  Tooltip,
} from "reactstrap";
import CustomerOrderDetail from "../../pages/CustomerOrderDetail";
import {
  ArrowCircleDownIcon,
  ArrowDownIcon,
  ArrowNarrowDownIcon,
  ArrowSmDownIcon,
  CheckIcon,
  DesktopComputerIcon,
  DotsHorizontalIcon,
  FilterIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";
import { BiDotsHorizontal, BiFilter, BiFilterAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, validateOrder } from "../../store/actions/oder-action";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { BsFilterLeft } from "react-icons/bs";
// import { Tab, Tabs } from "react-bootstrap";

const OrderGridView = ({ orders }) => {
  const { isAdmin, isCustomer, isComm, isAdv } = useSelector(
    (state) => state.auth
  );
  const token = localStorage.getItem("token");
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setselectedOrder] = useState();
  const dispatchOrders = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [filtre, setFilter] = useState("all");
  const changeFilter = (option) => {
    setFilter(option);
  };
  let pendingOrders = 0;
  let validOrders = 0;
  let deliveredOrders = 0;

  for (const order in orders) {
    if (orders[order].order_status === "ATTENTE") {
      pendingOrders++;
    }
    if (orders[order].order_status === "VALIDEE") {
      validOrders++;
    }
    if (orders[order].order_status === "LIVREE") {
      deliveredOrders++;
    }
  }
  // console.log(pendingOrders + "/" + validOrders + "/" + deliveredOrders);
  function handleValidation(id) {
    Swal.fire({
      title: "Validation commande",
      icon: "question",
      html: `<hr/><p>Voulez vous valider la commande #${id}? </p>`,
      showCancelButton: true,
      width: 300,
      cancelButtonText: "Annuler",
      confirmButtonText: "Valider",
      confirmButtonColor: "#198754",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        // console.log(`gunaydin Ögrençi ${id}`);
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
        try {
          dispatchOrders(validateOrder(id));

          Toast.fire(
            `Commande validée avec succés!`,
            "",
            // text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
            "success"
          ).then(function () {
            window.location.reload();
          });
        } catch (error) {
          Toast.fire(
            "Une erreur a été rencontrée, veuillez réessayer!",
            "",
            // text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
            "error"
          );
        }
      }
    });
  }
  function calculateTotalQuantity(orderItems) {
    let totalQuantity = 0;

    if (orderItems && Array.isArray(orderItems)) {
      for (const orderItem of orderItems) {
        if (orderItem && orderItem.quantity) {
          totalQuantity += orderItem.quantity;
        }
      }
    }

    return totalQuantity;
  }

  function editOrderState(order) {
    console.log(order);
    const totalQuantity = calculateTotalQuantity(order.orderItems);
      const currentDeliveredQuantity = order.delivery.deliveredQuantity
        ? order.delivery.deliveredQuantity
        : 0;
      console.log("CURRENT DELIVERED " + order.delivery.deliveredQuantity);
    const driverNames = [
      "Abdou Fall",
      "Mamadou Diop",
      "Cheikh Mbaye",
      "Ousmane Kane",
      "Boubacar Traore",
      "Ibrahim Faye",
      "Moussa Tall",
      "Aliou Cisse",
    ];
    Swal.fire({
      icon: "info",
      width: 300,
      title: `<hr/><p>Planifié livraison de la commande <b> #${order.order_id} </b> </p>`,
      html: `
      <hr/>
      <form id="deliveryForm">
        <div class="form-group">
          <label for="driver">Chauffeur :</label>
         <select class="form-control" id="swal-input1" required>
          ${driverNames
            .slice(0, 5)
            .map((name) => `<option value='${name}'>${name}</option>`)
            .join("")}
        </select>
        </div>
        <div class="form-group">
          <label for="truckRegistration">Immatriculation du camion :</label>
          <input type="text" class="form-control" id="swal-input2" required>
        </div>
        
        <div class="form-group">
          <label for="date">Date :</label>
          <input type="date" class="form-control" id="swal-input3" required>
        </div>
         <div class="form-group">
      <label for="deliveredQuantity">Quantité livrée :</label>
      <input type="number" class="form-control" id="swal-input4" value = '${totalQuantity}' required>
    <span>Quantité déjà livrée: ${currentDeliveredQuantity} &nbsp; TON</span>
      </div>
      </form>
    `,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Enregistrer",
      confirmButtonColor: "#198754",
      cancelButtonColor: "red",
      allowOutsideClick: false,
      preConfirm: () => {
        const driver = document.getElementById("swal-input1").value;
        const truckRegistration = document.getElementById("swal-input2").value;

        const date = document.getElementById("swal-input3").value;
        const today = new Date().toISOString().split("T")[0];

        if (date < today) {
          Swal.showValidationMessage(
            "La date ne peut pas être antérieure à la date d'aujourd'hui"
          );
        }
        if (!/^[A-Za-z0-9-]+\s*$/i.test(truckRegistration)) {
          Swal.showValidationMessage(
            "Numéro d'immatriculation du camion invalide"
          );
        }

        if (!/^[A-Za-z\s]+$/.test(driver)) {
          Swal.showValidationMessage("Nom du chauffeur invalide");
        }
        const deliveredQuantity = parseFloat(
          document.getElementById("swal-input4").value
        );

        // Verify if the entered quantity exceeds the total quantity
        // if (deliveredQuantity  > totalQuantity) {
        if (deliveredQuantity + currentDeliveredQuantity > totalQuantity) {
          Swal.showValidationMessage(
            `La quantité livrée ne peut pas dépasser la quantité totale.(${totalQuantity})\n Maximum valide ${
              totalQuantity - currentDeliveredQuantity
            }`
          );
        }
        return {
          truckRegistration: truckRegistration,
          driver: driver,
          date: date,
        };
      },
    }).then((response) => {
      if (response.isConfirmed) {
        const deliveryDetails = response.value;
        const payload = {
          deliverRequest: {
            driver: document.getElementById("swal-input1").value,
            truckIM: document.getElementById("swal-input2").value,
            deliverDate: document.getElementById("swal-input3").value,
            deliveredQuantity: document.getElementById("swal-input4").value,
          },
          id: order.order_id,
          token: token,
        };
        //Action to perform when the user clicks on the confirm button

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

        try {
          dispatchOrders(deliverOrder(payload));

          Toast.fire("Modification effectuée avec succès!", "", "success").then(
            function () {
              // window.location.reload();
            }
          );
        } catch (error) {
          Toast.fire(
            "Une erreur a été rencontrée, veuillez réessayer!",
            "",
            "error"
          );
        }
      }
    });
  }

  return (
    <div className="mt-16 space-y-16 w-[80vw] mx-auto">
      <Card>
        <CardHeader className="flex items-center p-6 space-x-6  rounded-xl  bg-transparent ">
          <div className="flex py-3 gap-2">
            <BsFilterLeft />
            <span>Commandes: </span>
            <select
              className=" inline-block  rounded-md font-semibold"
              name=""
              id=""
              onChange={(e) => changeFilter(e.target.value)}
            >
              {/* <option value="all">Tout</option>
            <option value="VALIDEE"> Validées</option> */}
              <option className="  rounded-full " value={"all"}>
                Toutes
              </option>{" "}
              {isAdv && (
                <option className="   rounded-full " value={"ATTENTE"}>
                  En Attente{" "}
                </option>
              )}
              <option className="  rounded-full " value={"VALIDEE"}>
                Validées
              </option>{" "}
              <option className="  rounded-full " value={"LIVREE"}>
                Totalement Livree
              </option>
              <option
                className="  rounded-full "
                value={"PARTIELLEMENT_LIVREE"}
              >
                Partiellement Livree
              </option>
            </select>
          </div>
          <div className="rounded-lg  w-72 p-4 bg-white flex  transform hover:scale-105 transition duration-500">
            {/* <InputGroupText> */}
            <FaSearch />
            {/* </InputGroupText> */}
            <input
              className=" rounded-lg  w-72 outline-none "
              placeholder="Tapez le nom du client "
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* <div className="pr-2">
            {" "}
            <span className="flex border-green-600 border-2 text-green-600 font-bold px-3 py-2 ml-2 rounded-full shadow-sm">
              <ArrowCircleDownIcon className="h-5 w-5" /> Exporter
            </span>
          </div> */}

          {/* <Toast>
            <ToastHeader>UDIS</ToastHeader>
            <ToastBody>Lorem dsu</ToastBody>
          </Toast> */}
          {/* <Tabs 
          de 
          >*/}

          {/* </Tabs> */}
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-4 gap-4">
            {/* <div>
              Total: &nbsp;
              <span className="    rounded-md bg-white p-2">
                {orders.length}
              </span>
            </div> */}
            <div className=" ">
              {" "}
              Total: &nbsp;
              <span className="   rounded-md bg-blue-200 text-blue-700  p-2 ">
                {isComm ? (
                  <span>{validOrders}</span>
                ) : (
                  <span>{orders.length}</span>
                )}
              </span>
            </div>

            <div>
              {" "}
              Livrées: &nbsp;
              <span className="    rounded-md bg-blue-100 text-blue-600  p-2">
                {deliveredOrders}
              </span>
            </div>
            {/* {isAdv && ( */}
            <div>
              {" "}
              Validées : &nbsp;
              <span className="    rounded-md bg-green-100 text-green-600  p-2">
                {validOrders}
              </span>
            </div>
            {/* )} */}
            {isAdv && (
              <div>
                {" "}
                En attente : &nbsp;
                <span className="    rounded-md bg-yellow-100 text-yellow-600  p-2">
                  {pendingOrders}
                </span>
              </div>
            )}
            <div className="relative right-0">
              {/* <ul className="relative flex list-none flex-wrap rounded-lgp-1 gap-2"> */}{" "}
              {/* <button
                className="btn  rounded-full "
                onClick={() => changeFilter("all")}
              >
                Tout
              </button>{" "}
              <button
                className="btn  rounded-full "
                onClick={() => changeFilter("VALIDEE")}
              >
                Validées
              </button>{" "}
              <button
                className="btn  rounded-full "
                onClick={() => changeFilter("LIVREE")}
              >
                Livrées
              </button> */}
              {/* <Tabs>
            <TabsHeader>
              <Tab>ORANGE</Tab>
            </TabsHeader>
          </Tabs> */}
              {/* {isAdv && (
                <button
                  className="btn   rounded-full "
                  onClick={() => changeFilter("ATTENTE")}
                >
                  En Attente
                </button>
              )} */}
              {/* <li className="z-30 flex-auto text-center"></li> */}
            </div>
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenom</th>
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
                  if (isComm) {
                    return order.order_status !== "ATTENTE";
                  } else {
                    return order;
                  }
                })
                .filter((order) => {
                  if (filtre === "all") {
                    return order;
                  } else {
                    console.log(orders);
                    return order.order_status === filtre;
                  }
                })
                .filter((order) => {
                  return search.toLowerCase() === ""
                    ? order
                    : order.customer.name.toLowerCase().includes(search);
                })
                .map((order) => {
                  const {
                    order_id,
                    order_Date,
                    order_Amount,
                    order_status,
                    customer,
                    orderItems,
                    delivery,
                    facture,
                  } = order;
                  const formattedDate = new Date(order_Date);
                  return (
                    <tr key={order_id}>
                      <td>{order_id}</td>
                      <td>{customer.name.toUpperCase()}</td>
                      <td>{customer.surname.toUpperCase()}</td>
                      <td>{formattedDate.toLocaleString("fr-FR")}</td>
                      <td>{orderItems.length}</td>
                      <td>
                        <span
                          className={`rounded-full lowercase ${
                            order_status === "VALIDEE"
                              ? "bg-green-200 text-green-700"
                              : order_status === "ATTENTE"
                              ? "bg-yellow-100 text-yellow-600"
                              : order_status === "ANNULEE"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {order_status}
                        </span>
                      </td>
                      <td>{formatPrice(order_Amount)}</td>
                      <td className="flex gap-4">
                        <span
                          className="btn flex bg-green-200  text-green-800"
                          onClick={() => {
                            setModalShow(true);
                            setselectedOrder(order_id);
                          }}
                        >
                          Details
                          {/* <BiDotsHorizontal color="white" /> */}
                        </span>{" "}
                        {/* <div className="vr mx-2 ml-2"></div> */}
                        {order_status === "ATTENTE" ? (
                          isAdv ? (
                            <button
                              className="btn flex bg-blue-200  text-blue-800"
                              onClick={() => {
                                handleValidation(order_id);
                              }}
                            >
                              Valider
                            </button>
                          ) : (
                            <AiOutlineEdit />
                          )
                        ) : (
                          ""
                        )}
                        {(order_status === "VALIDEE" && delivery !== null) ||
                        (isComm && order_status === "PARTIELLEMENT_LIVREE") ? (
                          //  (
                          // isComm &&
                          // (order_status !== "LIVREE" ||
                          //   order_status === "PARTIELLEMENT_LIVREE") ?
                          <button
                            className="btn flex bg-slate-200  text-white-800"
                            onClick={() => {
                              editOrderState(order);
                            }}
                          >
                            <PencilAltIcon
                              className="h-5 w-5"
                              id="deliveredOrder"
                            />
                            <Tooltip
                              autohide
                              flip
                              isOpen={tooltipOpen}
                              target={"deliveredOrder"}
                              toggle={toggle}
                            >
                              Marquer comme{" "}
                              <i>
                                <b>livrée</b>
                              </i>
                            </Tooltip>
                          </button>
                        ) : (
                          // (
                          //   ""
                          // )
                          // )
                          //  :
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <CustomerOrderDetail
            show={modalShow}
            onHide={() => setModalShow(false)}
            orders={orders.toReversed()}
            order_id={selectedOrder}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderGridView;
