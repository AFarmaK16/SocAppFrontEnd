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

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  // const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {!isAdmin && <MainNavigation />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<HomeRedirect />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Accounts type="users" />} />
            <Route path="/CUSTOMER" element={<Accounts type="CUSTOMER" />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="/drag" element={<ModalExample />} />
            <Route path="/new" element={<Forms about="account" />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/pay" element={<Example />} />
            <Route
              path="/order-history/:customerId/order/:orderId"
              element={<CustomerOrderDetail />}
            />
            <Route path="admin/dashboard" element={<Dashboard role={0} />}>
              {/* <Route path="products" element={<TheProducts />} /> */}
              {/* <Route path="addproduct" element={<AddProduct />} /> */}
              <Route path="users" element={<TheAccounts type="users" />} />

              {/* <Route
                path="customers"
                element={<TheAccounts type="CUSTOMER" />}
              /> */}
              {/* <Route path="updateproducts">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route> */}
            </Route>
            <Route path="comm/dashboard" element={<Dashboard role={1} />}>
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
              {/* <Route path="addproduct" element={<AddProduct />} /> */}
              {/* <Route path="users" element={<TheAccounts type="users" />} /> */}
              {/* <Route
                path="tarification"
                element={<TheSettings setof="tarification" />}
              />
              <Route path="payMode" element={<TheSettings setof="payMode" />} />{" "}
            
              <Route path="payType" element={<TheSettings setof="payType" />} />
              <Route
                path="destination"
                element={<TheSettings setof="destination" />}
              /> */}
              <Route path="orders" element={<Orders role={1} />} />
              {/* <Route path="updateproducts">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route> */}
            </Route>
            <Route path="adv/dashboard" element={<Dashboard role={2} />}>
              <Route path="products" element={<TheProducts />} />
              <Route
                path="customers"
                element={<TheAccounts type="CUSTOMER" />}
              />
              {/* <Route path="addproduct" element={<AddProduct />} />
              <Route path="users" element={<TheAccounts type="users" />} />
              <Route
                path="tarification"
                element={<TheSettings setof="tarification" />}
              />
              <Route path="payMode" element={<TheSettings setof="payMode" />} />{" "}
             
              <Route path="payType" element={<TheSettings setof="payType" />} />
              <Route
                path="destination"
                element={<TheSettings setof="destination" />}
              />
              <Route
                path="customers"
                element={<TheAccounts type="CUSTOMER" />}
              />
              <Route path="updateproducts">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route> */}
              <Route path="orders" element={<Orders role={2} />} />
            </Route>
          </Route>

          <Route element={<LoginRedirect />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<RegisterRedirect />}>
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<DashboardRedirect />}>
            <Route path="admin/dashboard" element={<Dashboard />}>
              <Route path="products" element={<TheProducts />} />
              <Route path="users" element={<TheAccounts type="users" />} />
              <Route
                path="tarification"
                element={<TheSettings setof="tarificationHeader" />}
              />
              <Route
                path="customers"
                element={<TheAccounts type="CUSTOMER" />}
              />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="updateproducts">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
