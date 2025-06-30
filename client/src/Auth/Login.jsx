import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (name === "email") {
      setEmailError(emailRegex.test(value) || value === "" ? null : "Invalid email");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const responseBody = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", responseBody.success);
        document.cookie = `jwt=${responseBody.token}; path=/`;

        setLoginData({ email: "", password: "" });
        setSuccessMessage("User Logged In successfully!");
        setIsLoggedIn(true);
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/");
        }, 1000);
      } else {
        setIsLoggedIn(false);
        setError("Invalid email or password. Please try again.");
        setTimeout(() => setError(null), 1000);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setError("Something went wrong. Please try again.");
      setTimeout(() => setError(null), 1000);
    }
  };

  const buttonClass =
    "bg-black text-white m-7 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800";

  return (
    <div className="max-sm:mx-6 mt-24">
      {successMessage && <div className="text-green-500 text-center p-2">{successMessage}</div>}
      <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="you@example.com"
            autoComplete="email"
            autoFocus
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
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Password"
            autoComplete="current-password"
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
        {error && <p className="text-red-500 m-2 p-2">{error}</p>}
        <div>
          New User?{' '}
          <Link to="/register" className="text-sm text-blue-500 hover:underline">
            Create an Account
          </Link>
        </div>
        <div className="text-center">
          <button type="submit" className={buttonClass}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
