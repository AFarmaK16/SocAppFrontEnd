import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { getCustomerOrders } from "../../store/actions/oder-action";
import CustomerDash from "../../components/dashboard/customerDash/CustomerDash";
import DashboardContent from "../../components/dashboard/DashboardContent";
import { getUserById } from "../../store/actions/user-action";
import { ReactComponent as BusinessShopSvg } from "../../assets/svg/undraw_business_shop_re_ruf4.svg";


const CustomerDashBoard = (props) => {
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();
 const userID = useSelector((state) => state.auth.userID);
 const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrders(token));
  // }, [dispatch]);
    useEffect(() => {
      dispatch(getCustomerOrders(userID));
    }, [dispatch, userID]);
      useEffect(() => {
        dispatch(getUserById(userID));
      }, [dispatch, userID]);
  return (
    <div>
      {/* <div className="w-[250px] h-screen top-0 left-0 sticky bg-tranparent"> */}
      <CustomerDash {...props} />

      {pathname === "/customer/c" && (
        <div className="pb-10">
          {" "}
          <h4 className="text-2xl  ml-8 mt-10">
            Construisez vos projets solides et durables en commandant notre
            ciment de haute qualité.
          </h4>
          <div className="flex justify-center items-center h-screen">
            <br />
            <BusinessShopSvg className="center" />
          </div>
        </div>
      )}

      {/* </div> */}
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </div>
  );
};

export default CustomerDashBoard;
