import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="text-center mt-8">
        <h4>Your Cart is Empty</h4>
        <Link to="/" className="text-blue-500">
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
      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <div>
            <h5 className="text-lg font-semibold mb-4">Order Summary</h5>
            <ul className="text-gray-700">
              <li>
                Products ({totalItems}) <span>${Math.round(subtotal)}</span>
              </li>
              <li>
                Shipping <span>${shipping}</span>
              </li>
              <li>
                <div className="font-semibold">
                  Total amount
                </div>
                <span className="font-semibold">
                  ${Math.round(subtotal + shipping)}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mt-8 mb-4">Billing address</h4>
            <form className="space-y-4">
              {/* ... (your form elements with Tailwind CSS classes) */}
            </form>
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <h4 className="text-lg font-semibold mb-4">Payment</h4>
          <div className="space-y-4">
            {/* ... (your payment form elements with Tailwind CSS classes) */}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
          >
            Continue to checkout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      {state.length ? <ShowCheckout /> : <EmptyCart />}
    </div>
  );
};

export default Checkout;
