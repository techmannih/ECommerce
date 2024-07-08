// src/redux/store.jsx

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer"; 
import addressReducer from "./reducers/addressReducer"
// Adjust the path based on your actual file structure

const store = configureStore({
  reducer: {
    cart: cartReducer,
      address:addressReducer,
      // Assuming cartReducer handles state related to cart
    // Add other reducers here if needed
  },
  // Optional: Add middleware, enhancers, or other configurations as needed
});

export default store;
