import toast from 'react-hot-toast';

export const FETCH_ADDRESSES_REQUEST = "FETCH_ADDRESSES_REQUEST";
export const FETCH_ADDRESSES_SUCCESS = "FETCH_ADDRESSES_SUCCESS";
export const FETCH_ADDRESSES_FAILURE = "FETCH_ADDRESSES_FAILURE";

export const SAVE_ADDRESS_REQUEST = "SAVE_ADDRESS_REQUEST";
export const SAVE_ADDRESS_SUCCESS = "SAVE_ADDRESS_SUCCESS";
export const SAVE_ADDRESS_FAILURE = "SAVE_ADDRESS_FAILURE";

export const DELETE_ADDRESS_REQUEST = "DELETE_ADDRESS_REQUEST";
export const DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS";
export const DELETE_ADDRESS_FAILURE = "DELETE_ADDRESS_FAILURE";

export const fetchAddresses = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/address/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      dispatch({
        type: FETCH_ADDRESSES_SUCCESS,
        payload: data.data, // Assuming the response structure has a 'data' field containing addresses
      });
    } catch (error) {
      dispatch({
        type: FETCH_ADDRESSES_FAILURE,
        error: error.message || "Failed to fetch addresses",
      });
      toast.error(`Couldn't load addresses: ${error.message || "Failed to fetch addresses"}`);
    }
  };
};

export const saveAddress = (address, userId) => {
  return async (dispatch) => {
    dispatch({ type: SAVE_ADDRESS_REQUEST });
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/address/create`
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...address, userId }), // Include userId in the body
      });
      if (!response.ok) {
        throw new Error("Failed to save address");
      }
      const data = await response.json();
      dispatch({
        type: SAVE_ADDRESS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: SAVE_ADDRESS_FAILURE,
        error: error.message,
      });
      toast.error(`Couldn't save address: ${error.message || "Failed to save address"}`);
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/address/delete/${addressId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete address");
      }
      dispatch({
        type: DELETE_ADDRESS_SUCCESS,
        payload: addressId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ADDRESS_FAILURE,
        error: error.message,
      });
      toast.error(`Couldn't remove address: ${error.message || "Failed to delete address"}`);
    }
  };
};
