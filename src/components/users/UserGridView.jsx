import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
// import product_img from "../assets/CEMIIB-LL32-5RCE.jpg";
import { useDispatch } from "react-redux";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupText,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import CustomerOrderDetail from "../../pages/CustomerOrderDetail";
import { validateOrder } from "../../store/actions/oder-action";

const UserGridView = ({ accounts, type }) => {
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setselectedOrder] = useState();
  const dispatchUsers = useDispatch();
  console.log(type);

  return (
    <div className="mt-16 space-y-16 w-[80vw] mx-auto">
      <Card>
        <CardHeader>
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
        </CardHeader>
        <CardBody>
          <Table responsive hover>
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
                  const { id, username, role, user, customer, dateOuverture } =
                    account;
                  const formattedDate = new Date(dateOuverture);
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{username}</td>

                      {customer !== null ? (
                        <>
                          <td>
                            <Badge color="success">{role}</Badge>
                          </td>
                          <td>{customer.name.toUpperCase()}</td>
                          <td>{customer.surname.toUpperCase()}</td>
                          <td>{customer.address}</td>
                          <td>{customer.phoneNumber}</td>
                        </>
                      ) : user !== null ? (
                        <>
                          <td>
                            {role === "ADMIN" ? (
                              <Badge color="warning">{role}</Badge>
                            ) : (
                              <Badge color="info">{role}</Badge>
                            )}
                          </td>
                          <td>{user.name.toUpperCase()}</td>
                          <td>{user.surname.toUpperCase()}</td>
                          {/* <td>-</td>
                          <td>-</td> */}
                        </>
                      ) : (
                        <>
                          {/* <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td> */}
                        </>
                      )}

                      <td>{formattedDate.toLocaleString("fr-FR")}</td>

                      <td>
                        <button
                          className="btn btn-danger "
                          onClick={() => {
                            setModalShow(true);
                            setselectedOrder(id);
                          }}
                        >
                          Bloquer
                          {/* <BiDotsHorizontal color="white" /> */}
                        </button>
                        {/* {account_status === "ATTENTE" ? ( */}
                        {/* <button
                          className="btn btn-info"
                          onClick={() => {
                            handleValidation(id);
                          }}
                        >
                          Valider
                        </button> */}
                        {/* ) : (
                          ""
                        )} */}
                      </td>
                    </tr>
                    // </CardBody>
                  );
                })}
            </tbody>
          </Table>
          {/* WILL USE FOLLOWING FOR UPDATING ACCOUNTS */}
          {/* <CustomerOrderDetail
            show={modalShow}
            onHide={() => setModalShow(false)}
            accounts={accounts}
            id={selectedOrder}
          /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserGridView;
