import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../../constants/orderConstants";

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
    console.log("Order data:", orderData);
    console.log("Order response:", response);
    const data = await response.json();
    console.log("Order data data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.message,
    });
  }
};

export const getOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    console.log(userId);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/order/all/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("fet orders response", response);

    const data = await response.json();
    console.log("get order data", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
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
  }
};
