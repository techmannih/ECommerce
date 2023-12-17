import { useState } from "react";
import logo from "../index.js";

function Navbar() {
  const [endPoint, setEndPoint] = useState("");

  const OnChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };
  const onSubmitHandler =(e)=>{
    e.preventDefault()
  }
  return (
    <>
      <div className="header flex justify-between bg-black text-white h-16 text-xl font-semibold items-center w-full p-12">
        <div className="logo">
          <img src={logo} alt="amazon" />
        </div>
        <div className="become-seller">
          <button className="bg-blue-500  px-4 py-2 rounded">
            Become Seller
          </button>
        </div>
        <div className="search my-8">
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              className=" border p-2 rounded w-96 text-black"
              placeholder="Search Amazon.in"
              value={endPoint}
              onChange={OnChangeHandler}
            />
            <button type="submit" className="bg-blue-500  px-4 py-2  rounded">
              Search
            </button>
          </form>
        </div>
        <div className="language ">Eng & Hin</div>
        <div className="account ">Signup</div>
        <div className="order ">Order & Return</div>
        <div className="cart ">Cart</div>
      </div>
    </>
  );
}

export default Navbar;
