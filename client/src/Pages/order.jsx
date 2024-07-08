// components/OrdersPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/actions/orderAction';

const OrdersPage = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getOrders(userId));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Orders</h1>
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Shipping Price: {order.shippingPrice}</p>
              {/* Render other order details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
};

export default OrdersPage;
