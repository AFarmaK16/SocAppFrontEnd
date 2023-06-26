import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import HambergurMenu from "../assets/HambergurMenu.svg";
import soc_logo from "../assets/soc_logo.png";
// import Logo from '../assets/logo.svg';
import NavCartButton from "../components/cart/NavCartButton";
import { logout } from "../store/actions/auth-actions";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const MainNavigation = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = true;
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };
  const navHandler = () => {
    setShowNav(!showNav);
  };

  const logoutUser = () => {
    dispatch(logout(token));
  };

  const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1 },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

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

  return (
    <div className="w-full h-[80px]">
      <div className="flex  justify-between items-center w-full h-full px-8 sm:mb-6">
        <div className="flex">
          <div className="flex items-center">
            <motion.div
              // transition= { duration: 1 , type:"rotate"}
              className="w-[50px] h-[50px]"
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              dragElastic={0.7}
            >
              {/* <NavLink to='/'><img src={Logo} alt="" /></NavLink> */}
              <NavLink to="/">
                <img src={soc_logo} />
              </NavLink>
            </motion.div>
            <motion.div
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <NavLink to="/">
                <h1 className="text-3xl font-bold ml-2 select-none">
                  <span className="text-success">SOCOCIM</span>
                  &nbsp;
                  <span className="text-secondary-200">INDUSTRIES.</span>
                </h1>
              </NavLink>
            </motion.div>
          </div>
          <ul className="hidden md:flex items-center lg:ml-8">
            <li>
              <NavLink className="ml-4 p-2 lg:text-lg font-semibold" to="/">
                Acceuil
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className="ml-2 p-2 lg:text-lg font-semibold"
                to="/about"
              >
                About
              </NavLink>
            </li> */}

            <li>
              <NavLink
                className="ml-2 p-2 lg:text-lg font-semibold"
                to="/products"
              >
                Produits
              </NavLink>
            </li>

            {/* <li>
              {isAuthenticated && (
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="nav-link ml-2 p-2 lg:text-lg font-semibold"
                    tag="a"
                  >
                    Admin
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      {" "}
                      <NavLink
                        className="ml-2 p-2 lg:text-lg font-semibold"
                        to="/orders"
                      >
                        Commandes
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink
                        className="ml-2 p-2 lg:text-lg font-semibold"
                        to="/allFactures"
                      >
                        Factures
                      </NavLink>
                    </DropdownItem>

                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </li> */}
            <li>
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  className="nav-link ml-2 p-2 lg:text-lg font-semibold"
                  tag="a"
                >
                  Mes commandes
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem>
                    {" "}
                    <NavLink
                      className="ml-2 p-2 lg:text-lg font-semibold"
                      to="/checkout"
                    >
                      Valider Commande
                    </NavLink>
                  </DropdownItem> */}
                  <DropdownItem>
                    {" "}
                    <NavLink
                      className="ml-2 p-2 lg:text-lg font-semibold"
                      to="/order-history"
                    >
                      Historique des commandes
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      className="ml-2 p-2 lg:text-lg font-semibold"
                      to="/payment-history"
                    >
                      Historique des factures
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex">
          <NavCartButton />
          {!isAuthenticated && (
            <NavLink to="/login">
              <motion.button
                className="border-primary border-4 text-primary font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
              >
                Login
              </motion.button>
            </NavLink>
          )}
          {isAuthenticated && (
            <motion.button
              onClick={logoutUser}
              className="border-success border-4 font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
            >
              Logout
            </motion.button>
          )}
        </div>
        <div className="md:hidden cursor-pointer" onClick={navHandler}>
          {!showNav ? (
            <img src={HambergurMenu} alt="" />
          ) : (
            <XIcon className="w-5" />
          )}
        </div>
      </div>

      <ul
        className={
          !showNav
            ? "hidden"
            : "md:hidden px-8 py-4 bg-white w-full h-[20rem] relative z-20"
        }
      >
        <li className="border-b-2 border-zinc-300 w-full text-lg font-semibold text-gray-600">
          <NavLink to="/" onClick={navHandler}>
            Accueil
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/products" onClick={navHandler}>
            Products
          </NavLink>
        </li>
        {/* <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          {isAuthenticated && (
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                className="nav-link ml-2 p-2 lg:text-lg font-semibold"
                tag="a"
              >
                Admin
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink
                    className="ml-2 p-2 lg:text-lg font-semibold"
                    to="/orders"
                  >
                    Commandes
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink
                    className="ml-2 p-2 lg:text-lg font-semibold"
                    to="/allFactures"
                  >
                    Factures
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink
                    className="ml-2 p-2 lg:text-lg font-semibold"
                    to="/admin/dashboard/addproduct"
                  >
                    Gerer Produits
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink
                    className="ml-2 p-2 lg:text-lg font-semibold"
                    to="/manageProducts"
                  >
                    Dashboard
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </li> */}
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              className="nav-link ml-2 p-2 lg:text-lg font-semibold"
              tag="a"
            >
              Mes commandes
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                {" "}
                <NavLink
                  className="ml-2 p-2 lg:text-lg font-semibold"
                  to="/checkout"
                >
                  Valider Commande
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                {" "}
                <NavLink
                  className="ml-2 p-2 lg:text-lg font-semibold"
                  to="/order-history"
                >
                  Historique des commandes
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink
                  className="ml-2 p-2 lg:text-lg font-semibold"
                  to="/payment-history"
                >
                  Historique des factures
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>

        <div className="flex flex-col items-center m-4 space-y-4">
          <div onClick={navHandler}>
            <NavCartButton />
          </div>
          {!isAuthenticated && (
            <NavLink
              onClick={navHandler}
              to="/login"
              className="border-primary border-4 text-primary font-bold px-9 py-2 ml-2 rounded-full shadow-lg"
            >
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <button
              onClick={logoutUser}
              className="border-primary border-4 text-primary font-bold px-9 py-2 ml-2 rounded-full shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default MainNavigation;
