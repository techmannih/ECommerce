import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add logic to send the form data to your backend for user registration
      console.log("Form data submitted:", formData);

      // Make an API call to your server to handle user registration
      const response = await fetch("http://localhost:8880/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can redirect or perform other actions
        console.log("User registered successfully!");
        console.log(formData)
      } else {
        // Registration failed, handle errors
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  return (
    <div className="max-sm:mx-6 m-24 ">
      <h2 className="text-4xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600"
          >
            fullName
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Password"
            required
          />
        </div>

        <div className=" items-center mb-4">
          {" "}
          Already have an account?
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white m-7 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
