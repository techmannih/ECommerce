import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch( `${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      console.log(response);
      const responseBody = await response.json(); // Read response body only once
      localStorage.setItem("userId", responseBody.success); // Use responseBody.success here
      console.log("datass", responseBody);

      if (response.ok) {
        document.cookie = `jwt=${responseBody.token}; path=/`; // Set the JWT token in cookies
        console.log("Token set in cookie:", document.cookie);

        setLoginData({ email: "", password: "" });
        setSuccessMessage("User Logged In successfully!");
        setIsLoggedIn(true);
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/");
        }, 1000);
        console.log("User authenticated successfully!");
      } else {
        setIsLoggedIn(false);
        if (responseBody.errors && (responseBody.errors.email || responseBody.errors.password === "Invalid credentials")) {
          setError("Invalid email or password. Please try again.");
          setTimeout(() => setError(null), 1000);
        } else {
          console.error("Authentication failed:", response.statusText);
          setError1("Invalid email or password. Please try again.");
          setTimeout(() => setError1(null), 1000);
        }
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error during authentication:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {successMessage && (
          <div className="text-green-500 text-center mb-4">{successMessage}</div>
        )}
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Password"
            required
          />
        </div>
        <p className="text-red-500 mb-2">{error}</p>
        <p className="text-red-500 mb-2">{error1}</p>
        <div className="mb-4">
          New User?{' '}
          <Link to="/register" className="text-sm text-blue-500 hover:underline">
            Create an Account
          </Link>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none w-full"
          >
            Login
          </button>
        </div>
        </form>
      </div>
      </div>
  );
};

export default LoginForm;
