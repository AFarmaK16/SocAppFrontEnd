import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { CookieProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import store from "./store";

let persistor = persistStore(store);
// Modify REACT to handle CSRF and be identity-aware
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <CookieProvider> */}
          <App />
        {/* </CookieProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
