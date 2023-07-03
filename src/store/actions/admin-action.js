import axios from "axios";

import { ordersActions } from "../orders-slice";
import { uiActions } from "../ui-slice";
import api from "../../utils/api";
import { settingsActions } from "../admin-slice";
import { useDispatch } from "react-redux";

const token = localStorage.getItem("token");
//--------------------ACCOUNTS
export const addCustomer = ( accountRequest ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(addRequest)
      const response = await axios.post(
        `http://localhost:8081/api/v1/accounts/account/customer/new`,
        accountRequest,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const delAccount = (id ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      console.log("execute delete hhh")
      const response = await axios.put(
        `http://localhost:8081/api/v1/accounts/delete/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

  
      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const blockAccount = (id ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    const postData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/accounts/block/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const unLockAccount = (id ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");
    console.log("niou bloquer ko");
    const postData = async () => {
      // console.log(id )
      const response = await axios.put(
        `http://localhost:8081/api/v1/accounts/unlock/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const addUser = (accountRequest ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(addRequest)
      const response = await axios.post(
        `http://localhost:8081/api/v1/accounts/account/new`,
        accountRequest,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: "Bearer " +token,
          },
          // withCredentials: true,
        }
      );
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};


export const addTarif = ({ addRequest  }) => {//✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(addRequest)
      const response = await axios.post(
        `http://localhost:8081/api/v1/tarifs/new`,
        addRequest,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const delTarif = ( id  ) => {
  //✔😁😀
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(id )
      const response = await axios.put(
        `http://localhost:8081/api/v1/tarifs/delete/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};


export const getTarifById = async({ id }) => {
   const fetchData = async () => {
     const response = await axios.get(
       `http://localhost:8081/api/v1/tarifs/list/${id}`,
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
       "Oops, Ofailed to fetch orders for customer  with order#" +
         id
     );
   }
};


export const getTarification= () => {
  //✔😁😀
  return async (dispatch) => {
    // dispatch(uiActions.operatorsLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/tarifs/list/all`,
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
      const tarification = await fetchData();
      dispatch(settingsActions.setTarification(tarification));
      // dispatch(uiActions.tarificationLoading());
    } catch (error) {
      console.log("failed to fetch tarification");
    }
  };
};

export const getDestinations = () => {
  //✔😁😀
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
      // console.log(data);
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




//DESTINATION
export const updateDestination = ({ updateRequest,id }) => {
  return async (dispatch) => {
    dispatch(uiActions.validateOrderLoading());
    console.log(JSON.stringify(updateRequest) + " 😩 idDest  bi " + id);
    const postData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/orderSettings/destinations/update/${id}`,
        updateRequest,
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
      console.log(" %c  : " + message, "color:pink" );
      dispatch(uiActions.validateOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const addDestination = ({ addRequest  }) => {
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(addRequest)
      const response = await axios.post(
        `http://localhost:8081/api/v1/orderSettings/destinations/new`,
        addRequest,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const delDestination = ( id  ) => {
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      // console.log(id )
      const response = await axios.put(
        `http://localhost:8081/api/v1/orderSettings/destinations/delete/${id}`,
        id,
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

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDestinationById = async ({ id  }) => {
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8081/api/v1/tarifs/list/${id}`,
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
    console.log(orders);
    return orders;
  } catch (error) {
    return (
      "Oops, Ofailed to fetch orders for customer  with order#" +
      id
    );
  }
};






export const getOpById = async ({ id  }) => {
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8081/api/v1/tarifs/list/${id}`,
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
    console.log(orders);
    return orders;
  } catch (error) {
    return (
      "Oops, Ofailed to fetch orders for customer with order#" +
      id
    );
  }
};


//----------------------------------PAYMENTMODE
export const updatePayMode = (id ) => {
  return async (dispatch) => {
    dispatch(uiActions.validateOrderLoading());
    console.log(JSON.stringify(id ) + " 😩");
    const postData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/orders/validate/${id}`,
         {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
           Authorization: "Bearer " + token,
          },
          // withCredentials: true,
        },
        console.log(`http://localhost:8081/api/v1/orders/validate/${id}`)
      );
      const data = response.data;
      return data;
    };

    try {
      const message = await postData();
      console.log(" %c  : " + message, "color:pink");
      dispatch(uiActions.validateOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPayMode = ({ addRequest  }) => {

  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      const response = await axios.post(
        `http://localhost:8081/api/v1/payModes/new`,
        addRequest,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const delPayMode = ( id  ) => {
  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/payModes/delete/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};


export const getPayModeByID = async ({ id  }) => {
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8081/api/v1/tarifs/list/${id}`,
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
    console.log(orders);
    return orders;
  } catch (error) {
    return (
      "Oops, Ofailed to fetch orders for customer  with order#" +
      id
    );
  }
};
//---------------------------------PAYMENTTYPE
export const addPayType = ({ addRequest  }) => {// 😁😀😀

  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      console.log(addRequest)
      const response = await axios.post(
        `http://localhost:8081/api/v1/orderSettings/paymentType/new`,
        addRequest,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const delPayType = ( id  ) => {
  // 😁😀😀

  return async (dispatch) => {
    dispatch(uiActions.addOrderLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      console.log(id );
      const response = await axios.put(
        `http://localhost:8081/api/v1/orderSettings/paymentType/delete/${id}`,
        id,
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
      console.log(" %c  : " + message, "color:pink");

      dispatch(uiActions.addOrderLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

