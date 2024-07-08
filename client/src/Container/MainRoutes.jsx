import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../Components/navbar";
import { Login, Register } from "../Auth";
import { Home, AboutPage, ContactPage, Cart, Checkout, OrderDetails,Order } from "../Pages";

// Utility function to get the value of a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};
// i want to add userid on login in localStorage, give me code here 
const UserId =localStorage.getItem('userId');
console.log("User ID:", UserId);


export default function MainRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = getCookie("jwt");
    console.log("JWT Token from cookies:", storedToken);
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Provider store={store}>
      <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
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
            element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />}
          />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/orders" element={<Order />} />
          
        </Routes>
      </>
    </Provider>
  );
}
