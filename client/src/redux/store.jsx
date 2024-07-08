// src/redux/store.jsx

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer"; 
import addressReducer from "./reducers/addressReducer"
import orderReducer from "./reducers/orderReducer"
// Adjust the path based on your actual file structure

const store = configureStore({
  reducer: {
    cart: cartReducer,
      address:addressReducer,
      order: orderReducer,
      // Assuming cartReducer handles state related to cart
    // Add other reducers here if needed
  },
  // Optional: Add middleware, enhancers, or other configurations as needed
});

export default store;
