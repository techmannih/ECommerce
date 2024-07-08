// reducers/orderReducers.js

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
  } from '../../constants/orderConstants';
  
  const initialState = {
    order: {},
    orders: [],
    loading: false,
    success: false,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
      case GET_ORDERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          order: action.payload,
        };
      case GET_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          orders: action.payload,
        };
      case CREATE_ORDER_FAIL:
      case GET_ORDERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  