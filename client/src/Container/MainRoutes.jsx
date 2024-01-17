import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/navbar";
import Home from "../Pages/home"
import ContactUs from "../Pages/contact";
import AboutUs from "../Pages/about";
import Product from "../Pages/product";

export default function MainRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/products" element={<Product />} />
      </Routes>
    </>
  );}