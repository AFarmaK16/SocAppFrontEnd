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
      // console.log(data);
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
      console.log("😀😀getOrdersId😀😀😀");
      const data = await response.data;
      console.log(data);
      console.log("😀😀-----------------😀😀😀");
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

export const addOrder = ({ orderRequest }) => {
  // export const addOrder = ({ order, token }) => {
  console.log("------______")
    console.log(JSON.stringify(orderRequest));

  return async (dispatchOrders) => {
    dispatchOrders(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");
   
    const postData = async () => {
      const response = await axios.post(
        "http://localhost:8081/api/v1/orders/add",
  JSON.stringify(orderRequest),
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
      console.log("message : ", message);
      // dispatchOrders(getOrders());
      // dispatch(ordersActions.addOrder(orderRequest));
      dispatchOrders(uiActions.addOrderLoading());
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

export const getOperators = () => {
  return async (dispatch) => {
    dispatch(uiActions.operatorsLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/operators`
      );

      const data = await response.data;
      console.log(data);
      return data;
    };

    try {
      const operators = await fetchData();
      dispatch(ordersActions.setOperators(operators));
      dispatch(uiActions.operatorsLoading());
    } catch (error) {
      console.log("failed to fetch operators");
    }
  };
};
