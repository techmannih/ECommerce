import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../redux/actions/orderAction";
import Container from "../Components/Container";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
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
    navigate(`/order/${orderId}`);
  };

  return (
    <Container className="my-8">
      <div className="card rounded-lg border-2 w-full m-2">
        <div className="card-title text-2xl py-5 px-9 bg-gray-100 rounded-t-lg border-b-2 font-semibold">
          <h2 className="text-3xl font-semibold mb-6">All Orders</h2>
        </div>
          <div className="card-body">
            {orders && orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shipping
                      </th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.shippingPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className={`text-white font-semibold px-3 py-1 rounded-lg ${
                              order.paymentInfo === "paid"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            onClick={() => handlePaymentClick(order._id)}
                          >
                            {order.paymentInfo === "paid" ? "View" : "Pay Now"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-xl font-semibold">No orders found.</div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
