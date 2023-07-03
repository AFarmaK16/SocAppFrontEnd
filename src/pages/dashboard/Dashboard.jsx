import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import TheSidebar from '../../components/dashboard/TheSidebar';
import DashboardContent from '../../components/dashboard/DashboardContent';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { getOrders } from "../../store/actions/oder-action";
import { getUserById } from '../../store/actions/user-action';



const Dashboard = (props) => {
  const { pathname } = useLocation();
    const token = localStorage.getItem("token");
 const isAuthenticated = useSelector((state) => state.auth.isAuth);

    console.log(localStorage.getItem("token"));

  const dispatch = useDispatch();
     const userID = useSelector((state) => state.auth.userID);

   useEffect(() => {
     dispatch(getUserById(userID));
   }, [dispatch, userID]);
    useEffect(() => {
      dispatch(getOrders(token));
    }, [dispatch]);

 
  return (
    <div className="w-full flex ">
      <div className="w-[250px] h-screen top-0 left-0 sticky bg-tranparent">
        <TheSidebar {...props} />
      </div>
      <div className="w-full bg-gray-200">
        <div>
          {pathname === "/comm/dashboard"  && <DashboardContent />}
          {pathname === "/adv/dashboard" && <DashboardContent />}
          {isAuthenticated ?( <Outlet />) : <Navigate to="/login" replace />}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;