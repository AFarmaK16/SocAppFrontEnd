import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, input, Button, Alert } from "reactstrap";
import { getCustomerOrdersById } from "../../store/actions/oder-action";
import { getUserById, updateUser } from "../../store/actions/user-action";
import DashboardContent from "./DashboardContent";
import { BiReset } from "react-icons/bi";
import { resetPassword } from "../../store/actions/auth-actions";
import { Navigate } from "react-router-dom";

const Profile = (props) => {
  console.log(props)
  const userID = useSelector((state) => state.auth.userID);
    const accountData = useSelector((state) => state.users.userDetails);
    // console.log(userID)
    console.log(accountData);
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);
      const  userResetPass = useSelector((state) => state.auth.userResetPass);
        const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();


  const validatePasswordConfirmation = (value) => {
    const password = watch("password");
    return value === password || "Les mots de passe ne correspondent pas";
  };


  const handleChangePassword = async (event) => {
    // alert(JSON.stringify(event));
    console.log(" 🔥🔥");
    console.log(event);
    const payload = {
     
      username: userResetPass,
       newPassword: event.password
    };
   
        try {
          const passwordResetResponse = await dispatch(resetPassword(payload));
          setMessage("Changement de mot de passe effectué avec succès!");
          console.log("Changement de mot de passe effectué avec succès!");
         
        } catch (error) {
          console.log(error);
          setMessage(String(error));
        }
  };

  const handleFormSubmit = async (event) => {
    // alert(JSON.stringify(event));
    console.log(" 🔥🔥");
    console.log(event);
    const payload = {
      address: event.address,
      newPassword: event.password,
      role: accountData.role,
      id: userID,
    };
    dispatch(updateUser(payload));
  };

  return (
    <div className="flex m-7 space-x-6">
      <div className="w-100 bg-white p-4 flex justify-center items-center">
        {props.action === "changePass" ? (
          <div className="">
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="border-green-600 m-7 p-6 border-b-2 pb-3 bg-white rounded">
                <div className="text-4xl text-gray-800 font-medium">
                  Reinitialisation de mot de passe
                </div>
                <div className="mt-4"></div>
              </div>
              {message && (
                <div>
                  <Alert className="text-sm">{message}</Alert>{" "}
                  <Navigate to="/login" replace />
                </div>
              )}
              <Label for="password">Nouveau mot de passe</Label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 8,
                    message:
                      "Le mot de passe doit comporter au moins 8 caractères",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                  },
                })}
              />
              {errors.password && (
                <div>
                  <span className="text text-danger">
                    {errors.password.message}
                  </span>
                </div>
              )}
              {/* </FormGroup>

      <FormGroup> */}
              <Label for="confirmPassword">Confirmer le mot de passe</Label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est requise",
                  validate: validatePasswordConfirmation,
                })}
              />
              {errors.confirmPassword && (
                <div>
                  <span className="text text-danger">
                    {errors.confirmPassword.message}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 block mt-3 ml-auto text-success border border-success hover:text-white hover:bg-primary rounded-md"
              >
                <span className="inline-flex justify-items-center mr-1">
                  <BiReset /> Réinitialiser le mot de passe
                </span>
              </button>
            </form>
          </div>
        ) : (
          <div className="pb-10">
            {role !== "CUSTOMER" && (
              <div className="border-green-600 m-7 p-6 border-b-2 pb-3 bg-white rounded">
                <div className="text-4xl text-gray-800 font-medium">
                  Bonjour,{role} &nbsp;
                  {user}
                </div>
                <div className="mt-4"></div>
              </div>
            )}

            <div className="flex m-7 space-x-6">
              <div className="w-100 bg-white p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Label for="name">Nom</Label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={
                      accountData.customer
                        ? accountData.customer.name
                        : accountData.user.name
                    }
                    disabled
                  />

                  <Label for="lastName">Prenom</Label>
                  <input
                    className="form-control"
                    type="text"
                    name="prenom"
                    id="prenom"
                    value={
                      accountData.customer
                        ? accountData.customer.surname
                        : accountData.user.surname
                    }
                    disabled
                  />

                  {accountData.customer && (
                    // <FormGroup>
                    <div>
                      <div>
                        <Label for="email">Adresse</Label>
                        <input
                          type="address"
                          name="address"
                          id="address"
                          value={accountData.customer.address}
                          className={`form-control ${
                            errors.adresse ? "is-invalid" : ""
                          }`}
                          {...register("adresse", {
                            required: true,
                            pattern: /^[a-zA-Z0-9\s,'-]*$/,
                          })}
                        />
                      </div>
                      {errors.adresse && (
                        <div>
                          <span className="text text-danger">
                            Adresse invalide
                          </span>
                        </div>
                      )}
                      <br />
                    </div>

                    // </FormGroup>
                  )}

                  <Label for="password">Mot de passe</Label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`form-control form-input rounded-r w-full ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <div>
                      <span className="text text-danger">
                        Le mot de passe est requis
                      </span>
                    </div>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <div>
                      <span className="text text-danger">
                        Le mot de passe doit comporter au moins 8 caractères.
                      </span>
                    </div>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <div>
                      <span className="text text-danger">
                        Le mot de passe doit contenir au moins une lettre
                        majuscule, une lettre minuscule, un chiffre et un
                        caractère spécial.
                      </span>
                    </div>
                  )}
                  <br />
                  <br />
                  <Button color="btn btn-success text-black" type="submit">
                    Enregistrer
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
