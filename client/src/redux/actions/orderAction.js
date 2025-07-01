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
      throw new Error(data.message || "Failed to create order");
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    toast.success("Order created successfully!");
    window.location.href = "/orders";
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.message,
    });
    toast.error(`Unable to create order: ${error.message}`);
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
      throw new Error(data.message || "Failed to fetch orders");
    }

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data.data,
    });

    toast.success("Orders fetched successfully!");
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload: error.message,
    });
    toast.error(`Unable to fetch orders: ${error.message}`);
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
      throw new Error(data.message || "Failed to fetch order details");
    }

    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });

    toast.success("Order details fetched successfully!");
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error.message,
    });
    toast.error(`Unable to fetch order details: ${error.message}`);
  }
};
