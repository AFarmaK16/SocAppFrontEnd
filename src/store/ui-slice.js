import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  gridView: true,
  productDetailLoading: false,
  productsLoading: false,
  loginLoading: false,
  registerLoading: false,
  addPrductLoading: false,
  updateProductLoading: false,
  // --------------------------ORDER-------------
  orderGridView: true,
  orderDetailLoading: false,
  ordersLoading: false,
  addOrderLoading: false,
validateOrderLoading: false,
  updateOrderLoading: false,
  operatorsLoading: false,
  // -----------------------CUSTOMER----------------
  customerOrdersLoading: false,
  customerOrdersDetailsLoading:false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleView(state) {
      state.gridView = !state.gridView;
    },

    pDetailLoading(state) {
      state.productDetailLoading = !state.productDetailLoading;
    },
    productsLoading(state) {
      state.productsLoading = !state.productsLoading;
    },
    loginLoading(state) {
      state.loginLoading = !state.loginLoading;
    },
    registerLoading(state) {
      state.registerLoading = !state.registerLoading;
    },
    addPrductLoading(state) {
      state.addPrductLoading = !state.addPrductLoading;
    },
    updateProductLoading(state) {
      state.updateProductLoading = !state.updateProductLoading;
    },
    ///////////////////ORDERS
    orderDetailLoading(state) {
      state.orderDetailLoading = !state.orderDetailLoading;
    },
    ordersLoading(state) {
      state.ordersLoading = !state.ordersLoading;
    },
    operatorsLoading(state) {
      state.operatorsLoading = !state.operatorsLoading;
    },
    addOrderLoading(state) {
      state.addOrderLoading = !state.addOrderLoading;
    },
    validateOrderLoading(state) {
      state.validateOrderLoading = !state.validateOrderLoading;
    },
    // updateProductLoading(state) {
    //   state.updateProductLoading = !state.updateProductLoading;
    // }
    //////////////////////////CUSTOMERS
    customerOrdersLoading(state) {
      state.customerOrdersLoading = !state.customerOrdersLoading;
    },
    cOrdersDetailsLoading(state) {
      state.customerOrdersDetailsLoading = !state.customerOrdersDetailsLoading;
    },
  },
});


export const uiActions = uiSlice.actions;

export default uiSlice;