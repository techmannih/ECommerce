import {
  ADD_TO_CART,
  ITEM_REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART_DATA,
  FETCH_CART_FAILURE,
  DECREASE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
} from "../../constants/cartConstants";
import toast from 'react-hot-toast';

// Action creator function
export const addToCart = (userId, product) => async (dispatch, getState) => {
  try {

    const existingCartItem = getState().cart.cartItems.find(
      (item) => String(item.productId) === String(product.productId)
    );

    let response;

    // If the item exists, update it; otherwise, add a new item
    if (existingCartItem) {
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
            quantity: 1,
            itemPrice: product.itemPrice,
            image: product.image,
            title: product.title,	// Add title to the cart item
          }),
        }
      );
    } else {
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
            quantity: 1,
            itemPrice: product.itemPrice,
            image: product.image,
            title: product.title,	// Add title to the cart item
          }),
        }
      );
      toast.success("Added item to your cart.");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    sessionStorage.setItem("cartId", data.data._id);

    dispatch({
      type: existingCartItem ? UPDATE_CART_ITEM : ADD_TO_CART,
      payload: {
        productId: product.productId,
        quantity: 1,
        itemPrice: product.itemPrice,
        totalItemPrice: product.itemPrice * (existingCartItem ? existingCartItem.quantity + 1 : 1),
        image: product.image,
        title: product.title,
      },
    });

    return true;
  } catch (error) {
    toast.error("Couldn't update cart item.");
  }
};

export const decreaseItemInCart = (userId, productId) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const item = cartItems.find(
      (item) => String(item.productId) === String(productId)
    );
    if (item.quantity > 1) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/decreaseItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decrease item quantity in cart");
      }

      dispatch({
        type: DECREASE_ITEM_FROM_CART,
        payload: { userId, productId }
      });

      return true;
    } else {
      dispatch(removeItemFromCart(userId, productId));
    }
  } catch (error) {
    toast.error("Couldn't decrease item quantity.");
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
      payload: [], // Clear the cart
    });
  } catch (error) {
    toast.error("Couldn't clear cart.");
  }
};

export const removeItemFromCart = (userId, productId) => async (dispatch) => {
  try {
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

    dispatch({
      type: ITEM_REMOVE_FROM_CART,
      payload: productId,
    });
  } catch (error) {
    toast.error("Couldn't remove item from cart.");
  }
};

export const fetchCartData = () => async (dispatch) => {
  try {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID not found. Please log in to view your cart.");
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/cart/${userId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`API error! Message: ${data.message}`);
    }

    const cart = data.data.length > 0 ? data.data : null;
    const cartItems = cart ? cart : [];


    dispatch({
      type: SET_CART_DATA,
      payload: {
        cartId: cart ? cart._id : null,
        cartItems: cartItems,
      },
    });

    return cartItems; // Return cartItems to handle in component
  } catch (error) {
    const errorMessage = error.message || "Couldn't fetch cart data.";
    toast.error(errorMessage);
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: errorMessage,
    });
  }
};
