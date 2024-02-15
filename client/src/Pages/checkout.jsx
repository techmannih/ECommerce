import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [billingaddress, setBillingaddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [savedaddresses, setSavedaddresses] = useState([]);
  const handleSaveBillingaddress = async (e) => {
    try {
      e.preventDefault();
      console.log("Billing address state:", billingaddress);

      // Validate the billing address
      if (
        !billingaddress ||
        !billingaddress.addressLine1 ||
        !billingaddress.city ||
        !billingaddress.pincode
      ) {
        console.error(
          "Invalid billing address. Please fill in all required fields."
        );
        setError(
          "Invalid billing address. Please fill in all required fields."
        );
        setTimeout(() => {
          setError(null);
        }, 1000);
        return;
      }

      const response = await fetch("http://localhost:8880/address/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billingaddress),
      });

      if (!response.ok) {
        throw new Error("Failed to save billing address");
      }

      // If validation checks pass and the backend request is successful, update the state to include the new billing addressLine
      setSavedaddresses([...savedaddresses, billingaddress]);

      // Optionally, you can clear the form fields or perform additional actions after saving the address
      setBillingaddress({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });

      console.log("Billing addressLine saved successfully");
    } catch (error) {
      console.error("Error saving billing addressLine:", error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };
  const deleteaddrsesshandler = async (addressId) => {
    try {
      console.log(addressId);
      if (!addressId) {
        console.error("Invalid addressId");
        return;
      }

      const response = await fetch(
        `http://localhost:8880/address/delete/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete billing addressLine");
      } else {
        console.log("Billing addressLine deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting address by ID:", error);
    }
  };
  const handlePayment = async () => {
    try {
      setLoading(true);
  
      const { totalItems, subtotal, shipping } = calculateOrderSummary();
  
      const response = await fetch("http://localhost:8880/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalItems,
          subtotal,
          shipping,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to make payment");
      }
  
      // Redirect the user to the Stripe Checkout page for payment
      window.location.href = responseData.url;
    } catch (error) {
      console.error("Error making payment:", error.message);
      // Add user-friendly error handling/notification
    } finally {
      setLoading(false);
    }
  };
   

  const calculateOrderSummary = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return { totalItems, subtotal, shipping };
  };
  const SavedaddressLinees = () => {
    return (
      <div className="card rounded-lg border-2 md:w-2/3 m-2">
        <div className="mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
          <p className="">Saved addresses</p>
        </div>
        <div className="card-body">
          <div className="">
            {savedaddresses.length === 0 ? (
              <p className="p-4 text-gray-500">No addresses saved yet.</p>
            ) : (
              savedaddresses.map((address, index) => (
                <div
                  key={address._id}
                  className="p-2 m-2 border-b-2 border-gray-200 flex justify-between max-sm:flex-col"
                >
                  <div className="">
                    <p className="text-sm font-semibold text-gray-600">
                      {address.firstName} {address.lastName}
                    </p>
                    <p>
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p>
                      {address.city}, {address.state}, {address.pincode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                  <div className=" my-2">
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="text-sm font-normal bg-gray-600 text-white p-2 rounded-l-xl hover:bg-black"
                    >
                      {" "}
                      {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                    <button
                      className="text-sm font-normal bg-gray-600 text-white p-2 rounded-r-xl hover:bg-black"
                      onClick={() => deleteaddrsesshandler(address._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>{" "}
      </div>
    );
  };
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="text-center mt-24">
        <p className="text-4xl m-6">No Item In Cart</p>
        <Link
          to="/"
          className=" underline underline-offset-8 hover:text-blue-500 text-4xl m-4 "
        >
          Continue Shopping
        </Link>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    return (
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
                placeholder="jonh"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required="true"
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
                placeholder="deo"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
          <div className="mb-4 p-2 m-2 ">
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
              placeholder="jonh123@gmail.com"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="Phone"
              className="block text-sm font-semibold text-gray-600"
            >
              Phone No
            </label>
            <input
              type="text"
              id="Phone"
              name="Phone"
              value={billingaddress.Phone}
              onChange={(e) =>
                setBillingaddress({
                  ...billingaddress,
                  Phone: e.target.value,
                })
              }
              placeholder="+91-7461240"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="addressLine1"
              className="block text-sm font-semibold text-gray-600"
            >
              addressLine1
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
              placeholder="Main street 12"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 p-2 m-2">
            <label
              htmlFor="addressLine2"
              className="block text-sm font-semibold text-gray-600"
            >
              addressLine2
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
              placeholder="near railway road unio colony"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 p-2 m-2">
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-2 m-2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="block text-sm font-semibold text-gray-600"
              >
                ZIP Code
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
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
                Products ({totalItems})<span>${Math.round(subtotal)}</span>
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
    );
  };

  return (
    <div className=" my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className=" font-light">
        <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
          Checkout
        </p>
        <hr className="my-9" />
        {state.length ? (
          <>
            <ShowCheckout />
            <SavedaddressLinees />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>{" "}
    </div>
  );
};

export default Checkout;
