import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const [errorExist, setErrorExist] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add logic to send the form data to your backend for user registration
      console.log("Form data submitted:", formData);

      // Make an API call to your server to handle user registration
      const response = await fetch( `${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Clear the form fields
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      if (response.ok) {
        // Registration successful, you can redirect or perform other actions

        setSuccessMessage("User registered successfully!"); // Registration successful, display success message
        // Clear success message and navigate after 2 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/login");
        }, 1000);
        console.log("User registered successfully!");
        console.log(formData);
      } else {
        // Registration failed, handle errors
        console.error("Registration failed:", response.statusText);
        setErrorExist(
          "Email is already in use. Please choose a different email."
        );
        setTimeout(() => {
          setErrorExist(null);
          navigate("/register");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
         {errorExist && (
              <div className="text-red-500 text-center mb-4">{errorExist}</div>
            )}

        {successMessage && (
              <div className="text-green-500 text-center mb-4">{successMessage}</div>
            )}
      <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none w-full"
          >
            Register
          </button>

        </div>
      </form>
    </div>
  </div>
  );
};

export default SignupForm;
