import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import TheSidebar from '../../components/dashboard/TheSidebar';
import DashboardContent from '../../components/dashboard/DashboardContent';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { getOrders } from '../../store/actions/oder-action';


const Dashboard = (props) => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const user = "Adja";
    useEffect(() => {
      dispatch(getOrders());
    }, [dispatch]);

  // useEffect(() => {
  //   dispatch(authActions.login(user));
  // }, [dispatch]);

  //     try {
  //       await dispatch(login(values));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   dispatch(authActions.test())
  // authActions.
  return (
    <div className="w-full flex ">
      <div className="w-[250px] h-screen top-0 left-0 sticky bg-tranparent">
        <TheSidebar {...props} />
      </div>
      <div className="w-full bg-gray-200">
        {/* <DashboardNavbar /> */}
        <div>
          {pathname === "/admin/dashboard" && <DashboardContent />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;