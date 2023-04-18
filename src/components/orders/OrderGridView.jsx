import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaPlus, FaSearch } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
// import product_img from "../assets/CEMIIB-LL32-5RCE.jpg";
import product_img from "../../assets/cemiib-ll32-5rce.jpg";
import { Button, CardBody } from "reactstrap";

const OrderGridView = ({ orders }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
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
          const formattedDate = new Date(order_Date);
          return (
            <CardBody key={order_id}>
             
              <div className="relative rounded-md">
                <Link
                  to={`/orders/${order_id}`}
                  className="flex items-center justify-center absolute bg-[#222] w-full h-[175px] rounded-md opacity-0 hover:opacity-70 transition-all duration-300"
                >
                  <span className="flex items-center justify-center bg-secondary-100 w-10 h-10 rounded-full">
                    <FaSearch />
                  </span>
                </Link>
              </div>
              {/* <h4 className="mb-0 font-normal">
                Client :</h4> */}
              <ul>
                <li>
                  <b>Nom</b>:{customer.customerFirstName.toUpperCase()}
                </li>
                <li>
                  <b>Prenom</b>:{customer.customerLastName.toUpperCase()}
                </li>
              </ul>
              <h4 className="mb-0 font-normal">
                <b>Date</b>: {formattedDate.toLocaleString("fr-FR")}
              </h4>
              <h4>
                <b>Nombre de produits: </b>
                {orderItems.length}
              </h4>
              <h4 className="mb-0 font-normal">
                <b>Statut</b>: {order_status}
              </h4>
              <h4 className="mb-0 font-normal">
                <img src={facture.justificatifURI} alt="justificatif" />
              </h4>
              <footer className="flex mt-4 justify-between items-center">
                <p className="mb-0 font-normal text-secondary-100 tracking-widest">
                  {formatPrice(order_Amount)}
                </p>
              </footer>
              <Button className="btn">Justificatif:</Button>
            </CardBody>
          );
        })}
      </div>
    </div>
  );
};

export default OrderGridView;
