import React from "react";
// import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteCartById,
} from "../redux/actions/cartAction";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="t">
        <div className="">
          <div className=" py-5  text-center">
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
  };

  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  const removeItem = (product) => {
    dispatch(removeFromCart(product));
  };
  const deleteById = (product) => {
    dispatch(deleteCartById(product));
  };
  const ShowCart = () => {
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
      <>
        <section className="h-auto">
          <div className="py-5 flex justify-between my-4 max-md:flex-col max-md:items-center">
            <div className="card rounded-lg border-2 w-2/3 max-md:w-72 m-2 ">
              <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
                <h5 className="mb-0">Item List</h5>
              </div>
              <div className="card-body">
                {state.map((item) => {
                  return (
                    <>
                      <div key={item.id}>
                        <div className="flex justify-between items-center m-3 px-4 max-md:flex-col">
                          <div className=" rounded-xl m-1 p-1">
                            <img
                              src={item.image}
                              alt={item.title}
                              width={100}
                              height={75}
                            />
                          </div>

                          <div className="m-1 p-1">
                            <p className="text-xl font-semibold ">
                              {item.title}
                            </p>
                          </div>

                          <div className="flex flex-col">
                            <div
                              className="flex mb-4 m-1"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="px-3"
                                onClick={() => {
                                  removeItem(item);
                                }}
                              >
                                -
                              </button>

                              <p className="mx-5">{item.qty}</p>

                              <button
                                className=" px-3"
                                onClick={() => {
                                  addItem(item);
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div className=" m-1 p-1">
                              <p className="text-xl font-semibold">
                                <span className="">{item.qty}</span> x $
                                {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {" "}
                          <button
                            className=" flex justify-center items-center border-2 m-6 text-xl p-2 rounded-xl bg-gray-200 font-normal"
                            onClick={() => {
                              deleteById(item);
                            }}
                          >
                            delete items
                          </button>
                        </div>
                        <hr className="my-3" />
                      </div>

                    
                    </>
                  );
                })}
                
              </div>
            </div>

            <div className="card rounded-lg border-2 w-1/3 max-md:w-72  m-2">
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

                <Link
                  to="/checkout"
                  className=" flex justify-center items-center border-2 m-6 text-2xl p-3 rounded-xl bg-black text-white hover:bg-gray-500 font-semibold"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <div className=" my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className=" font-light">
          <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
            Cart
          </p>
          <hr className="my-9" />
          {state && state.length > 0 ? <ShowCart /> : <EmptyCart />}
        </div>{" "}
      </div>
    </>
  );
};

export default Cart;
