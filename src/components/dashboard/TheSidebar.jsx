import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdAddCircle, MdUpdate, MdViewList } from "react-icons/md";
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronUp,
  BiLogOutCircle,
  BiStore,
  BiStreetView,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth-actions";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  List,
  ListGroupItem,
  NavLink,
  UncontrolledAccordion,
  UncontrolledDropdown,
} from "reactstrap";
import {
  RiPriceTag3Line,
  RiProfileFill,
  RiUser4Line,
  RiUserSettingsFill,
} from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import soc_logo from "../../assets/soc_logo.png";
import {
  BeakerIcon,
  CreditCardIcon,
  GlobeAltIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/solid";
const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 2px #ffffff",
      boxShadow: "0px 0px 4px #243E8B",
      transition: {
        duration: 0.3,
      },
    },
  };
  const token = localStorage.getItem("token");
  console.log(token);
  console.log("token");
  console.log(useSelector((state) => state.auth.token));
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAdv = useSelector((state) => state.auth.isAdv);
  const isCommercial = useSelector((state) => state.auth.isComm);

  const orders = useSelector((state) => state.orders.filteredOrders);
  // console.log(orders)
  let pendingOrders = 0;
  let validOrders = 0;
  for (const order in orders) {
    if (orders[order].order_status === "ATTENTE") {
      pendingOrders++;
    }
  }

  for (const order in orders) {
    if (orders[order].order_status === "VALIDEE") {
      validOrders++;
    }
  }
  const toogleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    // console.log(isAccordionOpen)
  };
  const tooglePayment = () => {
    setIsPaymentSelected(!isPaymentSelected);
    // console.log(isAccordionOpen)
  };
  const logoutUser = async () => {
    await dispatch(logout(token));
  };
  // console.log(props)
  return (
    <Card className="h-full px-6 bottom-0  w-full shadow-xl  shadow-blue-gray-900/5 bg-gradient-to-tr from-white to-slate-50 ">
      <div className="mb-12 mt-8 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={soc_logo} className="w-full h-full onject-cover" />
        </div>
        <h1 className="uppercase text-2xl tracking-wider font-extrabold text-center">
          <span className="text-green-500">TABLEAU</span>
          <span className="text-green-600">DE</span>
          <span className="text-green-700">BORD</span>
        </h1>
      </div>
      {isAuthenticated ? (
        isAdmin ? (
          <ListGroupItem className="flex flex-col text-black font-semibold tracking-wider text-lg space-y-3">
            <Link
              to="/admin/dashboard/products"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <BiStore />{" "}
              </span>
              Produits
            </Link>
            <div
              className=" inline-flex border-b-2 pb-2 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500"
              onClick={tooglePayment}
            >
              <span className="inline-flex mr-3 text-green-600">
                <FiSettings />
              </span>{" "}
              Paramétrage &nbsp;{" "}
              {isAccordionOpen ? (
                <BiChevronUp color="gray" />
              ) : (
                <BiChevronDown color="gray" />
              )}
            </div>
            <Collapse isOpen={isPaymentSelected} className="pl-6">
              <div className="divide-y divide-slate-800 divide-dashed">
                <div>
                  {" "}
                  <Link
                    className=" lg:text-lg font-semibold flex"
                    to="/admin/dashboard/tarification"
                  >
                    <BiChevronRight className="inline-flex mr-3 text-green-600" />{" "}
                    <span className="inline-flex mr-3 text-green-600">
                      <RiPriceTag3Line />
                    </span>{" "}
                    Tarification
                  </Link>
                  <Link
                    className=" lg:text-lg font-semibold flex"
                    to="/admin/dashboard/destination"
                  >
                    <BiChevronRight className="inline-flex mr-3 text-green-600" />{" "}
                    <span className="inline-flex mr-3 text-green-600">
                      <GlobeAltIcon className="h-5 w-5" />
                    </span>{" "}
                    Destination
                  </Link>
                </div>
                <div>
                  <span
                    className=" lg:text-lg font-semibold flex"
                    onClick={toogleAccordion}
                  >
                    <BiChevronRight className="inline-flex mr-3 text-green-600" />{" "}
                    <span className="inline-flex mr-3 text-green-600">
                      <CreditCardIcon className="h-5 w-5" />
                    </span>
                    Paiement &nbsp;{" "}
                    {isAccordionOpen ? (
                      <BiChevronLeft color="gray" />
                    ) : (
                      <BiChevronRight color="gray" />
                    )}
                  </span>{" "}
                  <Collapse isOpen={isAccordionOpen} className="pl-6">
                    <Link
                      className=" lg:text-lg font-semibold flex pl-8"
                      to="/admin/dashboard/payMode"
                    >
                      <BiChevronRight className="inline-flex mr-3 text-green-600" />{" "}
                      Mode
                    </Link>
                    <Link
                      className=" lg:text-lg font-semibold flex pl-8"
                      to="/admin/dashboard/payType"
                    >
                      <BiChevronRight className="inline-flex mr-3 text-green-600" />{" "}
                      Type
                    </Link>
                  </Collapse>
                </div>
              </div>
            </Collapse>
            <Link
              to="/admin/dashboard/users"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500"
            >
              <span className="inline-flex mr-3 text-green-600">
                <RiUserSettingsFill />{" "}
              </span>
              Utilisateurs
            </Link>{" "}
            <Link
              to="/admin/dashboard/customers"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500"
            >
              <span className="inline-flex mr-3 text-green-600">
                <RiUser4Line />{" "}
              </span>
              Clients
            </Link>
            <Link
              to="/admin/dashboard/profile"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <RiProfileFill />{" "}
              </span>
              Profile
            </Link>
          </ListGroupItem>
        ) : isCommercial ? (
          <ListGroupItem className="flex flex-col text-black font-semibold tracking-wider text-lg space-y-3">
            <Link
              to="/comm/dashboard"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500"
            >
              <span className="inline-flex mr-3 text-green-600 ">
                <PresentationChartBarIcon className="h-5 w-5" />
              </span>
              Tableau de bord
            </Link>
            <Link
              to="/comm/dashboard/orders"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <BiStore />{" "}
              </span>
              Commandes
              <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {validOrders}
              </span>
            </Link>
            <Link
              to="/comm/dashboard/orders"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <BiStore />{" "}
              </span>
              Livreurs
            
            </Link>
            <Link
              to="/comm/dashboard/profile"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <RiProfileFill />{" "}
              </span>
              Profile
            </Link>
          </ListGroupItem>
        ) : (
          <ListGroupItem className="flex flex-col text-black font-semibold tracking-wider text-lg space-y-3">
            {" "}
            <Link
              to="/adv/dashboard"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500"
            >
              <span className="inline-flex mr-3 text-green-600 ">
                <PresentationChartBarIcon className="h-5 w-5" />
              </span>
              Tableau de bord
            </Link>
            <Link
              to="/adv/dashboard/orders"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <BiStore />{" "}
              </span>
              Commandes{" "}
              <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {pendingOrders}
              </span>
            </Link>
            <Link
              to="/adv/dashboard/profile"
              className="border-b-2 pb-3 hover:bg-green-300 hover:shadow-lg hover:rounded-full hover:text-white transform hover:scale-105 transition duration-500 "
            >
              <span className="inline-flex mr-3 text-green-600">
                <RiProfileFill />{" "}
              </span>
              Profile
            </Link>
          </ListGroupItem>
        )
      ) : (
        <Link to="/login">
          <motion.button
            className="border-primary border-4 text-primary font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
          >
            Login
          </motion.button>
        </Link>
      )}
      {/* </ListGroupItem> */}
      {isAuthenticated && (
        <div className="mt-auto mb-8">
          <button
            className="px-4 py-2 bg-white rounded-md flex items-center shadow-lg shadow-green-200"
            onClick={logoutUser}
          >
            <span className="inline-flex mr-3 font-bold text-green-600">
              <BiLogOutCircle />
            </span>
            Deconnexion
          </button>
        </div>
      )}
    </Card>
  );
};

export default TheSidebar;
