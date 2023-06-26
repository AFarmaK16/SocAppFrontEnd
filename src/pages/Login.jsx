import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';

import { MdLogin } from "react-icons/md";
import { FiLogIn } from 'react-icons/fi'
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/auth-actions';
import TheSpinner from "../layout/TheSpinner";
import { useForm } from "react-hook-form";



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




const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loginLoading);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().username("Invalid username address").required("Required"),
  //     password: Yup.string().required("Required"),
  //   }),
  //   onSubmit: async (values) => {

  //     try {
  //       await dispatch(login(values));
  //     } catch (error) {
  //       console.log(error);
  //     }
      
  //   },
  // });
    const handleFileChange = async (event) => {
      // const delivery = {
      //  ok: "nk"
      alert("logged")

      const formData = new FormData();

      formData.append("deliverRef", 1);

      formData.append("customerRef", 1);

      formData.append("customerID", 4);

    
      // formData.append("facture.payment_reference", event.reference);
      // formData.append("facture.operator", event.payment_operator);
      // formData.append("facture.payment_bank", event.bank);
      // formData.append("facture.payment_type", event.payment_date);

      // -------------
      ///TRYING TO ADD ORDER
      const payload = {
        orderRequest: formData,
        // itemList: items,
      };

      try {
        // dispatchOrders(addOrder(payload));
        // swal({
        //   title: "Commande enregistrée!",
        //   text: `Votre commande a bien été enregistrée et est en cours de traitement!\nMerci de votre fidelité😊!!`,
        //   icon: "success",
        //   button: "OK!",
        // });
        // dispatchOrders(cartActions.clearCart());
      } catch (error) {
        console.log("%c" + error, "color:purple");
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
        <h2 className="text-3xl uppercase tracking-wider font-bold text-center mb-12 select-none">
          <span className="text-primary">SOCOCIM</span>
          &nbsp;
          <span className="text-secondary-200">INDUSTRIES</span>
        </h2>
        {loading ? (
          <TheSpinner />
        ) : (
          <form
            // onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit(handleFileChange)}
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
                    pattern: /^[a-zA-Z0-9]+$/,
                  })}
                />
              </div>
              {/* {errors.username && (
                <div>
                  <hr />
                  <span className="text text-danger">Saisie incorrecte</span>
                  <hr />
                </div>
              )} */}

              {/* {formik.touched.username && formik.errors.username && (
              <p className="text-xs font-semibold text-red-600">
                {formik.errors.username}
              </p>
            )} */}
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label
                htmlFor="password"
                className="font-semibold tracking-wider"
              >
                Password
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
                    pattern: /^[a-zA-Z0-9._%+-]+$/,
                  })}
                  placeholder="********"
                />
              </div>

              {/* {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-600">{formik.errors.password}</p>
            )} */}
            </div>
            {errors.password || errors.username ?
                (<div>
                  <span className="text text-danger">Login ou mot de passe incorrecte</span>
                </div>):""
              }
            <button
              type="submit"
              className="px-4 py-2 block mt-3 ml-auto text-primary border border-primary hover:text-white hover:bg-primary rounded-md"
            >
              <span className="inline-flex justify-items-center mr-1">
                <FiLogIn />{" "}
              </span>
              Login
            </button>
          </form>
        )}
        <p className="text-center mt-6">
         Vous n'avez pas de compte?{" "}
          <Link to="/register" className="text-primary">
            Creer un compte
          </Link>{" "}
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
