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
  banksLoading: false,
  destinationLoading: false,
  paymentMLoading: false,
  // -----------------------CUSTOMER----------------
  customerOrdersLoading: false,
  customerOrdersDetailsLoading: false,
  //--------------------USERS-------
  userGridView: true,
  userDetailLoading: false,
  usersLoading: false,
  addUserLoading: false,
  updateUserLoading: false,
  deleteUserLoading: false,
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
    banksLoading(state) {
      state.banksLoading = !state.banksLoading;
    },
    destinationLoading(state) {
      state.destinationLoading = !state.destinationLoading;
    },
    paymentMLoading(state) {
      state.paymentMLoading = !state.paymentMLoading;
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
    //--------------USERS
    userDetailLoading(state) {
      state.userDetailLoading = !state.userDetailLoading;
    },
    usersLoading(state) {
      state.usersLoading = !state.usersLoading;
    },
    addUserLoading(state) {
      state.addUserLoading = !state.addUserLoading;
    },
    updateUserLoading(state) {
      state.updateUserLoading = !state.updateUserLoading;
    },
    deleteUserLoading(state) {
      state.deleteUserLoading = !state.deleteUserLoading;
    },
  },
});


export const uiActions = uiSlice.actions;

export default uiSlice;