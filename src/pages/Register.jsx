import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';

import { FaUserAlt } from "react-icons/fa";
import { FiLogIn, FiSend } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateCode, login, register, verifyCode, verifyResetCode } from '../store/actions/auth-actions';
import TheSpinner from "../layout/TheSpinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert } from "reactstrap";

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: .3 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
};

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.registerLoading);
  const [message, setMessage] = useState("");
    const [customerVerification, setCustomerVerification] = useState(false);
      const [verificationCode, setVerificationCode] = useState("");
        const [username, setUsername] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmail = async (data) => {
    const payload = {
      username: data.username,
    };

    try {
      const generateCodeResponse = await dispatch(generateCode(payload));
      const { message } = generateCodeResponse; // Extract the message from the response
      setMessage(String(generateCodeResponse));
      console.log(generateCodeResponse);
    //  alert(generateCodeResponse);
     setUsername(data.username)
      setCustomerVerification(true);
    
      
    } catch (error) {
      console.log(error);
       setMessage(String(error));
    }
  };
   const handleVerification = async () => {
     const payload = {
       username: username,
       otpcode: verificationCode,

       // itemList: items,
     };
     try {
       const authenticationResponse = await dispatch(verifyResetCode(payload));
     } catch (verificationError) {
       // Handle verification error (invalid code, server error, etc.)
       setMessage("Code de verification invalide");
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
      <div className="w-[320px] sm:w-[400px] rounded shadow-xl border-2 border-solid px-4 sm:px-8 py-20 mx-auto">
        <h2 className=" uppercase tracking-wider font-bold text-center mb-12 select-none">
          <span className="text-3xl text-success">SOCOCIM</span>
          <br />
          <span className="text-secondary-200">INDUSTRIES</span>
        </h2>
        {message && (
          <Alert className="text-sm">
            {message}
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
          <form onSubmit={handleSubmit(handleEmail)}>
            <div>
              <p className="text-sm">
                Veuillez entrer le votre identifiant de connexion
              </p>
              Identifiant:
              <input
                type="text"
                name="username"
                id="username"
                placeholder="xxx@xxx.xxx"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                {...register("username", {
                  required: true,
                  pattern: /^[a-zA-Z0-9\s-@.]*$/,
                })}
              />
              {errors.username && (
                <div>
                  <span className="text text-danger">Identifiant invalide</span>
                </div>
              )}
              <br />
              {/* <button className="btn btn-success " onClick={handleVerification}>
                Vérifier
              </button> */}
            </div>

            <hr />
            <button
              type="submit"
              className="px-4 py-2 block mt-3 ml-auto text-success border border-success hover:text-white hover:bg-primary rounded-md"
            >
              <span className="inline-flex justify-items-center mr-1">
                <FiSend />
              </span>
              Envoyer
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Register;
