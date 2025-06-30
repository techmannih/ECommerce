import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField, FormError, SubmitButton } from "../Components";
import useForm from "../hooks/useForm";
import { validateEmail } from "../utils/validation";
import { post } from "../utils/api";
import toast from "react-hot-toast";

const SignupForm = () => {
  const navigate = useNavigate();
  const { values: formData, handleChange, resetForm } = useForm({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorExist, setErrorExist] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    handleChange(e);
    if (e.target.name === "email") {
      setEmailError(validateEmail(e.target.value) ? null : "Invalid email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorExist("Passwords do not match.");
      setTimeout(() => setErrorExist(null), 1000);
      return;
    }

    try {
      setLoading(true);
      const { ok, body } = await post('/signup', formData);

      resetForm();
      if (ok) {
        toast.success("Registration successful! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const message = body.errors?.email || "Registration failed. Please try again.";
        setErrorExist(message);
        toast.error(message);
        setTimeout(() => {
          setErrorExist(null);
          navigate("/register");
        }, 1000);
      }
    } catch (error) {
      setErrorExist("Oops! Something went wrong. Please try again later.");
      toast.error("Oops! Something went wrong. Please try again later.");
      setTimeout(() => setErrorExist(null), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-sm:mx-6 m-24">
      {errorExist && <div className="text-red-500 text-center">{errorExist}</div>}
      <h2 className="text-4xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Your Name"
          autoComplete="name"
          autoFocus
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormError message={emailError} />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Your Password"
          autoComplete="new-password"
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
        <FormError message={errorExist} />
        <div className="items-center mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        <div className="text-center">
          <SubmitButton loading={loading}>Register</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
