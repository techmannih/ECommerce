import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/cart/cart";
import Address from "./Pages/address/address";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/signup";
import Order from "./Pages/order/order";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
