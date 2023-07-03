import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { Input, InputGroup, InputGroupText, Table } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import Forms from "./Forms";
import { getTarification } from "../../store/actions/admin-action";
import TheSettingsItem from "./TheSettingsItem";
import {
  // getBanks,
  getDestinations,
  getOperators,
  getPaymentModes,
} from "../../store/actions/oder-action";
import { ChevronDoubleRightIcon, CogIcon } from "@heroicons/react/solid";

const TheSettings = ({ setof }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTarification());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOperators());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPaymentModes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  const destinations = useSelector((state) => state.orders.destinations);
  // const banks = useSelector((state) => state.orders.banks);
  const tarifications = useSelector((state) => state.settings.tarifications);
  const payMode = useSelector((state) => state.orders.operators);
  const payType = useSelector((state) => state.orders.paymentMode);
  // console.log(payMode);
  const tableHeaders = {
    // ... other table Headers
    tarification: [
      { name: "Date application" },
      { name: "Date fin" },
     
      { name: "Montant" }, { name: "" },
    ],
    // ... other table Headers
    payType: [{ name: "Libellé" }, { name: "" }],

    payMode: [
      { name: "Libellé" }, //ajouter un filtre selon le type
      { name: "" },
      { name: "Type" },
    ],

    destination: [{ name: "Nom" }, { name: "Tarification" },{ name: "" }],
  };
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const tabHeaders = tableHeaders[setof];
  let tableContent = null;

  // if (setof === "tarification") {
  //   console.log("here we go");
  // }
  let title = ""
  switch (setof) {
    case "tarification":
      tableContent = tarifications;
      title=" Tarifications"
      // console.log("dieulna tarif");
      break;
    case "destination":
      tableContent = destinations;
      title = " Destinations";
      // console.log("dieulna dest");
      break;
    // break;
    case "payMode":
      tableContent = payMode;
    title = " Modes de paiement";
      break;
    case "payType":
        tableContent = payType;
title = " Types de paiement";
      break;

    // default:
    //   tableContent = destinations;
    // break;
  }
  // console.log(tableContent);
  // console.log(setof);
  // console.log(tableContent);
  // console.log(destinations.length);
  const renderHeaders = () => {
    return tabHeaders.map((field, index) => {
      return <th key={index + field.name}>{field.name}</th>;
    });
  };
  return (
    <div>
      <Forms
        about={setof}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="flex items-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <span className="text-4xl  text-green-600 mr-6">
          <AiOutlineUnorderedList />
          {/* <CogIcon className="h-8 w-8" /> */}
        </span>
        <h2 className="flex text-4xl tracking-widest font-semibold">
          Paramétrage&gt;&gt; {title}
          {/* {setof === "tarification " ? <>Clients</> : <>Utilisateurs</>} */}
        </h2>
        {/* <div className="p-">
          <InputGroup>
            <InputGroupText>
              <FaSearch />
            </InputGroupText>
            <Input
              placeholder="Tapez pour rechercher  "
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </InputGroup>
        </div> */}
      </div>
      <div className="flex items-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <InputGroup>
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <Input
            placeholder="Tapez pour rechercher  "
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
      </div>
      <div className="bg-white mx-4 p-8 shadow-lg space-y-12">
        <div>
          <button
            to="/admin/dashboard/addproduct"
            className="border-b-2 pb-3 border-gray-500"
            onClick={() => {
              setModalShow(true);
            }}
          >
            <span className="inline-flex mr-3 text-green-600">
              <MdAddCircle />{" "}
            </span>
           Nouveau
          </button>
        </div>
        <Table
          responsive
          hover
          // className="border border-white rounded-lg shadow-lg p-4"
        >
          <thead>
            <tr>
              <th>#</th>
              {renderHeaders()}
              <th>Actions</th>

              {/* {type === "CUSTOMER" ? (
                  <>
                    <th>Adresse</th>
                    <th>Telephone</th>
                  </>
                ) : (
                  <></>
                )} */}
            </tr>
          </thead>
          <tbody>
            {/* <tr
              // key={account.id}
              className=" rounded-lg shadow-sm p-6"
            > */}
            {tableContent.map((tabContent) => {
              return (
                <TheSettingsItem
                  tabContent={tabContent}
                  update={false}
                  type={setof}
                />
              );
            })}

            {/* </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TheSettings;
