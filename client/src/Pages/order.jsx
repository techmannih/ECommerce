import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../redux/actions/orderAction";
import Container from "../Components/Container";
import { LoadingSpinner } from "../Components";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    dispatch(getOrders(userId));
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
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
    <div className="bg-gray-100 min-h-screen py-8">
      <Container>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold">All Orders</h2>
          </div>
          <div className="p-6">
            {orders && orders.length > 0 ? (
              <ul className="space-y-4">
                {orders.map((order) => {
                  const itemsTotal = order.items?.reduce(
                    (acc, item) => acc + item.itemPrice * (item.quantity || 1),
                    0
                  ) || 0;
                  const total =
                    order.totalPrice && order.totalPrice > 0
                      ? order.totalPrice
                      : itemsTotal + (order.shippingPrice || 0);

                  return (
                    <li
                      key={order._id}
                      className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-md shadow"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">
                          Order ID: {order._id.slice(-4)}
                        </p>
                        <p>
                          Total Price: ${total.toFixed(2)}
                        </p>
                        <p>
                          Shipping Price: ${Number(order.shippingPrice || 0).toFixed(2)}
                        </p>
                        {/* Render other order details as needed */}
                      </div>
                      <div>
                        <button
                          className={`text-white font-semibold px-4 py-2  my-2 rounded-lg ${
                            order.paymentInfo === "paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          onClick={() => handlePaymentClick(order._id)}
                        >
                          {order.paymentInfo === "paid" ? "Paid" : "Pay Now"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center text-xl font-semibold">No orders found.</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
