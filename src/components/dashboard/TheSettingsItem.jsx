import React from "react";
import { Link } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";

import product_img from "../../assets/cemiib-ll32-5rce.jpg";
import { formatPrice } from "../../utils/helpers";
import { MdEditAttributes } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Badge } from "reactstrap";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  delDestination,
  delPayMode,
  delPayType,
  delTarif,
  updateDestination,
} from "../../store/actions/admin-action";

const TheSettingsItem = ({ tabContent, update, type }) => {
  const token = localStorage.getItem("token");
   let title = "";
   switch (type) {
     case "tarification":
       title = "La tarification";
       // console.log("dieulna tarif");
       break;
     case "destination":
       title = "La destination";
       // console.log("dieulna dest");
       break;
     // break;
     case "payMode":
       title = "Le mode de paiement";
       break;
     case "payType":
       title = "Le type de paiement";
       break;

   }
  const dispatch = useDispatch();
  // console.log(type);
  const tarificationOptions = useSelector(
    (state) => state.settings.tarifications
  );
  // console.log(tarificationOptions)
  const handleDelete = (id) => {
    switch (type) {
      case "tarification": //😁😀😀
        dispatch(delTarif(id));

        break;
      case "destination": //😁😀😀
        dispatch(delDestination(id));
        break;
      // break;
      case "payMode": //😁😀😀
        dispatch(delPayMode(id));
        break;
      case "payType": //😁😀😀
        dispatch(delPayType(id));

        break;

      // default:
      //   tableContent = destinations;
      // break;
    }
    Swal.fire({
      html: `Etes-vous sûr de vouloir supprimer ${title} #${id} ?`,
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
          // dispatch(deleteProduct(id));
          Toast.fire({
            title: `Suppression ... #${id} réussie!`,
            // text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
            icon: "success",
          }).then(function () {
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
  };

  const handleUpdate = (id, nom, tarificationCode) => {
    Swal.fire({
      title: `Mise à jour de ${title} <b>${nom}</b> #${id} `,
      icon: "info",
      html: `<Card class="card-body">
              <Form>
                <div class="form-group"> 
                  Nom : <input id="swal-input1" class="swal2-input bg-green-200 " value="${nom}" placeholder="Nom" disabled/></div>
               <br/>
               <div class=" flex">
                   Tarification: <select id="swal-input2" class="swal2-input form-select">
                    ${tarificationOptions
                      .map(
                        (option) =>
                          `<option value="${option.id}" ${
                            option.id === tarificationCode ? "selected" : ""
                          }
                            >${option.montant}
                            </option>`
                      )
                      .join("")}
            
                    </select>
                </div>
              </Form>
            </Card>
      `,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Modifier",
      confirmButtonColor: "#F6BD60",
      cancelButtonColor: "#C9184A",
      allowOutsideClick: false,

      // },
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${id}`);
        const payload = {
          updateRequest: {
            tarification: document.getElementById("swal-input2").value,
          },
          id: id,
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
          dispatch(updateDestination(payload));

          Toast.fire(
            `Le tarif ${
              document.getElementById("swal-input2").value
            } a été affecté à la destination ${nom} avec succés`,
            "",
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
  };
  return (
    <tr
      // key={account.id}
      className=" rounded-lg shadow-sm p-6"
    >
      {Object.entries(tabContent).map(([key, value]) => (
        <td key={key}>
          {typeof value === "object" && value !== null ? (
            Object.entries(value).map(
              ([index, val]) =>
                index === "montant" && (
                  <span key={index}>{formatPrice(val)}</span>
                )
            )
          ) : key === "validity" ? (
            <span>&nbsp;</span>
          ) : key === "type" && value === "BANQUE" ? (
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
              {String(value)}
            </span>
          ) : key === "type" && value === "OPERATEUR" ? (
            <span
              color="warning"
              className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-600"
            >
              {String(value)}
            </span>
          ) : (
            String(value)
          )}
        </td>
      ))}
      <td>
        <div className="flex px-6 py-4 gap-3">
          {/* {type !== "payType" && (
           
              <AiOutlineEdit onClick={() => alert(tabContent.id)} />

          )} */}
          {type === "destination" && (
            <AiOutlineEdit
              onClick={() =>
                handleUpdate(
                  tabContent.id,
                  tabContent.nom,
                  tabContent.tarification.id
                )
              }
            />
          )}
          <AiOutlineDelete onClick={() => handleDelete(tabContent.id)} />
        </div>
      </td>
  
    </tr>
  );
};

export default TheSettingsItem;
