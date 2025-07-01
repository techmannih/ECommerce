import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../Components/navbar";
import { Login, Register } from "../Auth";
import Footer from "../Components/footer";
import {
  Home,
  AboutPage,
  ContactPage,
  Cart,
  Checkout,
  OrderDetails,
  Order,
  UpdatePaymentStatus,
} from "../Pages";

// Utility function to get the value of a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
// Keep user id only for the lifetime of the tab
const UserId = sessionStorage.getItem("userId");

export default function MainRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = getCookie("jwt");
    const storedUserId = sessionStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route
            exact
            path="/checkout"
            element={
              isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/orders" element={<Order />} />
          <Route
            path="/updatePaymentStatus"
            element={<UpdatePaymentStatus />}
          />
        </Routes>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
