import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderAction";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../Components";
// import OrdersPage from "./order";

const UpdateStatus = () => {
  const dispatch = useDispatch();
  const orderId = sessionStorage.getItem("orderId");
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
      toast.success("You can now update the payment status.");
    } else {
      toast.error("Order ID is missing.");
    }
  }, [dispatch, orderId]);

  const orderDetails = useSelector((state) => state.order);
  const { loading, error, order } = orderDetails;

  const handlePaymentStatusUpdate = async () => {
    if (!orderId) {
      toast.error("Cannot update payment status: missing Order ID.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/updatePaymentStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId, // Pass the order ID in the body
          status: "paid", // Update status to "paid"
        }),
      });
      if (response.ok) {
        toast.success("Payment status updated successfully!");
        dispatch(getOrderDetails(orderId)); // Refresh order details after update
        // want to back to Orders Page after update
        window.location.href = "/orders";
        sessionStorage.removeItem("orderId");
      } else {
        toast.error("Failed to update payment status.");
      }
    } catch (error) {
      toast.error("Failed to update payment status.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-full p-5">
      <button
        className="text-white font-semibold p-2 rounded-lg bg-green-500"
        onClick={handlePaymentStatusUpdate}
        disabled={order && order.paymentInfo === "paid"}
      >
        Update Payment Status
      </button>
    </div>
  );
};

export default UpdateStatus;
