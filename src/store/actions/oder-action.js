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

export const validateOrder = (id) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.validateOrderLoading());
console.log(JSON.stringify(id)+" 😩")
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
      console.log(" %c message : " + message, "color:pink"+"finMessage");
      dispatchOrders(uiActions.validateOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const getOrdersById = (id) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.orderDetailLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/orders/lists/${id}`
      );
      // console.log(`😀😀ID${id} 😀😀😀`);
      const data = await response.data;
      console.log(data);
      // console.log("😀😀-----------------😀😀😀");
      return data;
    };

    try {
      const orderDetails = await fetchData();
      dispatchOrders(ordersActions.setOrdersDetails(orderDetails));
      dispatchOrders(uiActions.orderDetailLoading());
    } catch (error) {
      console.log("failed to fetch order details");
    }
  };
};
// export const getOrdersById = (id) => {
//   return async (dispatchOrders) => {
//     dispatchOrders(uiActions.orderDetailLoading());
//     const fetchData = async () => {
//       const response = await axios.get(
//         `http://localhost:8081/api/v1/orders/lists/637`
//       );
//       // console.log(`😀😀ID${id} 😀😀😀`);
//       const data = await response.data;
//       console.log(data);
//       // console.log("😀😀-----------------😀😀😀");
//       return data;
//     };

//     try {
//       const orderDetails = await fetchData();
//       dispatchOrders(ordersActions.setOrdersDetails(orderDetails));
//       dispatchOrders(uiActions.orderDetailLoading());
//     } catch (error) {
//       console.log("failed to fetch order details");
//     }
//   };
// };
export const addOrder = ({ orderRequest, itemList }) => {
  // export const addOrder = ({ order, token }) => {
  // console.log("------____ADDORDER__");
  // for (const [name, value] of orderRequest.entries()) {
  //   console.log(`${name}: ${value}`);
  // }
  // console.log("------____LLL__");
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(orderRequest)
      const response = await axios.post(
        "http://localhost:8081/api/v1/orders/add",
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
        `http://localhost:8081/api/v1/customers/${customerId}/orders/all`
      );

      const data = await response.data;
      return data;
    };

    try {
      const orders = await fetchData();

      dispatchOrders(ordersActions.replaceOrders(orders));
      dispatchOrders(uiActions.customerOrdersLoading());
    } catch (error) {
      console.log("Oops, failed to fetch orders for customer " + customerId);
    }
  };
};

// export const getCustomerOrdersById = ({ customerId, orderId}) => {
//   return async (dispatch) => {
//     dispatch(uiActions.cOrdersDetailsLoading());
//     const fetchData = async () => {
//       const response = await axios.get(
//         ` http://localhost:8081/api/v1/customers/${customerId}/orders/${orderId}`
//       );

//       const data = await response.data;
//       console.log("get it")
//       return data;
//     };

//     try {
//       const orders = await fetchData();

//       dispatch(ordersActions.setCustomerOrderDetails(orders));
//       dispatch(uiActions.cOrdersDetailsLoading());
//     } catch (error) {
//       console.log("Oops, Ofailed to fetch orders for customer " + customerId+" with order#"+orderId);
//     }
//   };
// };
export const getCustomerOrdersById = async({ customerId, orderId }) => {
   const fetchData = async () => {
     const response = await axios.get(
       ` http://localhost:8081/api/v1/customers/${customerId}/orders/${orderId}`
     );

     const data = await response.data;
     return data;
   };

   try {
     const orders = await fetchData();
console.log(orders)
    return orders
   } catch (error) {
    return(
       "Oops, Ofailed to fetch orders for customer " +
         customerId +
         " with order#" +
         orderId
     );
   }
};


export const getOperators = () => {
  return async (dispatch) => {
    dispatch(uiActions.operatorsLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/operators`
      );

      const data = await response.data;
      // console.log(data);
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
