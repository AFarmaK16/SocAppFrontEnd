import React, { useState } from "react";
import { motion } from "framer-motion";

import { MdLogin } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyCode } from "../store/actions/auth-actions";
import TheSpinner from "../layout/TheSpinner";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Login = () => {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.ui.loginLoading);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [customerVerification, setCustomerVerification] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [counter, setCounter] = useState(3);
  const handleLogin = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
      // itemList: items,
    };

    try {
      const authenticationResponse = await dispatch(login(payload));
      console.log(authenticationResponse)
       if (authenticationResponse.role) {
      //  if (authenticationResponse.role && authenticationResponse.role !== "CUSTOMER") {
         // User is not a customer, handle JWT token
         localStorage.setItem("token", authenticationResponse.token);
          localStorage.setItem("token", authenticationResponse.token);
          localStorage.setItem("role", authenticationResponse.role);
          localStorage.setItem("username", authenticationResponse.username);
          localStorage.setItem("userID", authenticationResponse.id);
         // Redirect the user to the desired page
       } else {
        console.log("User is a customer, display the verification form");
         // User is a customer, display the verification form
         // Set the verification code and handle the verification process
        //  setVerificationCode("");
        setUsername(authenticationResponse.username);
         setErrorMessage("");
         setCustomerVerification(true);
       }
      //  await dispatch(login(payload));

    } catch (error) {
      console.log(error)
      setErrorMessage(String(error));
    }
  };

  const handleVerification = async () => {
     const payload = {
        username: username,
       otpcode: verificationCode,
     
       // itemList: items,
     };
    try {
    
      const authenticationResponse = await dispatch(verifyCode(payload));


    } catch (verificationError) {
      // Handle verification error (invalid code, server error, etc.)
      setErrorMessage("Code de verification invalide");
    }
  };

  return (
    <motion.div
      className="w-[80%] mx-auto mt-40 mb-52"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-[400px] sm:w-[400px] rounded shadow-xl border-2 border-solid px-4 sm:px-8 py-20 mx-auto">
        <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-12 select-none">
          <span className="text-primary">SOCOCIM</span>
          &nbsp;
          <span className="text-secondary-200">INDUSTRIES</span>
        </h2>
        {errorMessage && (
          <Alert color="danger" className="text-sm">
            {errorMessage}
          </Alert>
        )}
        {customerVerification ? (
          <div>
            <p className="text-sm">
              Veuillez entrer le code de vérification qui vous a été envoyé
              (expire au bout de 10 min)
            </p>
            Code de vérification:
            <input
              type="number"
              name="verificationCode"
              value={verificationCode}
              id="verificationCode"
              placeholder="XXXX"
              className={`form-control ${
                errors.verificationCode ? "is-invalid" : ""
              }`}
              {...register("verificationCode", {
                required: true,
                pattern: /^[a-zA-Z0-9\s,'-]*$/,
              })}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {errors.verificationCode && (
              <div>
                <span className="text text-danger">Code invalide</span>
              </div>
            )}
            <br />
            <button className="btn btn-success " onClick={handleVerification}>
              Vérifier
            </button>
          </div>
        ) : (
          <form
            // onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col space-y-1 mb-4">
              <label
                htmlFor="username"
                className="font-semibold tracking-wider"
              >
                Nom d'utilisateur:
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center border border-gray-300 border-r-0 py-2 px-3 bg-gray-300  text-black">
                  <MdLogin />
                </span>
                <input
                  className={`form-control form-input rounded-r w-full ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="username"
                  id="username"
                  {...register("username", {
                    required: true,
                    pattern: /^[a-zA-Z0-9@.]+$/,
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label
                htmlFor="password"
                className="font-semibold tracking-wider"
              >
                Mot de passe :
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center border border-gray-300 border-r-0 py-2 px-3 bg-gray-300  text-black">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-control form-input rounded-r w-full ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: true,
                    pattern: /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{};:,.?]+$/,
                  })}
                  placeholder="********"
                />
              </div>
            </div>
            {errors.password || errors.username ? (
              <div>
                <span className="text text-danger">
                  Identifiant ou mot de passe incorrecte
                </span>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="px-4 py-2 block mt-3 ml-auto text-primary border border-primary hover:text-white hover:bg-primary rounded-md"
            >
              <span className="inline-flex justify-items-center mr-1">
                <FiLogIn />{" "}
              </span>
              Se connecter
            </button>
          </form>
        )}
        <p className="text-center mt-6">
          .
          {/* Vous n'avez pas de compte?{" "}
          <Link to="/register" className="text-primary">
            Creer un compte
          </Link>{" "} */}
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
