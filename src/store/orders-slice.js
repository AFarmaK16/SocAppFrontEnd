import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    orders: [],
    filteredOrders: [],
    ordersDetails: [],
    totalOrders: 0,
    
};


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        replaceOrders: (state, action) => {
            state.orders = action.payload;
            state.filteredOrders = action.payload;
            state.totalOrders = action.payload.length;
        },
        setOrdersDetails: (state, action) => {
            state.ordersDetails = action.payload;
        },

    }
});



export const ordersActions = ordersSlice.actions;

export default ordersSlice;