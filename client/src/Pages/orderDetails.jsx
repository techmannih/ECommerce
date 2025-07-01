import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../Components/Container";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const orderDetails = useSelector((state) => state.order);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalItems: order.items.length, // Example: Sending the total items count
            subtotal: order.totalPrice - order.shippingPrice, // Example: Calculating subtotal
            shipping: order.shippingPrice, // Example: Shipping cost
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url; // Redirect to Stripe checkout
        // add here code for render to updatePaymentStatus after success
        window.location.href = data.url; // Redirect to Stripe checkout
        sessionStorage.setItem("orderId", id);
        toast.success("Payment initiated successfully");
      } else {
        setPaymentError("Failed to initiate payment. Please try again later.");
        toast.error("Failed to initiate payment. Please try again later.");
      }
    } catch (error) {
      setPaymentError("Failed to initiate payment. Please try again later.");
      toast.error("Failed to initiate payment. Please try again later.");
    } finally {
      setPaymentLoading(false);
    }
  };
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Container>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold">Order Details</h2>
          </div>
          <div className="p-6">
              {order && (
              <div>
                <div className="mb-6 flex flex-wrap justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Order Information</h3>
                    <p>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {order.paymentInfo}
                      <p className="text-red-500">{paymentError}</p>
                    </p>
                  </div>
                  <div>
                    <button
                      className={`text-white font-semibold px-4 py-2 rounded-lg ${
                        order.paymentInfo === "paid" ? "bg-green-500" : "bg-red-500"
                      }`}
                      onClick={handlePayment}
                      disabled={order.paymentInfo === "paid" || paymentLoading}
                    >
                      {order.paymentInfo === "paid" ? "Paid" : paymentLoading ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Items Ordered</h3>
                  <ul className="space-y-4">
                    {order.items &&
                      order.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          <img src={item.image} alt={item.title} width={100} height={75} />
                          <div className="space-y-1">
                            <p className="font-semibold">{item.title}</p>
                            <p>
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Item Price:</strong> ${item.itemPrice}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">
                    Shipping Information
                  </h3>
                  {order.address ? (
                    <div className="text-xl">
                      <p>
                        <strong>Address ID:</strong> {order.address._id}
                      </p>
                      <p>
                        <strong>Street:</strong> {order.address.addressLine1}
                      </p>
                      <p>
                        <strong>Near:</strong> {order.address.addressLine2}
                      </p>

                      <p>
                        <strong>City:</strong> {order.address.city}
                      </p>
                      <p>
                        <strong>State:</strong> {order.address.state}
                      </p>
                      <p>
                        <strong>Postal Code:</strong> {order.address.pincode}
                      </p>
                    </div>
                  ) : (
                    <p>No address available</p>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Order Summary</h3>
                  <p className="text-xl">
                    <strong>Shipping Price:</strong> ${order.shippingPrice}
                  </p>
                  <p className="text-xl">
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderDetails;
