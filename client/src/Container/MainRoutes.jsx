import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../Components/navbar";
import { Login, Register } from "../Auth";
import Footer from "../Components/footer";
import {
  Home,
  Cart,
  Checkout,
  OrderDetails,
  Order,
  UpdatePaymentStatus,
} from "../Pages";

// Keep user id only for the lifetime of the tab
const UserId = sessionStorage.getItem("userId");

export default function MainRoutes() {
  // Determine initial login state from sessionStorage so the user
  // remains logged in when the page reloads within the same tab
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(sessionStorage.getItem("userId"))
  );

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
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
