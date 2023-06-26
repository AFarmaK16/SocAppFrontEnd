import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  orders: [],
  filteredOrders: [],
  orderDetails: [],
  totalOrders: 0,
  operators: [],
  banks:[],
  destinations:[],
  paymentMode:[],
  //
  customerOrderDetails:[],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    replaceOrders: (state, action) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.totalOrders = action.payload.length;
      // console.log(state.orders);
    },
    setCustomerOrderDetails: (state, action) => {
      // console.log("setCustomerOrderDetails");

      state.customerOrderDetails = action.payload;
      // state.filteredOrders = action.payload;
      // console.log(state.customerOrderDetails);
    },
    setOrdersDetails: (state, action) => {
      state.orderDetails = action.payload;
      // console.log(state.orderDetails);
    },
    setOperators: (state, action) => {
      state.operators = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
    setPayMode: (state, action) => {
      state.paymentMode = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
