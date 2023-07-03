import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    isAuth: false,
    user: null,
    isAdmin: false,
    isCustomer: false,
    isComm: false,
    isAdv: false,
    userID: null,
    role: null,
    username:'',
    token:  localStorage.getItem("token")
};


const authSlice = createSlice({
    
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.role = action.payload.role;
            // const user = action.payload.user;
            state.user = action.payload.username;
            state.userID = action.payload.id;
            state.token = localStorage.getItem("token");
            console.log(action.payload);
            switch (action.payload.role) {
              case "ADV":
                state.isAdv = true;
                break;
              case "CUSTOMER":
                state.isCustomer = true;
                break;
              case "COMMERCIAL":
                state.isComm = true;
                break;
              case "ADMIN":
                state.isAdmin = true;

                break;

              default:
                break;
            }
            console.log("action.payload")
            console.log(action.payload)

            state.isAuth = true

            window.location.reload();
        },
        register(state, action) {
            const user = action.payload.user;
            state.user = user;
            state.token = localStorage.getItem("token");
            state.isAuthenticated = true;
            state.isAdmin = false;
        },

        logout(state) {
            // state = initialState;
            Object.assign(state, initialState);
            //  window.location.href = "/login";
        }

    }
});



export const authActions = authSlice.actions;

export default authSlice;