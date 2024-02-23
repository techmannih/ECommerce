import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../Components/navbar";
import { Login, Register } from "../Auth";
import { Home, Product, AboutPage, ContactPage, Cart, Checkout } from "../Pages";

export default function MainRoutes() {
  // Assuming you have some authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to simulate authentication (replace this with your actual authentication logic)
  useEffect(() => {
    // Implement your authentication check here
    // For simplicity, let's use a local storage variable as an example
    const storedToken = localStorage.getItem("userToken");
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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/products" element={<Product />} />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/register" element={<Register />} />
          {/* Use Navigate to redirect unauthenticated users */}
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkout"
            element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </>
    </Provider>
  );
}