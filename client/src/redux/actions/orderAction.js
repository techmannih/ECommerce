import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
} from "../../constants/orderConstants";
import toast from 'react-hot-toast';

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/order/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to create order");
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    toast.success("Order placed successfully.");
    window.location.href = "/orders";
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.message,
    });
    const msg = error.message || "Failed to place order. Please try again.";
    toast.error(`Couldn't place order: ${msg}`);
  }
};

export const getOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/order/all/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch orders");
    }

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload: error.message,
    });
    const msg = error.message || "Failed to fetch orders.";
    toast.error(`Couldn't fetch orders: ${msg}`);
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/order/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch order details");
    }

    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error.message,
    });
    const msg = error.message || "Failed to fetch order details.";
    toast.error(`Couldn't fetch order details: ${msg}`);
  }
};
