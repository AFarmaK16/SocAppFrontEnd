import React from "react";
import { Link } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";

import product_img from "../../assets/cemiib-ll32-5rce.jpg";
import { formatPrice } from "../../utils/helpers";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteProduct,
  updateProduct,
} from "../../store/actions/products-actions";
import { validateOrder } from "../../store/actions/oder-action";
import { Card, CardHeader } from "reactstrap";
import { formFields } from "../../layout/Fields";

const ProductItem = ({ product, update }) => {
  const token = localStorage.getItem("token");
  const tarificationOptions = useSelector(
    (state) => state.settings.tarifications
  );
  const dispatch = useDispatch();
  const delProduct = (id) => {
    Swal.fire({
      title: `Etes-vous sûr de vouloir supprimer le produit #${id} du catalogue?`,
      icon: "question",
      width: 300,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
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
          dispatch(deleteProduct(id, token));
          Toast.fire("Produit supprimé avec succés!", "", "success").then(
            function () {
              window.location.reload();
            }
          );
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
  };

  // const productFields = formFields["product"];
  // console.log(productFields);
  const handleUpdate = () => {
    Swal.fire({
      title: `Mise à jour  du produit ${product.product_label} #${product.id} `,
      icon: "info",
      width: 700,
      html: `<Card class="card-body">
              <Form>
            <div class="form-group"> 
 Nom Qualité Produit : <input id="swal-input1" class="swal2-input bg-green-200 " value="${
   product.product_label
 }" placeholder="Nom" disabled/>
</div>
<br/>
          <div class="form-group"> 
          Code Qualité Produit : <input id="swal-input2" class="swal2-input bg-green-200 " value="${
            product.product_type
          }" placeholder="Nom" />
          </div>
          <br/>
          <div class=" form-group">
            <label>Tarification:</label> <select id="swal-input3" class="swal2-input form-select">
              ${tarificationOptions
                .map(
                  (option) =>
                    `<option value="${option.id}"
                      ${
                        option.id === product.tarification.id ? "selected" : ""
                      }>${option.montant}</option>`
                )
                .join("")}
                      
            </select>
          </div>
          <br/>
          <div class="form-group"> 
          Description: <textArea  id="swal-input4" class="swal2-input bg-green-200 form-control" value="${
            product.product_description
          }" placeholder="Ce produit ...." cols="50" rows="10" /></textArea>
          </div>
          <br/>
              </Form>
            </Card>
      `,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Modifier",
      confirmButtonColor: "#F6BD60",
      cancelButtonColor: "#C9184A",
      allowOutsideClick: false,
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${product.id}`);
        const payload = {
          addRequest: {
            product_type: document.getElementById("swal-input2").value,
            tarification: document.getElementById("swal-input3").value,
            product_description: document.getElementById("swal-input4").value,
          },
          id: product.id,
          token: token,
        };
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
          dispatch(updateProduct(payload));

          Toast.fire(
            `Le tarif ${
              document.getElementById("swal-input2").value
            } a été affecté à la destinationnom} avec succés`,
            "",
            "success"
          ).then(function () {
            // window.location.reload();
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
  };
  return (
    <div className="flex space-y-10 border border-white rounded-lg shadow-lg p-4">
      <div>
        <img
          className="w-[300px] h-[200px] object-contain rounded"
          src={product_img}
          alt={product.product_label}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-10 ">
          <h2 className="font-semibold text-lg tracking-widest my-4 grow">
            {product.product_label}
          </h2>
          <div className=" hover:rounded-lg flex hover:bg-primary-600 flex-end font-bold  px-6 py-4 justify-end gap-2">
            <AiOutlineEdit
              onClick={() => handleUpdate()}
              className=" hover:fill-yellow-500"
            />
            &nbsp;
            <AiOutlineDelete
              color="black"
              className=" hover:fill-red-600"
              onClick={() => {
                delProduct(product.id);
              }}
            />
          </div>
        </div>
        <span className="block text-secondary-100 font-bold text-sm">
          {formatPrice(product.tarification.montant)}
        </span>
        <p className="text-gray-500 mt-6">
          {product.product_description.substring(0, 150)}...
        </p>

        {update && (
          <Link
            className="ml-auto mt-auto bg-secondary-100 text-white px-4 py-1 rounded-md shadow-md"
            to={`/admin/dashboard/updateproducts/${product.id}`}
            state={{ product }}
          >
            Update
            <span className="inline-block ml-2">
              {<HiChevronDoubleRight />}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
