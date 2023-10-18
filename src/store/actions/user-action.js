import axios from "axios";

import { uiActions } from "../ui-slice";
import api from "../../utils/api";
import { usersActions } from "../user-slice";
const token = localStorage.getItem("token");
export const getUsers = () => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.usersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/accounts/account/all",
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          // withCredentials: true,
        }
      );

      const data = await response.data;
      // console.log("😀😀😀😀😀");
      // console.log(data);
      return data;
    };

    try {
      const users = await fetchData();
      dispatchAccount(usersActions.replaceUsers(users));
      dispatchAccount(uiActions.usersLoading());
    } catch (error) {
      console.log("failed to fetch orders");
    }
  };
};

export const getUserById = (userID) => {
  console.log(userID);
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.userDetailLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/accounts/account/${userID}`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          // withCredentials: true,
        }
      );
      // console.log(`😀😀ID${id} 😀😀😀`);
      const data = await response.data;
      // console.log(data);
      // console.log("😀😀-----------------😀😀😀");
      return data;
    };

    try {
      const userDetails = await fetchData();
      dispatchAccount(usersActions.setUsersDetails(userDetails));
      dispatchAccount(uiActions.userDetailLoading());
    } catch (error) {
      console.log("failed to fetch user details");
    }
  };
};

export const addUser = ({ orderRequest, itemList }) => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.addUserLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(orderRequest)
      const response = await axios.post(
        "http://localhost:8081/api/v1/accounts/account/new",
        orderRequest,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          // withCredentials: true,
        }
      );
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c message : " + message, "color:pink");
 
      dispatchAccount(uiActions.addUserLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateUser = (payload) => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.updateUserLoading());
    console.log(JSON.stringify(payload) + " 😩");
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8081/api/v1/accounts/account/update/${payload.id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: payload
      };

    const postData = async () => {
      const response = await axios.request(
      config)
       
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c message : " + message, "color:pink" + "finMessage");
      // localStorage.clear();
      // document.cookie =
      //   "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      dispatchAccount(uiActions.updateUserLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

