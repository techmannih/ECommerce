import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const [errorExist, setErrorExist] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorExist("Passwords do not match.");
      setTimeout(() => setErrorExist(null), 1000);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
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
        confirmPassword: "",
      });
      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        // Clear success message and navigate after 2 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/login");
        }, 1000);
      } else {
        const errorBody = await response.json();
        setErrorExist(
          errorBody.errors?.email || "Registration failed. Please try again."
        );
        setTimeout(() => {
          setErrorExist(null);
          navigate("/register");
        }, 1000);
      }
    } catch (error) {
      setErrorExist("Something went wrong. Please try again.");
      setTimeout(() => setErrorExist(null), 1000);
    }
  };

  return (
    <div className="max-sm:mx-6 m-24 ">
         {errorExist && (
              <div className="text-red-500 text-center">{errorExist}</div>
            )}
            
        {successMessage && (
              <div className="text-green-500 text-center">{successMessage}</div>
            )}
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Confirm Password"
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
            Register
          </button>

        </div>
      </form>
    </div>
  );
};

export default SignupForm;
