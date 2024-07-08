import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  saveAddress,
  deleteAddress,
} from "../redux/actions/addressAction";

const Checkout = () => {
  const [error, setError] = useState(null);
  const { addresses = [], loading } = useSelector((state) => state.address);
  console.log("adwwwwwwdresses", addresses);
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
  const handleSaveBillingaddress = (e) => {
    e.preventDefault();
    if (
      !billingaddress.addressLine1 ||
      !billingaddress.city ||
      !billingaddress.pincode ||
      !billingaddress.country
    ) {
      setError("Invalid billing address. Please fill in all required fields.");
      return;
    }
    const userId = localStorage.getItem("userId"); // Ensure userId is retrieved from localStorage or state
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
    setError(null); // Clear error state after successful submission
  };

  const deleteAddressHandler = (addressId) => {
    dispatch(deleteAddress(addressId));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchAddresses(userId));
  }, [dispatch]);
  const subtotal = cartItems.reduce((acc, item) => acc + item.itemPrice, 0); // Calculate subtotal
  const shipping = 10; // Replace with actual shipping cost
  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-between flex-col m-4 p-4">
          <div className="flex justify-between max-md:flex-col">
            <form className="card rounded-lg border-2 md:w-2/3  m-2">
              <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
                {" "}
                <p className="">Billing address</p>
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
                  type="text"
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
                  type="text"
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
                  placeholder="Apartment, Suite, Unit, Building, Floor, etc."
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
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={billingaddress.pincode}
                    onChange={(e) =>
                      setBillingaddress({
                        ...billingaddress,
                        pincode: e.target.value,
                      })
                    }
                    placeholder="Pincode"
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
              <p className="text-red-500 font-bold text-lg m-2 p-2">{error}</p>
              <div className=" items-center m-2 p-2">
                {" "}
                <button
                  type="submit"
                  onClick={handleSaveBillingaddress}
                  className="mt-4 bg-black text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300 "
                >
                  Save
                </button>
              </div>
            </form>

            <div className="card rounded-lg border-2 md:w-1/3 max-md:w-72  m-2">
              <div className=" mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold ">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="p-2 py-4 text-xl">
                  <li className=" flex justify-between items-center border-0 px-6 pb-2">
                    Products<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className=" flex justify-between items-center border-0 px-6 pb-2">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className=" flex justify-between items-center border-0 px-6 pb-2 font-semibold">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 card rounded-lg border-2 m-2 max-md:mt-8">
            <div className="mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
              <p>Saved Addresses</p>
            </div>
            <ul className="divide-y divide-gray-200">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <li key={address._id} className="p-4 flex justify-between">
                    <div>
                      <p className="font-semibold">
                        {address.firstName} {address.lastName}
                      </p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p>{address.country}</p>
                      <p>Email: {address.email}</p>
                      <p>Phone: {address.phoneNumber}</p>
                    </div>
                    <button
                      onClick={() => deleteAddressHandler(address._id)}
                      className="text-red-500 font-semibold"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center">No addresses saved yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
