import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronDoubleRight,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi";

import product_img from "../../assets/cemiib-ll32-5rce.jpg";
import { formatPrice } from "../../utils/helpers";
import { Badge } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import {
  blockAccount,
  delAccount,
  unLockAccount,
} from "../../store/actions/admin-action";
import { useDispatch } from "react-redux";
import { FaUnlock } from "react-icons/fa";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

const AccountItems = ({ account, update, type }) => {
  const [modalShow, setModalShow] = useState(false);

  const [selectedOrder, setselectedOrder] = useState();
  const formattedDate = new Date(account.dateOuverture);
  const dispatch = useDispatch();
  // console.log(account);
  //   const handleUpdate = () => {
  //     Swal.fire({
  //       title: `Mise à jour  du compte ${product.product_label} #${product.id} `,
  //       icon: "info",
  //       width: 700,
  //       html: `<Card class="card-body">
  //               <Form>
  //             <div class="form-group">
  //  Nom Qualité Produit : <input id="swal-input1" class="swal2-input bg-green-200 " value="${
  //    product.product_label
  //  }" placeholder="Nom" />
  // </div>
  // <br/>
  //           <div class="form-group">
  //           Code Qualité Produit : <input id="swal-input2" class="swal2-input bg-green-200 " value="${
  //             product.product_label
  //           }" placeholder="Nom" disabled/>
  //           </div>
  //           <br/>
  //           <div class=" form-group">
  //             <label>Tarification:</label> <select id="swal-input3" class="swal2-input form-select">
  //               ${tarificationOptions
  //                 .map(
  //                   (option) =>
  //                     `<option value="${option.id}"
  //                       ${
  //                         option.id === product.tarification.id ? "selected" : ""
  //                       }>${option.montant}</option>`
  //                 )
  //                 .join("")}

  //             </select>
  //           </div>
  //           <br/>
  //           <div class="form-group">
  //           Description: <textArea  id="swal-input4" class="swal2-input bg-green-200 form-control" value="${
  //             product.product_description
  //           }" placeholder="Ce produit ...." cols="50" rows="10" /></textArea>
  //           </div>
  //           <br/>
  //               </Form>
  //             </Card>
  //       `,
  //       showCancelButton: true,
  //       cancelButtonText: "Annuler",
  //       confirmButtonText: "Modifier",
  //       confirmButtonColor: "#F6BD60",
  //       cancelButtonColor: "#C9184A",
  //       allowOutsideClick: false,
  //     }).then((response) => {
  //       if (response.isConfirmed) {
  //         //Action to perform when the user click on the confirm button
  //         console.log(`gunaydin Ögrençi ${product.id}`);
  //         const payload = {
  //           addRequest: {
  //             product_type: document.getElementById("swal-input2").value,
  //             tarification: document.getElementById("swal-input3").value,
  //             product_description: document.getElementById("swal-input4").value,
  //           },
  //           id: product.id,
  //         };
  //         try {
  //           dispatch(updateProduct(payload));
  //           const Toast = Swal.mixin({
  //             toast: true,
  //             position: "top",
  //             timer: 1000,
  //             timerProgressBar: true,
  //             customClass: {
  //               popup: "bg-green-600",
  //             },
  //             showConfirmButton: false,
  //           });
  //           Toast.fire(
  //             `Le tarif ${
  //               document.getElementById("swal-input2").value
  //             } a été affecté à la destinationnom} avec succés`,
  //             "",
  //             "success"
  //           ).then(function () {
  //             // window.location.reload();
  //           });
  //         } catch (error) {
  //           console.log("%c" + error, "color:red");
  //         }
  //       }
  //     });
  //   };
  const handleDelete = () => {
    Swal.fire({
      title: `Etes-vous sur de vouloir supprimer/bloquer le compte #${account.id} de l'utilisateur ${account.username} ?`,
      icon: "warning",
      width: 300,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Bloquer",
      confirmButtonColor: "#C9184A",
      // cancelButtonColor: "#198754",
      showLoaderOnDeny: true,
      showDenyButton: true,
      denyButtonText: "Supprimer",
      denyButtonColor: "#DC2F02",
      allowOutsideClick: false,
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${account.id}`);
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
          dispatch(blockAccount(account.id));

          Toast.fire(
            "Compte bloqué avec succés!",
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
      if (response.isDenied) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${account.id}`);
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
          dispatch(delAccount(account.id));
          Toast.fire(
            "Compte supprimé avec succés!",
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
  };
  const handleUnlock = () => {
    Swal.fire({
      title: `Voulez vous débloquer le compte #${account.id} de l'utilisateur ${account.username} ?`,
      icon: "warning",
      width: 300,
      showCancelButton: true,
      cancelButtonText: "NON",
      confirmButtonText: "OUI",
      // confirmButtonColor: "#C9184A",
      // cancelButtonColor: "#198754",
      // denyButtonColor: "#DC2F02",
      allowOutsideClick: false,
    }).then((response) => {
      if (response.isConfirmed) {
        //Action to perform when the user click on the confirm button
        console.log(`gunaydin Ögrençi ${account.id}`);
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
          dispatch(unLockAccount(account.id));
          Toast.fire(
            "Compte bloqué avec succés!",
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
  };
  return (
    <tr key={account.id} className=" rounded-lg shadow-sm p-6">
      <td>{account.id}</td>
      <td>{account.username}</td>

      {account.customer !== null ? (
        <>
          <td>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
              {account.role}
            </span>
          </td>
          <td>{account.customer.name}</td>
          <td>{account.customer.surname}</td>
          <td>{account.customer.address}</td>
          <td>{account.customer.phoneNumber}</td>
        </>
      ) : account.user !== null ? (
        <>
          <td>
            {account.role === "ADMIN" ? (
              <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-900">
                {account.role}
              </span>
            ) : (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-900">
                {account.role}
              </span>
            )}
          </td>
          <td>{account.user.name.toUpperCase()}</td>
          <td>{account.user.surname.toUpperCase()}</td>
        </>
      ) : (
        <></>
      )}

      <td>{formattedDate.toLocaleString("fr-FR")}</td>
      <td>
        {!account.isAccountNonLocked ? (
          <div>
            {" "}
            {/* <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-900"> */}
            {/* <XIcon
              className="h-5 w-5 rounded-full bg-red-100   text-red-900"
              color="red"
            /> */}
            <span
              className="btn rounded-full   flex text-xs border-2 border-red-600 pr-0"
              onClick={() => handleUnlock()}
            >
              {/* <FaUnlock color="red" /> */}
              Débloquer
              {/* <HiOutlineLockClosed /> */}
            </span>
            {/* {String(account.isAccountNonLocked)}
              &nbsp; ENABLED &nbsp; &nbsp;
              {String(account.isEnabled)} */}
            {/* <HiOutlineLockClosed /> */}
            {/* </span> */}
          </div>
        ) : (
          <CheckIcon
            className="h-5 w-5 rounded-full bg-green-100   text-green-900"
            color="green"
          />
          // <span className="  rounded-full bg-green-100 px-2 py-1 text-xs text-green-900">
          //   ACTIF
          // </span>
        )}
        {/* {JSON.stringify(account)} */}

        {/* <br />
        || IsNotlocked: {String(account.isAccountNonLocked)} */}
      </td>

      <td>
        <div className="flex  gap-2">
          {/* <AiOutlineEdit /> */}
          {/* 
          <AiOutlineEdit
            onClick={() => alert("clicked")}
            className=" hover:fill-yellow-500"
          /> */}

          <AiOutlineEdit onClick={() => handleDelete(account.id)} />
          {/* <AiOutlineDelete onClick={() => handleDelete(account.id)} /> */}
          {/* {!account.isAccountNonLocked && (
            <span
              className="btn rounded-full bg-yellow-400 px-2 py-1  text-white flex"
              onClick={() => handleUnlock()}
            >
              <FaUnlock color="white" />
              Débloquer
            </span>
          )} */}
        </div>
        {/* <button
          className="btn btn-danger "
          onClick={() => {
            setModalShow(true);
            setselectedOrder(account.id);
          }}
        >
          Bloquer
        </button> */}
      </td>
    </tr>
  );
};

export default AccountItems;
