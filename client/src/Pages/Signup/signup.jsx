
import { Link } from "react-router-dom";
import React, { useState } from "react";
export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    country: "",
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
      } else {
        // Registration failed, handle errors
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  return (
    <div className="p-8 h-screen flex items-center justify-center">
      <div className="box border-2 p-8 flex justify-center rounded-lg bg-slate-100">
        <div className="head flex-col flex text-center">
          <h1 className="font-bold text-black text-3xl p-3 mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="input-field m-2 p-2 px-4 rounded-2xl"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field m-2 p-2 px-4 rounded-2xl"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field m-2 p-2 px-4 rounded-2xl"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="input-field m-2 p-2 px-4 rounded-2xl"
            />
            <button
              type="submit"
              className="bg-orange-400 text-black font-semibold text-lg p-2 m-2 rounded-3xl hover:bg-orange-500 cursor-pointer"
            >
              Sign Up
            </button>
            </form>
            <Link to="/" className="bg-yellow-400 text-black font-semibold text-lg p-2 m-2 rounded-3xl hover:bg-yellow-500 cursor-pointer"><button
          
         >
           Log In
         </button>
            </Link>
            
        
        </div>
      </div>
    </div>
  );
}
//         // const dispatch: AppDispa
