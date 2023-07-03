import axios from "axios";

import { ordersActions } from "../orders-slice";
import { uiActions } from "../ui-slice";
import api from "../../utils/api";

const token = localStorage.getItem("token");
export const getOrders = () => {
  
  return async (dispatchOrders) => {
    console.log("___________________😁😁")
    console.log()
    dispatchOrders(uiActions.ordersLoading());
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/orders/lists/all",
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
// console.log(JSON.stringify(id)+" 😩")
let config = {
  method: "put",
  maxBodyLength: Infinity,
  url: `http://localhost:8081/api/v1/orders/validate/${id}`,

  headers: {
    Authorization: "Bearer " + token,
  },
};
    const postData = async () => {
      const response = await axios.request(config);
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c message : " + message, "color:pink");
      dispatchOrders(uiActions.validateOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const deliverOrder = (payload) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.validateOrderLoading());
    console.log(JSON.stringify(payload) + " 😩");
    console.log(JSON.stringify(token) + " 😩");
     let config = {
       method: "put",
       maxBodyLength: Infinity,
       url: `http://localhost:8081/api/v1/orders/changeState/${payload.id}`,

       headers: {
         Authorization: "Bearer " + token,
       },
       data: payload.deliverRequest
     };
    
    const postData = async () => {
      const response = await axios.request(
       config
      );
        console.log(
          `http://localhost:8081/api/v1/orders/changeState/${payload.id}`
        );
        console.log(payload.deliverRequest);
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c message : " + message, "color:pink");
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
        `http://localhost:8081/api/v1/orders/lists/${id}`,
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
export const addOrder = ({ orderRequest }) => {
 
  console.log("------🥇🥇🥇🥇🥇");
  for (const [name, value] of orderRequest.entries()) {
    console.log(`${name}: ${value}`);
  }
  console.log("------____LLL_🥇🥇_");
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
            Authorization: "Bearer " + token,
          },
          // withCredentials: true,
        }
      );
      const data = response.data;
      return data;
    };

    try {
      const message =
       await postData();
      console.log(" %c message : " + message, "color:pink");
 
      dispatchOrders(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const calculateTTc = ({ ttcRequest  }) => {
  console.log("------🥇🥇🥇🥇🥇");
  for (const [name, value] of ttcRequest.entries()) {
    console.log(`${name}: ${value}`);
  }
  console.log("------____LLL_🥇🥇_");
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(ttcRequest)
      const response = await axios.post(
        "http://localhost:8081/api/v1/orders/calculateTotal",
        ttcRequest,
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
      // console.log(" %c message : " + message, "color:pink");
    
      dispatchOrders(uiActions.addOrderLoading());
        return message;

    } catch (error) {
      console.log(error);
    }
  };
};
export const getCustomerOrders = (customerId) => {
  return async (dispatchOrders) => {
    dispatchOrders(uiActions.customerOrdersLoading());
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8081/api/v1/customers/${customerId}/orders/all`,
 
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const fetchData = async () => {
      const response = await axios.request(
        config
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


export const getCustomerOrdersById = async({ customerId, orderId }) => {
   const fetchData = async () => {
     const response = await axios.get(
       ` http://localhost:8081/api/v1/customers/${customerId}/orders/${orderId}`,
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
        `http://localhost:8081/api/v1/payModes`,
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


export const getDestinations = () => {
  return async (dispatch) => {
    dispatch(uiActions.destinationLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/orderSettings/destinations`,
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
      // console.log(data);
      return data;
    };

    try {
      const destinations = await fetchData();
      dispatch(ordersActions.setDestinations(destinations));
      dispatch(uiActions.destinationLoading());
    } catch (error) {
      console.log("failed to fetch destinations");
    }
  };
};
export const getPaymentModes = () => {
  return async (dispatch) => {
    dispatch(uiActions.paymentMLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/orderSettings/paymentType`,
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
      // console.log("hello");
      return data;
    };

    try {
      const payMode = await fetchData();
      dispatch(ordersActions.setPayMode(payMode));
      dispatch(uiActions.paymentMLoading());
    } catch (error) {
      console.log("failed to fetch payMode");
    }
  };
};
