import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  delivery_address: null,
    delivery_destination: null,
    delivery_comment: null,
    isRendu: false,
  isDecharged: false,
  ttc: null,
  Montant_Tva: null,
  isDeliveryFormSubmitted: false

};

const formSlice = createSlice({
  name: "shippingForm",
  initialState,
  reducers: {
    saveShippingInfos: (state, action) => {
      // console.log(action.payload);
      state.isDeliveryFormSubmitted = true;
      state.delivery_address = action.payload.delivery_address;
      state.delivery_destination = action.payload.delivery_destination;
      state.delivery_comment = action.payload.delivery_comment;
      state.isRendu = action.payload.isRendu;
      state.isDecharged = action.payload.isDecharged;
      state.ttc = action.payload.ttc;
      state.Montant_Tva = action.payload.Montant_Tva;
    },
    reinitializeShippingInfos: (state) => {
     Object.assign(state, initialState);
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
