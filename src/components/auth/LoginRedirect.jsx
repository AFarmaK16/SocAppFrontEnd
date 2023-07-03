import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoginRedirect = () => {
  // const { isAdmin } = useSelector((state) => state.auth.isAdmin);
  const { isAdmin, user, isCustomer, isComm, isAdv } = useSelector(
    (state) => state.auth
  );

  return (
    <div>
      {/* PUT VERIFICATION TO CHECK IF IT IS ADMIN /ADV/COMM FOR THE LINK TO NAVIGATE TO */}
      {isAdmin ? (
        <Navigate to="/admin/dashboard" replace />
      ) : isAdv ? (
        <Navigate to="/adv/dashboard" replace />
      ) : isComm ? (
        <Navigate to="/comm/dashboard" replace />
      ) : isCustomer ? (
        <Navigate to="/customer" replace />
      ) : (
        <Outlet />
      )}
      {/* OUTLET MEAN THE LOGIN PAGE */}
    </div>
  );
};

export default LoginRedirect;
