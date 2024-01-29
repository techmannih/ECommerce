  import React ,{useState} from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";

  const Checkout = () => {
    
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  const handleSaveBillingAddress = (e) => {
    e.preventDefault();
    console.log("Billing address state:", billingAddress);
  
    // Assuming billingAddress is the new address to be saved
    // You may want to add validation checks here

    // Example: Check if the billingAddress object has required fields
    if (!billingAddress || !billingAddress.address1 || !billingAddress.city || !billingAddress.zipCode) {
      // Handle invalid address, perhaps show an error message
      console.error("Invalid billing address. Please fill in all required fields.");
      return;
    }

    // Check if the address already exists in savedAddresses
    const addressExists = savedAddresses.some(savedAddress =>
      isEqual(savedAddress, billingAddress)
    );

    if (addressExists) {
      // Handle case where the address already exists, perhaps show a warning
      console.warn("Billing address already exists in saved addresses.");
      return;
    }

    // If validation checks pass, update the state to include the new billing address
    setSavedAddresses([...savedAddresses, billingAddress]);

    // Optionally, you can clear the form fields or perform additional actions after saving the address
    setBillingAddress({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  };
    const SavedAddresses = () => {
      return (
        <div className="card rounded-lg border-2 md:w-2/3 m-2">
          <div className="mb-0 card-title text-2xl py-5 px-9 border-zinc bg-gray-100 rounded-t-lg border-2 font-semibold">
            <p className="">Saved Addresses</p>
          </div>
          <div className="card-body">
          {savedAddresses.length === 0 ? (
              <p className="p-4 text-gray-500">No addresses saved yet.</p>
            ) : (
              savedAddresses.map((address, index) => (
            <div key={address.id} className="p-2 m-2 border-b-2 border-gray-200">
              <p className="text-sm font-semibold text-gray-600">
                {address.firstName} {address.lastName}
              </p>
              <p>{address.address1}, {address.address2}</p>
              <p>
                {address.city}, {address.state}, {address.zipCode}
              </p>
              <p>{address.country}</p>
            </div>
          )))
        }
        </div>     </div>
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
              <p className="">Billing Address</p>
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
                  value={billingAddress.firstName}
                  onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                  placeholder="jonh"
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
                  value={billingAddress.lastName}
                  onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
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
                value={billingAddress.email}
                onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
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
                value={billingAddress.Phone}
                onChange={(e) => setBillingAddress({ ...billingAddress, Phone: e.target.value })}
                placeholder="+91-7461240"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4 p-2 m-2">
              <label
                htmlFor="address1"
                className="block text-sm font-semibold text-gray-600"
              >
                Address1
              </label>
              <input
                type="text"
                id="address1"
                name="address1" 
                value={billingAddress.address1}
                onChange={(e) => setBillingAddress({ ...billingAddress, address1: e.target.value })}
                placeholder="Main street 12"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4 p-2 m-2">
              <label
                htmlFor="address2"
                className="block text-sm font-semibold text-gray-600"
              >
                Address2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={billingAddress.address2}
                onChange={(e) => setBillingAddress({ ...billingAddress, address2: e.target.value })}
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
                  value={billingAddress.city}
                  onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
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
                  value={billingAddress.state}
                  onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-2 m-2">
              <div className="mb-4">
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-semibold text-gray-600"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={billingAddress.zipCode}
                  onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
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
                  value={billingAddress.country}
                  onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            <div className=" items-center m-2 p-2">
              {" "}
              <button
                type="submit"
                onClick={handleSaveBillingAddress}
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
             <SavedAddresses />
          </>
        ) : (
          <EmptyCart />
        )}
        </div>{" "}
      </div>
    );
  };

  export default Checkout;

    
