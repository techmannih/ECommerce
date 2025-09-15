const { User } = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const maxAge = 2 * 24 * 60 * 60;
const mySecretKey = process.env.SECRET_KEY;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getToken(userID) {
  return jwt.sign({ userID }, mySecretKey, {
    expiresIn: maxAge,
  });
}

const handleErrors = (err) => {
  const errors = { email: "", password: "" };

  // error code
  if (err.code == 11000) {
    errors["email"] = "Email is already in use. Please choose a different email.";
  }

  // invalid email OR password - login
  if (err.message === "Email not found. Please sign up first.") {
    errors.email = "Email not found. Please sign up first.";
  }
  if (err.message === "Incorrect password. Please try again.") {
    errors.password = "Incorrect password. Please try again.";
  }

  // validation of email & password - signup
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("Signing up");

  try {
    if (!emailRegex.test(email) || !password || password.length < 6) {
      return res.status(400).json({
        errors: {
          email: !emailRegex.test(email) ? "Please enter a valid email address." : undefined,
          password: !password || password.length < 6 ? "Password must be at least 6 characters" : undefined,
        },
      });
    }
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);
    if (existingUser) {
      // User with the same email already exists
      return res.status(400).json({
        errors: {
          email: "Email is already in use. Please choose a different email.",
        },
      });
    } else {
      // Create a new user
      const user = await User.create({ fullName, email, password });

      const token = getToken(user._id);
      // Create a session cookie so the user remains logged in on reload
      // but is logged out once the browser/tab is closed
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      console.log("new user", user);
      res.status(201).json({ success: "Signed up successfully" });
    }
  } catch (err) {
    console.error("Error signing up", err);

    // Handle other errors
    const errors = handleErrors(err); // You need to define the handleErrors function
    res.status(500).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in");
  try {
    if (!emailRegex.test(email) || !password) {
      return res.status(400).json({
        errors: {
          email: !emailRegex.test(email) ? "Please enter a valid email address." : undefined,
          password: !password ? "Password is required" : undefined,
        },
      });
    }
    const user = await User.login(email, password);

    if (!user) {
      // User not found or invalid credentials
      throw new Error("Invalid credentials");
    }

    const token = getToken(user._id);
    // Issue a session cookie instead of a persistent one so the
    // authentication is cleared once the browser session ends
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: user._id });
    console.log("Logged data", user);
  } catch (err) {
    console.error("Error logging in:", err.message);
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: err.message }); // Include the error message in the response
  }
};

module.exports.deleteUserProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUserProfile = await User.findOneAndDelete({ email });
    if (!deletedUserProfile) {
      return res.status(404).json({ success: false, error: "User profile not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
      data: deletedUserProfile,
    });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
