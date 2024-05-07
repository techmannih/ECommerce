import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8880/order/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Order details:", data.data);
          setOrderDetails(data.data);
        } else {
          throw new Error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!orderDetails) {
    return <div>Error: Failed to load order details.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 py-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="mb-4">
        <p className="font-semibold">Order ID:</p>
        <p>{orderDetails._id}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Order Status:</p>
        <p>{orderDetails.orderStatus}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Order Total:</p>
        <p>${orderDetails.totalPrice}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Order Items:</p>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.itemPrice} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Shipping Price:</p>
        <p>${orderDetails.shippingPrice}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
