import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField, FormError, SubmitButton } from "../Components";
import useForm from "../hooks/useForm";
import { validateEmail } from "../utils/validation";
import { post } from "../utils/api";
import toast from "react-hot-toast";

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { values: loginData, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    handleChange(e);
    if (e.target.name === "email") {
      setEmailError(validateEmail(e.target.value) ? null : "Invalid email");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const { ok, body } = await post('/login', loginData);

      if (ok) {
        // Persist the user only for this tab so reloading keeps the
        // session but closing the tab logs the user out
        sessionStorage.setItem("userId", body.success);
        resetForm();
        toast.success("Logged in successfully!");
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setIsLoggedIn(false);
        const message = body.errors?.email || body.errors?.password || "Invalid email or password. Please try again.";
        setError(message);
        toast.error(message);
        setTimeout(() => setError(null), 1000);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setError("Oops! Something went wrong. Please try again later.");
      toast.error("Oops! Something went wrong. Please try again later.");
      setTimeout(() => setError(null), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-sm:mx-6 mt-24">
      <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <InputField
          label="Email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
        />
        <FormError message={emailError} />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
          placeholder="Your Password"
          autoComplete="current-password"
        />
        <FormError message={error} />
        <div>
          New User?{' '}
          <Link to="/register" className="text-sm text-blue-500 hover:underline">
            Create an Account
          </Link>
        </div>
        <div className="text-center">
          <SubmitButton loading={loading}>Login</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
