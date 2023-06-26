import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import AccountItems from "./AccountItems";
import { Alert, Input, InputGroup, InputGroupText, Table } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { getUsers } from "../../store/actions/user-action";
import Forms from "./Forms";

const TheAccounts = ({ type }) => {
  // const products = useSelector((state) => state.products.filteredProducts);
  const dispatchAccounts = useDispatch();
  useEffect(() => {
    dispatchAccounts(getUsers());
  }, [dispatchAccounts]);
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const accounts = useSelector((state) => state.users.filteredUsers);
  console.log(accounts);
  return (
    <div>
      <Alert color="red">FALSE pour isNonLocked mean that le compte est bloque</Alert>
      <Forms
        about="account"
        show={modalShow}
        onHide={() => setModalShow(false)}
        usertype={type}
      />
      <div className="flex items-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <span className="text-4xl text-green-600 mr-6">
          <AiOutlineUnorderedList />
        </span>
        <h2 className=" text-4xl tracking-widest font-semibold">
          Gérer Les Comptes{" "}
          {type === "CUSTOMER" ? <>Clients</> : <>Utilisateurs</>}
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
            Ajouter un compte
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
              <th>Login</th>
              <th>Role</th>
              <th>Prenom</th>
              <th>Nom</th>

              {type === "CUSTOMER" ? (
                <>
                  <th>Adresse</th>
                  <th>Telephone</th>
                </>
              ) : (
                <></>
              )}

              <th>Date Ouverture</th>
              <th>Actif</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts
              .filter((account) => {
                if (type === "CUSTOMER") {
                  return account.role === "CUSTOMER";
                } else {
                  return account.role !== "CUSTOMER";
                }
              })
              .filter((account) => {
                return (
                  search.toLowerCase() === "" ||
                  account.username.toLowerCase().includes(search)
                );
              })
              .map((account) => {
                return (
                  <AccountItems
                    key={account.id}
                    account={account}
                    update={false}
                    type={type}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TheAccounts;
