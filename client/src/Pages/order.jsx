import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../redux/actions/orderAction";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getOrders(userId));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  const handlePaymentClick = (orderId) => {
    console.log("order id", orderId);
    navigate(`/order/${orderId}`);
  };

  return (
    <section className="h-auto p-5">
      <div className="flex flex-col items-center my-4">
        <div className="card rounded-lg border-2 w-full max-w-4xl m-2">
          <div className="card-title text-2xl py-5 px-9 bg-gray-100 rounded-t-lg border-b-2 font-semibold">
            <h2 className="text-3xl font-semibold mb-6">All Orders</h2>
          </div>
          <div className="card-body">
            {orders && orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="bg-white shadow-lg rounded-lg p-4 mb-4 flex justify-between items-center"
                  >
                    <div className="m-3">
                      <p className="text-xl font-semibold">
                        Order ID: {order._id}
                      </p>
                      <p className="text-xl">
                        Total Price: ${order.totalPrice}
                      </p>
                      <p className="text-xl">
                        Shipping Price: ${order.shippingPrice}
                      </p>
                      {/* Render other order details as needed */}
                    </div>
                    <div className="">
                      <button
                        className={`text-white font-semibold m-2 p-2 rounded-lg ${
                          order.paymentInfo === "paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                        onClick={() => handlePaymentClick(order._id)}
                      >
                        Payment {order.paymentInfo}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xl font-semibold">No orders found.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
