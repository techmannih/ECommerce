import {
  ADD_TO_CART,
  ITEM_REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART_DATA,
  FETCH_CART_FAILURE,
  DECREASE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
} from "../../constants/cartConstants";

const initialState = {
  cartItems: [],
  // cartId: null,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
                totalItemPrice:
                  item.totalItemPrice + action.payload.totalItemPrice,
              }
            : item
        ),
      };

      case DECREASE_ITEM_FROM_CART:
        const existingDecreaseItem = state.cartItems.find(
          (item) => String(item.productId) === String(action.payload.productId)
        );
  
        if (existingDecreaseItem && existingDecreaseItem.quantity > 1) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              String(item.productId) === String(action.payload.productId)
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    totalItemPrice: item.totalItemPrice - item.itemPrice,
                  }
                : item
            ),
          };
        } else {
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => String(item.productId) !== String(action.payload.productId)
            ),
          };
        }
  
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case ITEM_REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };

    case SET_CART_DATA:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case FETCH_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
