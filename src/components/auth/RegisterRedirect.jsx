import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const LoginRedirect = () => {
  console.log("IN REGISTERREDIRECF")
      const  userResetPass  = useSelector(
        (state) => state.auth.userResetPass
      );
       const { isAdmin, isCustomer, isComm, isAdv } = useSelector(
         (state) => state.auth
       );
      console.log("isAdmin"+isAdmin)
      console.log("isCustomer"+isCustomer)
      console.log("isComm"+isComm)
      console.log(userResetPass)


    return (userResetPass !== null ? <Navigate to="/changePassForm" replace /> :
      isAdmin ? (
        <Navigate to="/admin/dashboard" replace />
      ) : isAdv ? (
        <Navigate to="/adv/dashboard" replace />
      ) : isComm ? (
        <Navigate to="/comm/dashboard" replace />
      ) : isCustomer ? (
        <Navigate to="/customer/c" replace />
      ) :<Outlet />);

};


export default LoginRedirect;