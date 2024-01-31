const mongoose = require("mongoose");

// schemas
const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
      default: 1,
    },
    itemPrice: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  { timestamps: true }
);

// models
const Cart = mongoose.model("cart", cartSchema);

module.exports = { Cart };
