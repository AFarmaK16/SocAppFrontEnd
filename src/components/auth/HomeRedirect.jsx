import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import MainNavigation from "../../layout/MainNavigation";
import CustomerDashBoard from "../../pages/dashboard/CustomerDashBoard";


const LoginRedirect = () => {
    const  isCustomer = useSelector((state) => state.auth.isCustomer);
    console.log(useSelector((state) => state.auth.isCustomer));
    console.log(isCustomer);
    const { isAuthenticated } = useSelector((state) => state.auth.isAuth);

    return isCustomer ? (
      //   <Navigate to="/customer/products" replace />
      <div>
        {" "}
        <CustomerDashBoard /> <Outlet />
      </div>
    ) : (
      <div>
        <MainNavigation /> /<Outlet />
      </div>
    );

};


export default LoginRedirect;