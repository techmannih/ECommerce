import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="text-center mt-24">
        <p className="text-4xl m-6">No Item In Cart</p>
        <Link
          to="/"
          className=" underline underline-offset-8 hover:text-blue-500 text-4xl m-4 "
        >
          Continue Shopping
        </Link>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    return (
      <div className="flex justify-between max-md:flex-col">
        <form className="card rounded-lg border-2 md:w-2/3  m-2">
          <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
            {" "}
            <p className="">Billing Address</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-2 m-2">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="jonh"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="deo"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
          <div className="mb-4 p-2 m-2 ">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="jonh123@gmail.com"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="Phone No"
              className="block text-sm font-semibold text-gray-600"
            >
              Phone No
            </label>
            <input
              type="text"
              id="Phone No"
              name="Phone No"
              placeholder="+91-7461240"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="address1"
              className="block text-sm font-semibold text-gray-600"
            >
              Address1
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Main street 12"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="address2"
              className="block text-sm font-semibold text-gray-600"
            >
              Address2
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="near railway road unio colony"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 p-2 m-2">
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-semibold text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-2 m-2">
            <div className="mb-4">
              <label
                htmlFor="zipCode"
                className="block text-sm font-semibold text-gray-600"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                // value={formData.zipCode}
                // onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-600"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
          <div className=" items-center m-2 p-2">
            {" "}
            <button
              type="submit"
              // onClick={handleSubmit}
              className="mt-4 bg-black text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300 "
            >
              Save
            </button>
          </div>
        </form>

        <div className="card rounded-lg border-2 md:w-1/3 max-md:w-72  m-2">
          <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            <ul className="p-2 py-4 text-xl">
              <li className=" flex justify-between items-center border-0 px-6 pb-2">
                Products ({totalItems})<span>${Math.round(subtotal)}</span>
              </li>
              <li className=" flex justify-between items-center border-0 px-6 pb-2">
                Shipping
                <span>${shipping}</span>
              </li>
              <li className=" flex justify-between items-center border-0 px-6 pb-2 font-semibold">
                <div>
                  <strong>Total amount</strong>
                </div>
                <span>
                  <strong>${Math.round(subtotal + shipping)}</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className=" font-light">
        <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
          Checkout
        </p>
        <hr className="my-9" />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>{" "}
    </div>
  );
};

export default Checkout;

  
