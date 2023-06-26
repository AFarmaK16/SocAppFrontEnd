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
import { useDispatch } from "react-redux";
import { deliverOrder, validateOrder } from "../../store/actions/oder-action";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { BsFilterLeft } from "react-icons/bs";
// import { Tab, Tabs } from "react-bootstrap";

const OrderGridView = ({ orders, role }) => {
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setselectedOrder] = useState();
  const dispatchOrders = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [filtre, setFilter] = useState("all");
  // const [countOrder, setcountOrder] = useState(orders.length);
  const changeFilter = (option) => {
    setFilter(option);
    // let count = 0
    //   for (const order in orders) {
    //     if ( === option) {
    //       count++;
    //     }
    //     else{
    //       count=orders.length
    //     }

    //   }
    //   setcountOrder(count);
  };
  let pendingOrders = 0;
  let validOrders = 0;
  // let deliveredOrders = 0;

  for (const order in orders) {
    if (orders[order].order_status === "ATTENTE") {
      pendingOrders++;
    }
    if (orders[order].order_status === "VALIDEE") {
      validOrders++;
    }
    // if (orders[order].order_status === "LIVREE") {
    //   deliveredOrders++;
    // }
  }
  // console.log(pendingOrders + "/" + validOrders + "/" + deliveredOrders);
  function handleValidation(id) {
    Swal.fire({
      title: "Validation commande",
      width: 300,
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
  function editOrderState(id) {
    Swal.fire({
      // title: `<hr/><p>Voulez vous marquer la commande #${id} comme <b><i>livrée</i></b>? </p>`,
      icon: "info",
      width: 300,
      html: `<hr/><p>Voulez vous marquer la commande #${id} comme <b><i>livrée</i></b>? </p>`,
      showCancelButton: true,
      cancelButtonText: "NON",
      confirmButtonText: "OUI",
      confirmButtonColor: "#198754",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${id}`);
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
          dispatchOrders(deliverOrder(id));

          Toast.fire(
            "Modification effectuée avec succés!",
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
  // console.log(role)
  // console.log(orders)
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
              {role === 2 && (
                <option className="   rounded-full " value={"ATTENTE"}>
                  En Attente{" "}
                  {/* <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {pendingOrders}
                  </span> */}
                </option>
              )}
              <option className="  rounded-full " value={"VALIDEE"}>
                Validées
              </option>{" "}
              {/* <option className="  rounded-full " value={"LIVREE"}>
                Livrées
              </option> */}
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
                {role === 1 ? (
                  <span>{validOrders}</span>
                ) : (
                  <span>{orders.length}</span>
                )}
              </span>
             
            </div>
            
            {/* <div>
              {" "}
              Livrées: &nbsp;
              <span className="    rounded-md bg-blue-100 text-blue-600  p-2">
                {deliveredOrders}
              </span>
            </div> */}
            {role === 2 && (
              <div>
                {" "}
                Validées : &nbsp;
                <span className="    rounded-md bg-green-100 text-green-600  p-2">
                  {validOrders}
                </span>
              </div>
            )}
            {role === 2 && (
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
              {/* {role === 2 && (
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
                  if (role === 1) {
                    return (
                      order.order_status !== "ATTENTE" &&
                      order.order_status !== "LIVREE"
                    );
                  } else {
                    return order;
                  }
                })
                .filter((order) => {
                  if (filtre === "all") {
                    console.log("fii la");
                    return order;
                  } else {
                    console.log("2 yi la");
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
                          role === 2 ? (
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
                        {
                          // order_status === "LIVREE" ? (
                          // role === 1 && order_status !== "LIVREE" ? (
                          //   <button
                          //     className="btn flex bg-slate-200  text-white-800"
                          //     onClick={() => {
                          //       editOrderState(order_id);
                          //     }}
                          //   >
                          //     <PencilAltIcon
                          //       className="h-5 w-5"
                          //       id="deliveredOrder"
                          //     />
                          //     <Tooltip
                          //       autohide
                          //       flip
                          //       isOpen={tooltipOpen}
                          //       target={"deliveredOrder"}
                          //       toggle={toggle}
                          //     >
                          //       Marquer comme{" "}
                          //       <i>
                          //         <b>livrée</b>
                          //       </i>
                          //     </Tooltip>
                          //   </button>
                          // ) : (
                          //   ""
                          // )
                          // ) : (
                          //   ""
                          // )
                        }
                        {/* {order_status === "ATTENTE" && role === 2 ? (
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
                        )} */}
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
            orders={orders.toReversed()}
            order_id={selectedOrder}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderGridView;
