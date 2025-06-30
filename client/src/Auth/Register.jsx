import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [emailError, setEmailError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setEmailError(emailRegex.test(value) || value === "" ? null : "Invalid email");
    }
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

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/login");
        }, 1000);
      } else {
        const errorBody = await response.json();
        setErrorExist(errorBody.errors?.email || "Registration failed. Please try again.");
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

  const buttonClass =
    "bg-black text-white m-7 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800";

  return (
    <div className="max-sm:mx-6 m-24">
      {errorExist && <div className="text-red-500 text-center">{errorExist}</div>}
      {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
      <h2 className="text-4xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Name"
            autoComplete="name"
            autoFocus
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Password"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-xs text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-9 text-xs text-gray-600"
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
        <div className="items-center mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        <div className="text-center">
          <button type="submit" className={buttonClass}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
