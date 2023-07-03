// import axios from "axios";
import api from "../../utils/api";
import axios from "axios";
import { authActions } from '../auth-slice';
import { uiActions } from "../ui-slice";
import { useState } from "react";


const token = localStorage.getItem("token");
export const login = (payload) => {
    return async dispatch => {
        dispatch(uiActions.loginLoading());
        const postData = async () => {
              const response = await axios.post(
                "http://localhost:8081/api/v1/auth/authenticate",
                payload,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

            const data =  response.data;
            return data;
        };

        try {
         
            const credentials = await postData();
           
            console.log(credentials)
              if ( credentials.role ) {
              // if ( credentials.role && credentials.role !== "CUSTOMER") {
                // User is not a customer, handle JWT token
                localStorage.setItem("token", credentials.token);
                localStorage.setItem("role", credentials.role);
                localStorage.setItem("username", credentials.username);
                localStorage.setItem("userID", credentials.id);
                
                await dispatch(authActions.login(credentials));
                // Redirect the user to the desired page
              } 
               return credentials;
        } catch (error) {
         throw new Error(error.response.data); // Throw the error message
        }
    }
};

export const verifyCode = (payload) => {
  return async (dispatch) => {
    dispatch(uiActions.loginLoading());
    console.log(payload)
    const postData = async () => {
      const response = await axios.post(
        `http://localhost:8081/api/v1/auth/verifyOTP/${payload.otpCode}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      return data;
    };

    try {
      const credentials = await postData();
           localStorage.setItem("token", credentials.token);
           await dispatch(authActions.login(credentials));

    } catch (error) {
      throw new Error(error.response.data); // Throw the error message
    }
  };
};



export const register = (payload) => {
    return async dispatch => {
        dispatch(uiActions.registerLoading())
        // await api.get('/sanctum/csrf-cookie');

        const postData = async () => {
            const response = await api.post("/api/register", payload);

            const data = await response.data;
            return data;
        };

        try {
            const user = await postData();
            await dispatch(authActions.register(user));
            dispatch(uiActions.registerLoading());
        } catch (error) {
            console.log(error);
        }
    }
};


export const logout = () => {
    console.log(token)
     return async (dispatch) => {
       dispatch(uiActions.addOrderLoading());
       // await api.get("/sanctum/csrf-cookie");
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/api/v1/auth/logout',
        headers: { 
          'Authorization': 'Bearer '+token,
        }
      }

       const logout = async () => {
         // console.log(id,token)
         const response = await axios.request(
        config
         );
         const data = response.data;
         return data;
       };

     try {
       await logout();
       localStorage.clear()
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload()
       dispatch(authActions.logout());
     } catch (error) {
       console.log(error);
     }
     };
    
};
