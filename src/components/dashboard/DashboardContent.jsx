import React from "react";

import { FaStore, FaStoreAltSlash, FaWallet } from "react-icons/fa";
import BarChart from "../../charts/BarChart";
import LineChart from "../../charts/LineChart";
import DoughnutChart from "../../charts/DoughnutChart";
import RadarChart from "../../charts/RadarChart";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/actions/user-action";
import { useEffect } from "react";

const DashboardContent = () => {
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

         const userID = useSelector((state) => state.auth.userID);

         useEffect(() => {
           dispatch(getUserById(userID));
         }, [dispatch, userID]);
  const accountData = useSelector((state) => state.users.userDetails);
  console.log(accountData)


  return (
    <div className="">
      {/* start banner */}
      <div className="bg-indigo-200 m-7 p-6">
        <div className="text-4xl text-gray-800 font-medium">
          Bonjour,{role} &nbsp;
          {user}
          {/* <b>
            {accountData.customer ? (
              <span>
                {accountData.customer.name} &nbsp;{" "}
                {accountData.customer.surname}
              </span>
            ) : (
              <span>
                {accountData.user.name} &nbsp;{" "}
                {accountData.user.surname}
              </span>
            )}
          </b> */}
        </div>
        <div className="mt-4"></div>
      </div>

      <div className="flex m-7 space-x-6">
        <div className="w-100 bg-white p-4">
          <BarChart />
        </div>
      </div>

      <div className="flex m-7 space-x-6">
        <div className="w-1/2 bg-white p-4">
          <span className="text-amber-400 text-2xl">
            <FaWallet />
          </span>

          <DoughnutChart />
        </div>
        <div className="w-1/2 bg-white p-4">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
