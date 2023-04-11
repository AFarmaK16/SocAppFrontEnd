import axios from "axios";

import { ordersActions } from "../orders-slice";
import { uiActions } from "../ui-slice";
import api from "../../utils/api";

export const getOrders = () => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.ordersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/orders/lists/all"
      );

      const data = await response.data;
      // console.log("😀😀😀😀😀");
      console.log(data);
      return data;
    };

    try {
      const orders = await fetchData();
      dispatchOrders(ordersActions.replaceOrders(orders));
      dispatchOrders(uiActions.ordersLoading());
    } catch (error) {
      console.log("failed to fetch orders");
    }
  };
};

export const getOrdersById = (id) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.ordersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/orders/lists/${id}`
      );

      const data = await response.data;
      console.log("hello " + data);
      return data;
    };

    try {
      const orderDetails = await fetchData();
      dispatchOrders(ordersActions.setOrdersDetails(orderDetails));
      dispatchOrders(uiActions.ordersLoading());
    } catch (error) {
      console.log("failed to fetch order details");
    }
  };
};

export const addOrder = ({ order, token }) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      const response = await axios.post(
        "http://localhost:8081/api/orders/add",
        order,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log("message : ", message);
      // dispatchOrders(getOrders());
      dispatchOrders(ordersActions.addOrder(order));
      dispatchOrders(uiActions.addPrductLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCustomerOrders = (customerId, token) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.customerOrdersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `/api/customers/${customerId}/orders/all`
      );

      const data = await response.data;
      return data;
    };

    try {
      const orders = await fetchData();

      dispatchOrders(ordersActions.replaceOrders(orders));
      dispatchOrders(uiActions.customerOrdersLoading());
    } catch (error) {
      console.log("Oops, Ofailed to fetch orders for customer " + customerId);
    }
  };
};

export const getCustomerOrdersById = ({ customerId, ordeId, token }) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.customerOrdersDetailsLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `/api/customers/${customerId}/orders/${ordeId}`
      );

      const data = await response.data;
      return data;
    };

    try {
      const orders = await fetchData();

      dispatchOrders(ordersActions.replaceOrders(orders));
      dispatchOrders(uiActions.customerOrdersDetailsLoading());
    } catch (error) {
      console.log("Oops, Ofailed to fetch orders for customer " + customerId);
    }
  };
};
