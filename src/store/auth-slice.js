import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: true,
    // isAuthenticated: false,
    user: null,
    isAdmin: false,
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            // const user = action.payload.user;
            state.user = "user";
            state.token = action.payload.token;
            //  state.user = user;
            // state.token = action.payload.token;
            state.isAuthenticated = true
            // if (user.role === 'admin') {
                state.isAdmin = true
            // }
        },
        register(state, action) {
            const user = action.payload.user;
            state.user = user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isAdmin = false;
        },
         test(state) {
            // state = initialState;
           state.isAdmin = true;
        }
        ,
        logout(state) {
            // state = initialState;
            Object.assign(state, initialState);
        }

    }
});



export const authActions = authSlice.actions;

export default authSlice;