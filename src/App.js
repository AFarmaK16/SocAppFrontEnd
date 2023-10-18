import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/actions/products-actions";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MainNavigation from "./layout/MainNavigation";
import Footer from "./layout/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import TheProducts from "./components/dashboard/TheProducts";
import AddProduct from "./components/dashboard/AddProduct";
import UpdateProducts from "./components/dashboard/UpdateProducts";
import ProductUpdate from "./components/dashboard/ProductUpdate";

import LoginRedirect from "./components/auth/LoginRedirect";
import RegisterRedirect from "./components/auth/RegisterRedirect";
import DashboardRedirect from "./components/auth/DashboardRedirect";
import HomeRedirect from "./components/auth/HomeRedirect";
import Orders from "./pages/Orders";
import DragDrop from "./pages/DragDrop";
import OrderDetail from "./pages/OrderDetail";
import OrderHistory from "./components/orders/OrderHistory";
import CustomerOrderDetail from "./pages/CustomerOrderDetail";
import PaymentHistory from "./pages/PaymentHistory";
import ModalExample from "./pages/ModalExample";
import Accounts from "./pages/Accounts";
import Forms from "./components/dashboard/Forms";
import TheAccounts from "./components/dashboard/TheAccounts";
import TheSettings from "./components/dashboard/TheSettings";
import Example from "./components/MyComp";
import CustomerDashBoard from "./pages/dashboard/CustomerDashBoard";
import Profile from "./components/dashboard/Profile";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isCustomer = useSelector((state) => state.auth.isCustomer);
    const isAuthenticated = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {/* {isAuthenticated ===false  && <MainNavigation />} */}
      {/* {!isAuthenticated && <MainNavigation />} */}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<HomeRedirect />}>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
          </Route>
          <Route
          // element={<DashboardRedirect />}
          >
            <Route path="customer/c" element={<CustomerDashBoard />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<ProductDetail />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route
          // element={<DashboardRedirect />}
          >
            <Route path="admin/dashboard" element={<Dashboard />}>
              <Route path="users" element={<TheAccounts type="users" />} />
              <Route path="products" element={<TheProducts />} />
              <Route
                path="tarification"
                element={<TheSettings setof="tarification" />}
              />
              <Route path="payMode" element={<TheSettings setof="payMode" />} />{" "}
              <Route
                path="paymMode"
                element={<TheSettings setof="destination" />}
              />
              <Route path="payType" element={<TheSettings setof="payType" />} />
              <Route
                path="destination"
                element={<TheSettings setof="destination" />}
              />
              <Route
                path="customers"
                element={<TheAccounts type="CUSTOMER" />}
              />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route
          // element={<DashboardRedirect />}
          >
            <Route path="comm/dashboard" element={<Dashboard />}>
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route
          // element={<DashboardRedirect />}
          >
            <Route path="adv/dashboard" element={<Dashboard />}>
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route element={<LoginRedirect />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<RegisterRedirect />}>
            <Route path="/register" element={<Register />} />
          
          </Route> 
           <Route
              path="/changePassForm"
              element={
                <Profile
                action="changePass"
                />
              }
            />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {isAuthenticated && isCustomer && <Footer />}
      {/* LOGIN REDIRECT REDIRIGE VERS LA PAGE ACCEUIL CORRESPONDANT AU PROFIL . 
      DASHBOARDREDIRECT VERIFIE SI T'ES ADMIN 
      AFFICHE LE CONTENU SI T'ES ADMIN  SINON TE REDIRIGE VERS LA  / DONC HOME */}
    </>
  );
};

export default App;
