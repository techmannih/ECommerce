import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseItemInCart,
  removeItemFromCart,
  fetchCartData,
  clearCart,
} from "../redux/actions/cartAction";
import { Link } from "react-router-dom";
import Container from "../Components/Container";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData())
      .catch(() => {
        // handled in action
      });
  }, [dispatch]);

  const increaseItem = (product) => {
    const userId = sessionStorage.getItem("userId");
    dispatch(addToCart(userId, product));
  };

  const decreaseItem = (product) => {
    const userId = sessionStorage.getItem("userId");
    dispatch(decreaseItemInCart(userId, product.productId));
  };

  const deleteById = (product) => {
    const userId = sessionStorage.getItem("userId");
    dispatch(removeItemFromCart(userId, product.productId));
  };

  const clearCartHandler = (userId) => {
    dispatch(clearCart(userId));
  };

  const EmptyCart = () => (
    <div className="py-5 text-center">
      <h4 className="p-3 text-2xl">Your Cart is Empty</h4>
      <Link
        to="/"
        className="underline underline-offset-8 hover:text-blue-400 my-3"
      >
        Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {

    if (!cartItems || cartItems.length === 0) {
      return <EmptyCart />;
    }

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    ); // Calculate subtotal using totalItemPrice
    const shipping = 10; // Replace with actual shipping cost
    return (
      <section className="h-auto">
        <div className="py-5 flex justify-between my-4 max-md:flex-col max-md:items-center">
          <div className="card rounded-lg border-2 w-2/3 max-md:w-72 m-2">
            <div className="mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
              <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white shadow-lg rounded-lg p-4 mb-4"
                >
                  <div className="m-1 p-1">
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                  <div className="flex justify-between items-center m-3 px-4 max-md:flex-col">
                    <div className="rounded-xl m-1 p-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={75}
                      />
                    </div>

                    <div className="flex flex-col">
                      <div
                        className="flex mb-4 m-1"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="px-3"
                          onClick={() => decreaseItem(item)}
                        >
                          -
                        </button>

                        <p className="mx-5">{item.quantity}</p>

                        <button
                          className="px-3"
                          onClick={() => increaseItem(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="m-1 p-1">
                        <p className="text-xl font-semibold">
                          ${item.itemPrice * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="flex justify-center items-center border-2 m-6 text-xl p-2 rounded-xl bg-gray-200 font-normal"
                      onClick={() => deleteById(item)}
                    >
                      delete items
                    </button>
                  </div>
                  <hr className="my-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-lg border-2 w-1/3 max-md:w-72 m-2">
            <div className="mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="p-2 py-4 text-xl">
                <li className="flex justify-between items-center border-0 px-6 pb-2">
                  Products Price <span>${Math.round(subtotal)}</span>
                </li>
                <li className="flex justify-between items-center border-0 px-6 pb-2">
                  Shipping<span>${shipping}</span>
                </li>
                <li className="flex justify-between items-center border-0 px-6 pb-2 font-semibold">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>${Math.round(subtotal + shipping)}</strong>
                  </span>
                </li>
              </ul>

              <Link
                to="/checkout"
                className="flex justify-center items-center border-2 m-6 text-2xl p-3 rounded-xl bg-black text-white hover:bg-gray-500 font-semibold"
              >
                Go to checkout
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-12">
        <Container>
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
              <div className="text-2xl">Cart</div>
              {error && (
                <p className="text-red-600 my-4">{error}</p>
              )}
              {cartItems ? (
                <ShowCart />
              ) : (
                !error && <p>Loading cart...</p>
              )}
              <button
                onClick={() => clearCartHandler(sessionStorage.getItem("userId"))}
                className="bg-gray-500 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Cart;
