import axios from "axios";

import { productsActions } from "../products-slice";
import { uiActions } from "../ui-slice";
import api from "../../utils/api";

const token = localStorage.getItem("token")
export const getProducts = () => {
  return async (dispatch) => {
    dispatch(uiActions.productsLoading());
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/products/lists",
        {
          headers: {
            // Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW5kYSIsImlhdCI6MTY4NDEzODU0MiwiZXhwIjoxNjg0MTM5OTgyfQ.5DF3OezUXT0L3rB1BGm2BLMV7dDQeTjBl85LgN8-v80",
          },
        }
        //
      );

      const data = await response.data;
      return data;
    };

    try {
      const products = await fetchData();

      dispatch(productsActions.replaceProducts(products));
      dispatch(uiActions.productsLoading());
    } catch (error) {
      console.log("failed to fetch products");
    }
  };
};

export const getProductDetails = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.pDetailLoading());
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8081/api/v1/products/lists/${id}`
      );

      const data = await response.data;
      // console.log("hello " + JSON.stringify(data));
      return data;
    };

    try {
      const productDetails = await fetchData();
      dispatch(productsActions.setProductDetails(productDetails));
      dispatch(uiActions.pDetailLoading());
    } catch (error) {
      console.log("failed to fetch product details");
    }
  };
};


//   return async (dispatch) => {
//     dispatch(uiActions.addPrductLoading());
//     // await api.get("/sanctum/csrf-cookie");

//     const postData = async () => {
//       const response = await axios.post(
//         "http://localhost:8081/api/products",
//         product,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // Authorization: "Bearer " + token,
//           },
//           withCredentials: true,
//         }
//       );
//       const data = response.data;
//       return data;
//     };

//     try {
//       const message = await postData();
//       console.log("message : ", message);
//       dispatch(getProducts());
//       // dispatch(productsActions.addProduct(product));
//       dispatch(uiActions.addPrductLoading());
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const addProduct = ({ addRequest }) => {
  return async (dispatch) => {
    dispatch(uiActions.addPrductLoading());
    // await api.get("/sanctum/csrf-cookie");

    const postData = async () => {
      const response = await axios.post(
        "http://localhost:8081/api/v1/products/add",
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
      console.log("message : ", message);
      dispatch(getProducts());
      // dispatch(productsActions.addProduct(product));
      dispatch(uiActions.addPrductLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.updateProductLoading());
    // await api.get("/sanctum/csrf-cookie");

    const putData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/products/delete/${id}`,
        console.log( `http://localhost:8081/api/v1/products/delete/${id}`),
         {
            headers: {
            Authorization: "Bearer " + token,
            },
         }
      );
      const data = response.data;
      return data;
    };

    try {
       const message = await putData();
      console.log(" %c message : " + message, "color:pink"+"finMessage");
      // await putData();
      // dispatch(getProducts());
      // dispatch(uiActions.updateProductLoading());
    } catch (error) {
      console.log(error);
    }
  };
};


export const updateProduct = (payload) => {
  return async (dispatch) => {
    dispatch(uiActions.updateProductLoading());
    // await api.get("/sanctum/csrf-cookie");
console.log(payload)
    const putData = async () => {
      const response = await axios.put(
        `http://localhost:8081/api/v1/products/update/${payload.id}`,
        payload.addRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      return data;
    };

    try {
      await putData();
      dispatch(getProducts());
      dispatch(uiActions.updateProductLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
