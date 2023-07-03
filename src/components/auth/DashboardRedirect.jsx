import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const LoginRedirect = () => {
 const { isAdmin, isCustomer, isComm, isAdv } = useSelector(
   (state) => state.auth
 );
if (isCustomer) {
  return <Navigate to="/customer" replace />;
} else if (isAdmin) {
  return <Navigate to="/admin/dashboard" replace />;
} else if (isComm) {
  return <Navigate to="/comm/dashboard" replace />;
} else if (isAdv) {
  return <Navigate to="/adv/dashboard" replace />;
} else {
  return <Navigate to="/" replace />; // Redirect to home if the role is not defined or invalid
}
};


export default LoginRedirect;