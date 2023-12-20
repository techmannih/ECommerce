import React, { useState } from "react";
export default function address() {
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    pincode: "",
    state: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You should implement the logic to send the address to your backend
    // using fetch or axios. This is just a placeholder.
    try {
      const response = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      const data = await response.json();
      console.log("Address created:", data);

      // Display success message
      setSuccessMessage("Address saved successfully!");
      // Display a success message (you can customize this message)
      alert("Address saved successfully!");
      // Reset the form after successful submission
      setAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        pincode: "",
        state: "",
      });
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Address Form</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 rounded-md"
            >
              Save the Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
