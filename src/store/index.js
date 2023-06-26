import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';
import productsSlice from './products-slice';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
import ordersSlice from './orders-slice';
import userSlice from './user-slice';
import formSlice from './form-slice';
import settingsSlice from './admin-slice';

  const cartPersistConfig = {
    key: 'cart',
    version: 1,
    storage,
  };

  const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
  }

  const cartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);
  const authReducer = persistReducer(authPersistConfig, authSlice.reducer);



const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
    users: userSlice.reducer,
    auth: authReducer,
    ui: uiSlice.reducer,
    shippingForm: formSlice.reducer,
    settings: settingsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // serializableCheck: false
    }),
});


export default store;