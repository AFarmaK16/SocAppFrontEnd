import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  settings: [],
  filteredSettings: [],
  settingDetails: [],
  totalSettings: 0,
  tarifications: [],
  banks:[],
  destinations:[],
  paymentMode:[],
  //
  customerSettingDetails:[],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    replaceSettings: (state, action) => {
      state.settings = action.payload;
      state.filteredSettings = action.payload;
      state.totalSettings = action.payload.length;
      console.log(state.settings);
    },
    setCustomerSettingDetails: (state, action) => {
      // console.log("setCustomerSettingDetails");

      state.customerSettingDetails = action.payload;
      // state.filteredSettings = action.payload;
      console.log(state.customerSettingDetails);
    },
    setSettingsDetails: (state, action) => {
      state.settingDetails = action.payload;
      console.log(state.settingDetails);
    },
    setTarification: (state, action) => {
      state.tarifications = action.payload;
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

export const settingsActions = settingsSlice.actions;

export default settingsSlice;
