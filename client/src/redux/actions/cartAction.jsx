import {
  ADD_TO_CART,
  ITEM_REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART_DATA,
  FETCH_CART_FAILURE,
  DECREASE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
} from "../../constants/cartConstants";

// Action creator function

export const addToCart = (userId, product) => async (dispatch, getState) => {
  try {
    console.log("UserID and Product:", userId, product.productId);

    const existingCartItem = getState().cart.cartItems.find(
      (item) => String(item.productId) === String(product.productId)
    );

    let response;

    // If the item exists, update it; otherwise, add a new item
    if (existingCartItem) {
      console.log("Existing Cart Item Found:", existingCartItem);
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/create`, // Ensure the endpoint is correct
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: product.productId,
            quantity: 1, // Increase by 1
            itemPrice: product.itemPrice, // Adjust as needed
          }),
        }
      );
    } else {
      console.log("Adding new item to cart.");
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: product.productId,
            quantity: 1, // Initial quantity
            itemPrice: product.itemPrice, // Initial price
          }),
        }
      );
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Cart updated successfully:", data);

    dispatch({
      type: existingCartItem ? UPDATE_CART_ITEM : ADD_TO_CART,
      payload: {
        productId: product.productId,
        quantity: 1,
        itemPrice: product.itemPrice,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding/updating item in cart:", error.message);
  }
};
export const decreaseItemInCart = (userId, productId) => async (dispatch, getState) => {
    try {
      const { cartItems } = getState().cart;
      const item = cartItems.find(
        (item) => String(item.productId) === String(productId)
      );
      console.log(
        "Decreasing item in cart:",
        userId,
        productId,
        item,
        item.quantity
      );
      if (item.quantity > 1) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/cart/decreaseItem`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({  productId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to decrease item quantity in cart");
        }

        const data = await response.json();

        dispatch({
          type: DECREASE_ITEM_FROM_CART,
          payload: data.data,
        });

        console.log("Item quantity decreased in cart successfully:", data);
        return true;
      } else {
        dispatch(removeItemFromCart(userId, productId));
      }
    } catch (error) {
      console.error("Error decreasing item quantity in cart:", error);
      return false;
    }
  };

export const clearCart = (userId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/cart/clear`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    dispatch({
      type: CLEAR_CART,
      payload: [],  // Clear the cart	
    });

    console.log("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

export const removeItemFromCart = (userId, productId) => async (dispatch) => {
  try {
    console.log("Removing item from cart:", userId, productId);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/cart/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }

    const data = await response.json();

    dispatch({
      type: ITEM_REMOVE_FROM_CART,
      payload: productId,
    });

    console.log("Item removed from cart:", productId);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const fetchCartData = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/cart/${userId}`
    );
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (!data.success) {
      throw new Error(`API error! Message: ${data.message}`);
    }

    // Assuming data.data is an array of cart objects and we want the items of the first cart
    const cart = data.data.length > 0 ? data.data : null;
    console.log("Cart data:", cart);
    const cartItems = cart ? cart : [];
    console.log("Cart data in cart:", cartItems);

    console.log("Cart data fetched successfully:", cartItems);

    dispatch({
      type: SET_CART_DATA,
      payload: {
        cartId: cart ? cart._id : null,
        cartItems: cartItems,
      },
    });

    console.log("Cart data in cart fetched successfully:", cartItems);
    return cartItems; // Return cartItems to handle in component
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.message,
    });
  }
};
