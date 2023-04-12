import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  filteredOrders: [],
  orderDetails: [],
  totalOrders: 0,
  operators:[],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    replaceOrders: (state, action) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.totalOrders = action.payload.length;
    },
    setOrdersDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    setOperators: (state, action) => {
      state.operators = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
