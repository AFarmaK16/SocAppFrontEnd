import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  addDestination,
  addPayMode,
  addPayType,
  addTarif,
  addUser,
  manageCreation,
} from "../../store/actions/admin-action";
import Swal from "sweetalert2";
import { addProduct } from "../../store/actions/products-actions";
const Forms = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const tarificationOptions = useSelector(
    (state) => state.settings.tarifications
  );

  const formFields = {
    account: [
      { label: "Nom", name: "name", type: "text" },
      { label: "Prenom", name: "surname", type: "text" },
      { label: "Identifiant", name: "username", type: "text" },
      { label: "Mot de passe", name: "password", type: "password" },
      { label: "Role", name: "role", type: "select" },
    ],
    product: [
      // ✔
      { label: "Nom Qualité Produit", name: "product_label", type: "text" },
      {
        label: "Product Description",
        name: "product_description",
        type: "text",
      },
      { label: "Code Qualité Produit", name: "product_type", type: "text" },
      { label: "Tarification", name: "tarification", type: "select" },
    ],
    payMode: [
      // ✔
      { label: "Nom", name: "name", type: "text" },
      { label: "Type", name: "paymentMode", type: "select" },
    ],
    destination: [
      // ✔
      { label: "Destination Name", name: "city", type: "text" },
      { label: "Tarification", name: "tarification", type: "select" },
    ],
    tarification: [
      { label: "Date Fin", name: "datefin", type: "date" },
      { label: "Montant", name: "montant", type: "number" },
    ],
    payType: [
      // ✔
      { label: "Libelle", name: "libelle", type: "text" },
    ],
  };

  const selectedRole = watch("role");
  const roleOptions = [
    { label: "Administrateur Vente", value: "ADMIN" },
    { label: "Commercial", value: "COMMERCIAL" },
  ];
  const payOptions = [
    { label: "Banque", value: 0 },
    { label: "Opérateur", value: 1 },
  ];

  let title = "";
  switch (props.about) {
    case "tarification":
      title = " Ajouter une nouvelle tarification";
      // console.log("dieulna tarif");
      break;
    case "destination":
      title = " Ajouter une nouvelle destination";
      // console.log("dieulna dest");
      break;
    // break;
    case "payMode":
      title = "Ajouter un nouveau mode de paiement";
      break;
    case "payType":
      title = " Ajouter un nouveau type de paiement";
      break;
    case "product":
      title = " Ajouter un nouveau produit";
      break;
    case "account":
      if (props.usertype === "users")
        title = " Ajouter une nouveau compte Utilisateur ";
      else title = " Ajouter une nouveau compte Client";
      break;

    // default:
    //   tableContent = destinations;
    // break;
  }
  const renderFormFields = () => {
    const fields = formFields[props.about];
    if (!fields) {
      return null;
    }

    return fields.map((field, index) => {
      // console.log(field.name);
      if (field.type === "select" && field.name === "role") {
        if (props.usertype === "users") {
          return (
            <div
              className=" relative z-0 border-bottom "
              key={index + field.name}
            >
              <label>{field.label}</label>
              <select {...register(field.name)} className="form-select ">
                {roleOptions.map((option) => (
                  <option
                    key={option.value + option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div className=" relative z-0 border-bottom ">
              <label>{field.label}</label>
              <select
                {...register(field.name)}
                className="form-select "
                // disabled
                defaultValue="CUSTOMER"
              >
                <option value={1} selected>
                  Client
                </option>
              </select>
            </div>
          );
        }
      }

      // { label: "Client", value: 1 },
      if (field.type === "select" && field.name === "tarification") {
        return (
          <div
            className=" relative z-0 border-bottom text-black"
            key={index + field.name}
          >
            <label>{field.label}</label>
            <select {...register(field.name)} className="form-select ">
              {tarificationOptions.map((option) => (
                <option key={option.id + 2} value={option.id}>
                  {option.id}
                  ----- {option.montant}
                </option>
              ))}
            </select>
          </div>
        );
      }
      if (field.type === "select" && field.name === "paymentMode") {
        return (
          <div>
            <div
              className=" relative z-0 border-bottom "
              key={index + field.name}
            >
              <label>{field.label}</label>
              <select {...register(field.name)} className="form-select ">
                {payOptions.map((option) => (
                  <option
                    key={option.value + option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      }
      // console.log("selectedRole " + selectedRole);
      // console.log("fielname " + field.name);
      // console.log(" les labels >>" + JSON.stringify(fields));
      return (
        <>
          <div className=" relative z-0 border-bottom" key={index}>
            <input
              id={field.name}
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
              type={field.type}
              {...register(field.name, { required: true })}
              placeholder=" "
            />
            {errors[field.name] && (
              <span className="error text-danger">
                **Ce champ est obligatoire.
              </span>
            )}
            <label
              htmlFor={field.name}
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {field.label}
            </label>
          </div>
          <br />
        </>
      );
    });
  };
  const renderExtraInputs = () => {
    // if (
    //   // field.name === "role" &&
    //   props.usertype === "users"
    // ) {
    //   return (
    //     <div className="grid grid-rows-2 gap-4">
    //       {/* <div> */}
    //       <Col className="relative z-0 border-bottom">
    //         <input
    //           id="employeename"
    //           className="block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
    //           type="text"
    //           {...register("employeename", {
    //             required: true,
    //             pattern: /^[a-zA-Z\s]*$/,
    //           })}
    //           placeholder=" "
    //         />
    //         {errors.employeename && (
    //           <span className="error text-danger">
    //             **Ce champ est obligatoire.
    //           </span>
    //         )}
    //         <label
    //           htmlFor="employeename"
    //           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           {" "}
    //           Nom:
    //         </label>
    //       </Col>
    //       <Col className="relative z-0 border-bottom ">
    //         <input
    //           id="employeesurname"
    //           className="block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
    //           type="text"
    //           {...register("employeesurname", { required: true })}
    //           placeholder=" "
    //         />
    //         <label
    //           htmlFor="employeesurname"
    //           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           {" "}
    //           Prénom:
    //         </label>
    //         {errors.employeesurname && (
    //           <span className="error text-danger">
    //             **Ce champ est obligatoire.
    //           </span>
    //         )}
    //       </Col>
    //     </div>
    //   );
    // } else
    if (props.usertype === "CUSTOMER") {
      // console.log("usersr");
      return (
        <>
          {/* <div> */}
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* <div className=" relative z-0 border-bottom ">
            <input
              id="name"
              className={` block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer
                 ${errors.name ? "is-invalid" : ""}`}
              type="text"
              {...register("name", { required: true })}
              placeholder=" "
            />
            {errors.name && (
              <span className="error text-danger">
                **Ce champ est obligatoire.
              </span>
            )}{" "}
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nom
            </label>
          </div>
          <br />
          <div className=" relative z-0 border-bottom">
            <input
              id="surname"
              className={`block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer
                 ${errors.surname ? "is-invalid" : ""}`}
              type="text"
              {...register("surname", { required: true })}
              placeholder=" "
            />
            {errors.surname && (
              <span className="error text-danger">
                **Ce champ est obligatoire.
              </span>
            )}{" "}
            <label
              htmlFor="surname"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prenom
            </label>
          </div>
          <br /> */}
          <div className=" relative z-0 border-bottom ">
            {" "}
            <input
              id="phoneNumber"
              className={`block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer 
              ${errors.phoneNumber ? "is-invalid" : ""}`}
              type="number"
              {...register("phoneNumber", { required: true })}
              placeholder=" "
            />
            {errors.phoneNumber && (
              <span className="error text-danger">
                **Ce champ est obligatoire.
              </span>
            )}
            <label
              htmlFor="phoneNumber"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              N° Téléphone:
            </label>
          </div>
          <br />
          <div className=" relative z-0 border-bottom">
            <input
              id="address"
              className={`block py-2.5 px-0 w-full text-sm  text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer
               ${errors.address ? "is-invalid" : ""}`}
              type="text"
              {...register("address", { required: true })}
              placeholder=" "
            />
            {errors.address && (
              <span className="error text-danger">
                **Ce champ est obligatoire.
              </span>
            )}
            <label
              htmlFor="address"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Addresse :
            </label>
          </div>
        </>
      );
    }
  };

  const onSubmit = (data) => {
    const accountRequest = new FormData();
    // console.log(selectedRole);
    // Handle form submission
    const payload = {
      addRequest: data,
      // table: props.about,
    };

    console.log(data);
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
      switch (props.about) {
        case "tarification": //😁😀😀
          dispatch(addTarif(payload));
          // console.log("dieulna tarif");
          console.log("EXECEUTION DE    addTarif(payload);");

          break;
        case "destination": //😁😀😀
          dispatch(addDestination(payload));
          console.log("EXECEUTION DE   addDestination(payload);");

          // console.log("dieulna dest");
          break;
        // break;
        case "payMode": //😁😀😀
          dispatch(addPayMode(payload));
          console.log("EXECEUTION DE  addPayMode(payload)");
          break;
        case "payType": //😁😀😀
          dispatch(addPayType(payload));
          console.log("EXECEUTION DE addPayType(payload)");

          break;
        case "product": //😁😀😀
          dispatch(addProduct(payload));
          // console.log("dieulna tarif");
          console.log("EXECEUTION DE    addTarif(payload);");

          break;
        case "account": //😁😀😀 password: data.password, username: data.username, role: data.role
          accountRequest.append("username", data.username);
          accountRequest.append("password", data.password);
          // const payload = {
          //   accountRequest: accountRequest,
          // };
          //
          if (props.usertype === "users") {
            const user = {
              name: data.name,
              surname: data.surname,
            };
            accountRequest.append("role", data.role);
            accountRequest.append("user", JSON.stringify(user));
            dispatch(addUser(accountRequest));
          } else {
            const customer = {
              name: data.name,
              surname: data.surname,
              address: data.address,
              phoneNumber: data.phoneNumber,
            };
            accountRequest.append("customer", JSON.stringify(customer));

            dispatch(addCustomer(accountRequest)); //😁😀
          }
          // console.log("dieulna tarif");
          console.log("EXECEUTION DE    addTarif(payload);");

          break;
        // default:
        //   tableContent = destinations;
        // break;
      }
      // dispatch(manageCreation(payload));

    
      Toast.fire(
         "Opération effectuée avec succés !","",
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
       )
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rounded-full"
    >
      {/* <Card> */}
      <Modal.Header className="card-header  bg-green-600" closeButton>
        {/* <button className="btn btn-danger">Fermer</button> */}
        <Modal.Title className="card-title text-white ">
          <h4>{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="card-body">
        {" "}
        {/* <CardBody> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className=""> */}
          {renderFormFields()}
          {renderExtraInputs()}

          {/* </div> */}

          <button
            type="submit"
            className="mt-10 inline-block w-full rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            Enregistrer
          </button>
        </form>
        {/* </CardBody> */}
      </Modal.Body>
      {/* </Card> */}
    </Modal>
  );
};

export default Forms;
