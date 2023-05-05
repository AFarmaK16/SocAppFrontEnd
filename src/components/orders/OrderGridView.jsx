import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaPlus, FaSearch } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
// import product_img from "../assets/CEMIIB-LL32-5RCE.jpg";
import product_img from "../../assets/cemiib-ll32-5rce.jpg";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Input, InputGroup, InputGroupText, Table } from "reactstrap";
import CustomerOrderDetail from "../../pages/CustomerOrderDetail";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { BiDotsHorizontal } from "react-icons/bi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { validateOrder } from "../../store/actions/oder-action";

const OrderGridView = ({ orders }) => {
  
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setselectedOrder] = useState();
  const dispatchOrders = useDispatch();
  function handleValidation(id){
        Swal.fire({
          title: "Validation commande",
          icon: "question",
          html: `<hr/><p>Voulez vous valider la commande #${id}? </p>`,
          showCancelButton: true,
          cancelButtonText: "Annuler",
          confirmButtonText: "Valider",
          confirmButtonColor: "#198754",
          cancelButtonColor: "red",
          allowOutsideClick: false,
        }).then((response) => {
          if (response.isConfirmed) {
            //Action to perform when the user click on the confirm button
            console.log(`gunaydin Ögrençi ${id}`);
                try {
                  dispatchOrders(validateOrder(id));
                  Swal.fire({
                    title: "Commande validée avec succés!",
                    // text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
                    icon: "success",
                    button: "OK!",
                  }).then(function () {
                  window.location.reload();
                });
                } catch (error) {
                  console.log("%c" + error, "color:red");
                }        
          }
        });
  }
  return (
    <div className="mt-16 space-y-16 w-[80vw] mx-auto">
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
                      <td>{customer.customerFirstName.toUpperCase()}</td>
                      <td>{customer.customerLastName.toUpperCase()}</td>
                      <td>{formattedDate.toLocaleString("fr-FR")}</td>
                      <td>{orderItems.length}</td>
                      <td>{order_status}</td>
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
                        <div className="vr mx-2 ml-2"></div>
                        {order_status === "ATTENTE" ? (
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              handleValidation(order_id);
                            }}
                          >
                            Valider
                            {/* <BiDotsHorizontal color="white" /> */}
                          </button>
                        ) : (
                          ""
                        )}
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
    </div>
  );
};

export default OrderGridView;
