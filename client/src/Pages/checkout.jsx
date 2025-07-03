import  { useState, useEffect } from "react";
import Container from "../Components/Container";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  saveAddress,
  deleteAddress,
} from "../redux/actions/addressAction";
import { createOrder } from "../redux/actions/orderAction";
import toast from "react-hot-toast";

const Checkout = () => {
  const [error, setError] = useState(null);
  const { addresses = [], loading } = useSelector((state) => state.address);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [billingaddress, setBillingaddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const validateBillingAddress = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (
      !billingaddress.firstName.trim() ||
      !billingaddress.lastName.trim() ||
      !emailRegex.test(billingaddress.email) ||
      !phoneRegex.test(billingaddress.phoneNumber) ||
      !billingaddress.addressLine1.trim() ||
      !billingaddress.city.trim() ||
      !billingaddress.pincode.trim() ||
      !billingaddress.country.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSaveBillingaddress = (e) => {
    e.preventDefault();
    if (!validateBillingAddress()) {
      setError(
        "Invalid billing address. Please ensure all fields are filled correctly."
      );
      return;
    }
    const userId = sessionStorage.getItem("userId");
    dispatch(saveAddress(billingaddress, userId));
    setBillingaddress({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
    setError(null);
  };

  const deleteAddressHandler = (addressId) => {
    dispatch(deleteAddress(addressId));
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    dispatch(fetchAddresses(userId));
  }, [dispatch]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.itemPrice * (item.quantity || 1),
    0
  );
  const shipping = cartItems.length > 0 ? 10 : 0;

  const handlePlaceOrder = () => {
    const user = sessionStorage.getItem("userId");
    const cart = sessionStorage.getItem("cartId");
    const shippingPrice = shipping;
    const orderData = {
      user,
      cart,
      address: selectedAddressId,
      shippingPrice,
      Items: cartItems,
      totalPrice: subtotal + shipping,
    };
    if(!selectedAddressId){
      toast.error("Please select an address to place the order");
      return;
    }
    
    dispatch(createOrder(orderData));
    
  };

  return (
    <Container>
      {error && <div className="text-red-500">{error}</div>}
      {/* {orderError && <div className="text-red-500">{orderError}</div>} */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-between flex-col m-4 p-4">
          <div className="flex justify-between max-md:flex-col">
            <form
              className="card rounded-lg border-2 md:w-2/3 m-2"
              onSubmit={handleSaveBillingaddress}
            >
              <div className="mb-0 card-title text-2xl py-5 px-3 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
                <p>Billing address</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2 m-2">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingaddress.firstName}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="John"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingaddress.lastName}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Doe"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 p-2 m-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={billingaddress.email}
                  onChange={(e) =>
                    setBillingaddress({
                      ...billingaddress,
                      email: e.target.value,
                    })
                  }
                  placeholder="john123@gmail.com"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4 p-2 m-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  pattern="\d{10}"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={billingaddress.phoneNumber}
                  onChange={(e) =>
                    setBillingaddress({
                      ...billingaddress,
                      phoneNumber: e.target.value,
                    })
                  }
                  placeholder="91xxxxxxxx"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4 p-2 m-2">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={billingaddress.addressLine1}
                  onChange={(e) =>
                    setBillingaddress({
                      ...billingaddress,
                      addressLine1: e.target.value,
                    })
                  }
                  placeholder="Street Address, P.O. Box"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4 p-2 m-2">
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={billingaddress.addressLine2}
                  onChange={(e) =>
                    setBillingaddress({
                      ...billingaddress,
                      addressLine2: e.target.value,
                    })
                  }
                  placeholder="Apt. / Suite / Other"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 p-2 m-2">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={billingaddress.city}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={billingaddress.state}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Zip / Postal code
                  </label>
                  <input
                    type="text"
                    pattern="\d{5,6}"
                    id="pincode"
                    name="pincode"
                    value={billingaddress.pincode}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        pincode: e.target.value,
                      })
                    }
                    placeholder="Zipcode"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 p-2 m-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={billingaddress.country}
                  onChange={(e) =>
                    setBillingaddress({
                      ...billingaddress,
                      country: e.target.value,
                    })
                  }
                  placeholder="Country"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="flex justify-end mb-4 p-2 m-2">
                <button
                  type="submit"
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring "
                >
                  Save Address
                </button>
              </div>
            </form>
            <div className="md:w-1/3 m-2">
              <div className="mb-0 card-title text-2xl py-5 px-3 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
                <p>Saved addresses</p>
              </div>
              <ul className="card rounded-lg border-2 divide-y divide-gray-200">
                {addresses.length === 0 ? (
                  <li className="p-4">No saved addresses.</li>
                ) : (
                  addresses.map((address) => (
                    <li
                      key={address._id}
                      className="p-4 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex">
                          <p className="font-semibold mr-1">
                            {address.firstName}
                          </p>{" "}
                          <p className="font-semibold">{address.lastName}</p>
                        </div>
                        <p className="font-semibold">{address.phoneNumber}</p>
                        <p className="font-semibold">{address.addressLine1}</p>
                        <p>
                          {address.city}, {address.state}, {address.pincode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleSelectAddress(address._id)}
                          className={`mr-2 py-2 px-4 rounded-t-lg focus:outline-none font-semibold ${
                            selectedAddressId === address._id
                              ? "bg-green-500 text-white"
                              : "bg-gray-600 text-white "
                          }`}
                        >
                          {selectedAddressId === address._id
                            ? "Selected"
                            : "Select"}
                        </button>
                        <button
                          onClick={() => deleteAddressHandler(address._id)}
                          className="mr-2 py-2 px-4 rounded-b-lg font-semibold bg-white text-red-500 hover:bg-red-400 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className="p-2">
            <div className="mb-0 card-title text-2xl py-5 px-3 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
              <p>Order Summary</p>
            </div>
            <div className="card  border-2 divide-y divide-gray-200 p-4 flex flex-col justify-between ">
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-700">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Total</span>
                <span className="text-gray-700">
                  ${(subtotal + shipping).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}

              className="bg-gray-600 text-white py-2 px-4 rounded-b-lg font-semibold hover:bg-green-400 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
