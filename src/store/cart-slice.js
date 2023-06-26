import { createSlice } from "@reduxjs/toolkit";

// const getLocaleStorage = () => {
//     let cart = localStorage.getItem('cart');
//     if (cart) {
//         return JSON.parse(localStorage.getItem('cart'));
//     } else {
//         return []
//     }
// };

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add a product to card 💖🥱🥱
    addItemsToCart(state, action) {
      // cest pour le button

      const newItem = action.payload;
      console.log("💖🥱🥱");
      console.log(newItem)
      // console.log("💖🥱🥱");
      const existingItem = state.items.find((item) => item.id === newItem.id);
      newItem.montant = Number(newItem.montant);
      if (!existingItem) {
        //rajoute le produits au panier s'il n'y existe pas deja
        state.items.push(newItem);
      } else {
        state.totalQuantity -= existingItem.quantity; // subtract previous quantity
        state.totalPrice -= existingItem.totalPrice; // subtract previous total price
        existingItem.quantity = newItem.quantity;
        existingItem.totalPrice = newItem.totalPrice;
        // newItem.quantity = existingItem.quantity; // <-- set the correct quantity value
      }
      state.totalPrice += newItem.totalPrice;
      state.totalQuantity += newItem.quantity;
      // state.totalQuantity += newItem.quantity.tofixed(2);
      // console.log(state.totalQuantity.toFixed(2)+" 🥱🌶")
    },
    addDecharg(state) {
      state.totalPrice += state.totalQuantity * 400;
    },
    removeDecharg(state) {
      state.totalPrice -= state.totalQuantity * 400;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },

    //Amount added
    addItemToCart(state, action) {
      //onchange
      console.log("%c-----------------------", "color:purple");
      console.log(action);
      console.log("$$$$$$$$$$$$$$$");
      console.log(state.totalQuantity);
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity += existingItem.quantity;

      // existingItem.quantity++;
      //  existingItem.totalPrice =
      //    Number(existingItem.montant) * existingItem.amount;
      state.totalPrice += existingItem.totalPrice;
      console.log("$$$$$$-------------$$$$$$$$$");
      console.log(existingItem.totalPrice);
    },
    dropItemFromCart(state, action) {
      const productId = action.payload.id;
      const existingItem = state.items.find((item) => item.id === productId);
      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearCart(state) {
      Object.assign(state, initialState);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
