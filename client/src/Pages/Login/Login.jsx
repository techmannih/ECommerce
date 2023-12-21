import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Add logic to send the login data to your backend for authentication
      console.log("Login data submitted:", loginData);
  
      // Make an API call to your server to handle user authentication
      const response = await fetch("http://localhost:8880/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        // Authentication successful, you can redirect or perform other actions
        console.log("User authenticated successfully!");
      } else {
        // Authentication failed, handle errors
        const responseBody = await response.json();
        if (
          responseBody.errors &&
          (responseBody.errors.email ||
            responseBody.errors.password === "Invalid credentials")
        ) {
          // Display an error message to the user indicating invalid credentials
          setError("Invalid email or password. Please try again.");
        } else {
          console.error("Authentication failed:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
    }
  };

  return (
    <div className="p-8 h-screen flex items-center justify-center bg-slate-50">
      <div className="box border-2 p-8 flex justify-center rounded-lg bg-slate-100">
        <div className="head flex-col flex text-center">
          <h1 className="font-bold text-black text-3xl p-3 mb-8">Log In</h1>
          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field m-2 p-2 px-4 rounded-2xl"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field m-2 p-2 px-4 rounded-2xl"
              required
            />  <p className="text-red-500">{error}</p>
            <button
              type="submit"
              className="bg-orange-400 text-black font-semibold text-lg p-2 m-2 rounded-3xl hover:bg-orange-500 cursor-pointer"
            >
              Log In
            </button>
          </form>
        
          <Link
            to="/signup"
            className="bg-yellow-400 text-black font-semibold text-lg p-2 m-2 rounded-3xl hover:bg-yellow-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
