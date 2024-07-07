import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseItemInCart,
  removeItemFromCart,
  fetchCartData,
  clearCart,
} from "../redux/actions/cartAction";
import { useParams, Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    console.log("Fetching cart data...");
    dispatch(fetchCartData())
      .then((data) => {
        console.log("Cart data fetched successfully", data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [dispatch]);

  const increaseItem = (product) => {
    const userId = localStorage.getItem("userId");
    console.log("Increasing quantity for product:", product);
    dispatch(addToCart(userId, product));
  };

  const decreaseItem = (product) => {
    console.log("Decreasing quantity for product:", product);
    dispatch(decreaseItemInCart(product.userId, product.productId));
  };

  const deleteById = (product) => {
    const userId = localStorage.getItem("userId");
    console.log("Deleting product from cart:", product);
    dispatch(removeItemFromCart(userId, product.productId));
  };

  const clearCartHandler = (userId) => {
    console.log("Clearing cart for user:", userId);
    dispatch(clearCart(userId));
  };

  const EmptyCart = () => (
    <div className="t">
      <div className="">
        <div className="py-5 text-center">
          <h4 className="p-3 text-2xl">Your Cart is Empty</h4>
          <Link
            to="/products"
            className="underline underline-offset-8 hover:text-blue-400 my-3"
          >
            <i className=""></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => {
    console.log("Rendering cart with data:", cartItems);

    if (!cartItems || cartItems.length === 0) {
      return <EmptyCart />;
    }

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="font-light">
          <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white shadow-lg rounded-lg p-4 mb-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => increaseItem(item)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Increase
                  </button>
                  <button
                    onClick={() => decreaseItem(item)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Decrease
                  </button>
                  <button
                    onClick={() => deleteById(item)}
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
              <div className="text-2xl">Cart</div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {cartItems ? <ShowCart /> : <p>Loading cart...</p>}
              <button
                onClick={() => clearCartHandler(localStorage.getItem("userId"))}
                className="bg-gray-500 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
