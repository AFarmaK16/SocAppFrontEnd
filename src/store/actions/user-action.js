import axios from "axios";

import { uiActions } from "../ui-slice";
import api from "../../utils/api";
import { usersActions } from "../user-slice";

export const getUsers = () => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.usersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/accounts/account/all"
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

export const getUserById = (id) => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.userDetailLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/accounts/account/${id}`
      );
      // console.log(`😀😀ID${id} 😀😀😀`);
      const data = await response.data;
      console.log(data);
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
            // // Authorization: "Bearer " + token,
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

      // dispatchAccount(getOrders());
      // dispatch(ordersActions.addOrder(orderRequest));
      dispatchAccount(uiActions.addUserLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateUser = (id) => {
  return async (dispatchAccount) => {
    dispatchAccount(uiActions.updateUserLoading());
    console.log(JSON.stringify(id) + " 😩");
    const postData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/orders/validate/${id}`,
        console.log(`http://localhost:8081/api/v1/orders/validate/${id}`)
      );
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c message : " + message, "color:pink" + "finMessage");
      dispatchAccount(uiActions.updateUserLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

